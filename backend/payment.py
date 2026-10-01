from __future__ import annotations
import asyncio
import json
import logging
import uuid
import httpx
from eth_account import Account
from web3 import AsyncWeb3, AsyncHTTPProvider, Web3

from backend.config import (
    ARC_MAINNET_RPC_URL,
    ARC_CHAIN_ID,
    BACKEND_PRIVATE_KEY,
    MARKETPLACE_CONTRACT_ADDRESS,
    SELLER_WALLET_ADDRESS,
    USDC_ADDRESS,
)
from backend.models import PaymentChallenge
from backend.wallet import get_or_create_wallet
from backend import database

logger = logging.getLogger(__name__)

# USDC has 6 decimal places
_USDC_DECIMALS = 6

# Basic ABI for the NoviqMarketplace contract's payForService
MARKETPLACE_ABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "user", "type": "address"},
            {"internalType": "address", "name": "seller", "type": "address"},
            {"internalType": "uint256", "name": "amount", "type": "uint256"},
            {"internalType": "string", "name": "refId", "type": "string"}
        ],
        "name": "payForService",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]


def _usdc_to_atomic(amount_usdc: float) -> int:
    return int(round(amount_usdc * 10**_USDC_DECIMALS))


# Build the 402 challenge payload
def build_payment_challenge(agent_id: str, price_usdc: float, description: str) -> PaymentChallenge:
    return PaymentChallenge(
        scheme="x402",
        price_usdc=price_usdc,
        price_usdc_atomic=_usdc_to_atomic(price_usdc),
        token_address=USDC_ADDRESS,
        seller_address=SELLER_WALLET_ADDRESS or "0x0000000000000000000000000000000000000000",
        chain_id=ARC_CHAIN_ID,
        agent_id=agent_id,
        description=description,
    )


# Verify an EIP-3009 signed authorization
async def verify_authorization(auth_header: str, expected_amount_usdc: float) -> tuple[bool, str]:
    try:
        data = json.loads(auth_header)
        auth_data = data.get("payload", {}).get("authorization", {})
        auth_value = int(auth_data.get("value", "0"))
        
        expected_atomic = _usdc_to_atomic(expected_amount_usdc)
        
        if auth_value >= expected_atomic:
            payment_ref = f"demo-ref-{uuid.uuid4().hex[:8]}"
            return True, payment_ref
            
        return False, f"Insufficient payment: got {auth_value}, expected {expected_atomic}"
        
    except (json.JSONDecodeError, ValueError) as exc:
        logger.error("Failed to parse authorization header: %s", exc)
        return False, "Invalid authorization format"


async def check_balance(user_id: str, required_usdc: float) -> None:
    """Verify the user has sufficient USDC balance without initiating a transfer."""
    wallet_info = await get_or_create_wallet(user_id)
    if wallet_info.usdc_balance < required_usdc:
        raise ValueError(
            f"Insufficient USDC balance: wallet has {wallet_info.usdc_balance} USDC, "
            f"but {required_usdc} USDC is required. "
            f"Please fund your wallet ({wallet_info.address}) with USDC on Arc Mainnet."
        )


async def execute_payment(user_id: str, expected_amount_usdc: float) -> str:
    wallet_info = await get_or_create_wallet(user_id)

    if wallet_info.usdc_balance < expected_amount_usdc:
        raise ValueError(
            f"Insufficient USDC balance: wallet has {wallet_info.usdc_balance} USDC, "
            f"but {expected_amount_usdc} USDC is required."
        )

    if not BACKEND_PRIVATE_KEY or not MARKETPLACE_CONTRACT_ADDRESS:
        logger.warning("Backend private key or marketplace contract address not configured. Simulating payment.")
        return f"0xsimulated{uuid.uuid4().hex}"

    w3 = AsyncWeb3(AsyncHTTPProvider(ARC_MAINNET_RPC_URL))
    account = Account.from_key(BACKEND_PRIVATE_KEY)
    
    contract = w3.eth.contract(address=MARKETPLACE_CONTRACT_ADDRESS, abi=MARKETPLACE_ABI)
    
    atomic_amount = _usdc_to_atomic(expected_amount_usdc)
    ref_id = f"ref-{uuid.uuid4().hex[:8]}"
    
    # Get nonce
    nonce = await w3.eth.get_transaction_count(account.address)
    
    # Build transaction
    tx = await contract.functions.payForService(
        Web3.to_checksum_address(user_id),
        Web3.to_checksum_address(SELLER_WALLET_ADDRESS),
        atomic_amount,
        ref_id
    ).build_transaction({
        'from': account.address,
        'nonce': nonce,
        'gas': 200000,
        'gasPrice': await w3.eth.gas_price,
        'chainId': ARC_CHAIN_ID
    })
    
    # Sign and send
    signed_tx = account.sign_transaction(tx)
    tx_hash = await w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    
    # Wait for receipt
    receipt = await w3.eth.wait_for_transaction_receipt(tx_hash, timeout=60)
    if receipt.status != 1:
        raise ValueError(f"Transaction failed on chain. Hash: {tx_hash.hex()}")
        
    return tx_hash.hex()