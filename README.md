# Noviq

**Pay-per-request AI services powered by Circle Nanopayments on Arc.**

No subscriptions. No gas fees. Just sign and run.

---

## Overview

Noviq is an API marketplace where developers pay for exactly what they use — in fractions of a cent — using USDC stablecoin on the [Arc](https://arc.io) blockchain. Instead of monthly subscriptions, each API call triggers a micro-payment settled instantly on-chain.

### How It Works

1. **Connect Wallet** — bring any EVM-compatible wallet (MetaMask, etc.)
2. **Generate API Key** — sign a challenge to prove wallet ownership
3. **Call `/run`** — pass your API key and a `service_id`
4. **Pay & Receive** — USDC is transferred on-chain only after the service succeeds

### Available Services

| Service | ID | Price (USDC) | Description |
|---|---|---|---|
| 📈 Token Price | `token_price` | $0.001 | Real-time crypto prices via CoinGecko |
| 🐦 Twitter Fetch | `twitter_fetch` | $0.002 | Recent tweets for a handle |
| 🧠 Nemotron-3 | `nemotron-3-super` | $0.002 | NVIDIA MoE LLM for agentic tasks |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Backend | Python, FastAPI, Uvicorn |
| Blockchain | Arc Mainnet (Chain ID 5042) |
| Payments | USDC (ERC-20), Circle Nanopayments |
| Smart Contract | Solidity (Hardhat) |
| Database | PostgreSQL (Neon serverless) |
| Deployment | Vercel (frontend + serverless Python) |

---

## Project Structure

```
noviq/
├── app/                    # Next.js frontend
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WalletPanel.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Providers.tsx
│   ├── context/            # React context providers
│   │   ├── WalletContext.tsx
│   │   └── ToastContext.tsx
│   ├── lib/                # Shared types, constants, utilities
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── api-keys/           # API key management page
│   ├── docs/               # Documentation page
│   ├── playground/         # Interactive API playground
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   └── page.css            # Landing page styles
├── backend/                # Python FastAPI backend
│   ├── main.py             # FastAPI app, routes, middleware
│   ├── auth.py             # API key validation, wallet signature verification
│   ├── config.py           # Environment variable loading
│   ├── database.py         # PostgreSQL connection pool & queries
│   ├── models.py           # Pydantic request/response schemas
│   ├── payment.py          # On-chain USDC payment execution
│   ├── services.py         # Service registry & execution logic
│   └── wallet.py           # On-chain wallet balance queries
├── api/                    # Vercel serverless entry point
│   └── index.py            # Re-exports FastAPI app for Vercel
├── contract/               # Solidity smart contract (Hardhat)
│   ├── contracts/
│   ├── hardhat.config.ts
│   └── package.json
├── .env.example            # Environment variable template
├── next.config.ts          # Next.js config (API proxy rewrites)
├── vercel.json             # Vercel deployment config
├── package.json            # Node.js dependencies
├── requirements.txt        # Python dependencies
└── LICENSE                 # MIT License
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **PostgreSQL** database (or [Neon](https://neon.tech) serverless)
- **MetaMask** (or any EVM wallet) for testing

### 1. Clone & Install

```bash
git clone https://github.com/seyoj7/noviq.git
cd noviq

# Frontend dependencies
npm install

# Backend dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `BACKEND_PRIVATE_KEY` | Private key for the backend to sign transactions |
| `NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS` | Deployed NoviqMarketplace contract address |
| `ARC_MAINNET_RPC_URL` | Arc Mainnet RPC endpoint |
| `USDC_ADDRESS` | USDC token contract on Arc |
| `SELLER_WALLET_ADDRESS` | Wallet that receives payments |
| `NVIDIA_API_KEY` | NVIDIA API key for Nemotron-3 service |

### 3. Run Locally

```bash
# Start both frontend and backend concurrently
npm run dev

# Or run separately:
npm run dev:frontend   # Next.js on :3000
npm run dev:backend    # FastAPI on :8000
```

The Next.js dev server proxies API requests to the Python backend via rewrites configured in `next.config.ts`.

---

## API Reference

### `GET /services`
List all available services. **No auth required.**

### `GET /health`
Backend health check. **No auth required.**

### `POST /run`
Execute a service. **Requires API key.**

```bash
curl -X POST https://your-domain.com/run \
  -H "Authorization: nvq_YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"service_id": "token_price", "input_data": "bitcoin"}'
```

**Response:**
```json
{
  "service_id": "token_price",
  "result": "96543.21",
  "price_usdc": 0.001,
  "tx_hash": "0x5f3a..."
}
```

### `GET /auth/nonce/{wallet_address}`
Get a one-time nonce for wallet signature verification.

### `POST /api-keys`
Generate a new API key (requires wallet signature).

### `GET /api-keys/{wallet_address}`
List all API keys for a wallet.

### `DELETE /api-keys/{key_prefix}`
Revoke an API key (requires wallet signature or valid API key).

### `GET /transactions/{user_id}`
Fetch transaction history for a wallet.

### `POST /wallet`
Get wallet info and USDC balance.

---

## Database Schema

| Table | Purpose |
|---|---|
| `transactions` | Records every successful service execution with cost, status, and tx hash |
| `api_keys` | Stores hashed API keys, their wallet associations, and revocation status |
| `api_rate_limits` | Per-key request counting for rate limiting (60 req/min) |
| `auth_nonces` | One-time challenge nonces for wallet signature verification |

---

## Deployment (Vercel)

The project is configured for Vercel deployment:

- **Frontend**: Next.js builds and deploys automatically
- **Backend**: Python FastAPI runs as a Vercel serverless function via `api/index.py`
- **Rewrites**: `vercel.json` routes API paths to the Python handler

```bash
vercel deploy
```

---

## License

[MIT](./LICENSE) © 2026 brocode09x
