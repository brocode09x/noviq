from __future__ import annotations
import logging
import httpx
from eth_utils.address import to_checksum_address

from backend.config import (
    ARC_MAINNET_RPC_URL,
    USDC_ADDRESS,
    MARKETPLACE_CONTRACT_ADDRESS,
)
from backend.models import WalletInfo

logger = logging.getLogger(__name__)

# Provide fallback RPCs
RPC_URLS = [
    ARC_MAINNET_RPC_URL,
    "https://rpc.mainnet.arc.io",
    "https://arc-rpc.publicnode.com",
]

async def _call_rpc(method: str, params: list) -> str:
    # Basic fallback RPC logic
    last_err = None
    async with httpx.AsyncClient(timeout=10.0) as client:
        for url in RPC_URLS:
            try:
                resp = await client.post(
                    url,
                    json={
                        "jsonrpc": "2.0",
                        "method": method,
                        "params": params,
                        "id": 1,
                    },
                )
                if resp.status_code == 429:
                    continue
                resp.raise_for_status()
                return resp.json().get("result", "0x0")
            except Exception as e:
                last_err = e
                continue
    if last_err:
        raise last_err
    return "0x0"

async def get_wallet_balance(user_id: str) -> WalletInfo:
    checksum_address = to_checksum_address(user_id)
    
    data = "0x70a08231" + checksum_address.replace("0x", "").zfill(64)
    erc20_result = await _call_rpc("eth_call", [{"to": USDC_ADDRESS, "data": data}, "latest"])
    native_result = await _call_rpc("eth_getBalance", [checksum_address, "latest"])
    
    owner_padded = checksum_address.replace("0x", "").zfill(64)
    spender_padded = MARKETPLACE_CONTRACT_ADDRESS.replace("0x", "").zfill(64)
    allowance_data = "0xdd62ed3e" + owner_padded + spender_padded
    allowance_result = await _call_rpc("eth_call", [{"to": USDC_ADDRESS, "data": allowance_data}, "latest"])
        
    erc20_usdc = int(erc20_result, 16) / 1_000_000.0
    
    native_val = int(native_result, 16)
    native_usdc = native_val / 1e18 if native_val > 1e15 else native_val / 1e6
    
    balance = max(erc20_usdc, native_usdc)
    
    allowance_usdc = int(allowance_result, 16) / 1_000_000.0 if allowance_result else 0.0

    return WalletInfo(
        wallet_id=checksum_address,
        address=checksum_address,
        usdc_balance=balance,
        allowance=allowance_usdc,
        user_id=user_id,
    )

async def get_or_create_wallet(user_id: str) -> WalletInfo:
    # We no longer "create" wallets via Circle. 
    # The user simply brings their own wallet.
    return await get_wallet_balance(user_id)
