from __future__ import annotations
import logging
import uuid
from eth_account import Account
from web3 import AsyncWeb3, AsyncHTTPProvider, Web3

from backend.config import (
    ARC_MAINNET_RPC_URL,
    ARC_CHAIN_ID,
    BACKEND_PRIVATE_KEY,
    MARKETPLACE_CONTRACT_ADDRESS,
    SELLER_WALLET_ADDRESS,
)
from backend.wallet import get_or_create_wallet

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


async def check_balance(user_id: str, required_usdc: float) -> None:

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
    
    contract_address = Web3.to_checksum_address(MARKETPLACE_CONTRACT_ADDRESS)
    contract = w3.eth.contract(address=contract_address, abi=MARKETPLACE_ABI)
    
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
    if receipt["status"] != 1:
        raise ValueError(f"Transaction failed on chain. Hash: {tx_hash.hex()}")
        
    return tx_hash.hex()
