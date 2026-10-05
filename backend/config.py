import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from repo root (two levels up from backend/)
_BACKEND_DIR = Path(__file__).resolve().parent
_REPO_ROOT = _BACKEND_DIR.parent

load_dotenv(_REPO_ROOT / ".env")

# Database
POSTGRES_URL: str = os.getenv("DATABASE_URL", "")

# Web3 Wallet Configuration
BACKEND_PRIVATE_KEY: str = os.getenv("BACKEND_PRIVATE_KEY", "")
MARKETPLACE_CONTRACT_ADDRESS: str = os.getenv("NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS", "")

# Arc / Chain
ARC_MAINNET_RPC_URL: str = os.getenv("ARC_MAINNET_RPC_URL", "https://rpc.drpc.mainnet.arc.io")
USDC_ADDRESS: str = os.getenv("USDC_ADDRESS", "0x3600000000000000000000000000000000000000")
GATEWAY_API_BASE: str = "https://gateway-api.circle.com/v1"
GATEWAY_WALLET_ADDRESS: str = "0x0077777d7EBA4688BDeF3E311b846F25870A19B9"

# Chain ID for Arc mainnet transactions
ARC_CHAIN_ID: int = int(os.getenv("ARC_CHAIN_ID", "5042"))

# Seller wallet (receives service payments)
SELLER_WALLET_ADDRESS: str = os.getenv("SELLER_WALLET_ADDRESS", "")
SELLER_WALLET_ID: str = os.getenv("SELLER_WALLET_ID", "")

# LLM Keys
NVIDIA_API_KEY: str = os.getenv("NVIDIA_API_KEY", "")
