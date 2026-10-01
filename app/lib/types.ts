// ── Shared TypeScript interfaces ──────────────────────────────────

/** A service entry returned by GET /services */
export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price_usdc: number;
}

/** A single row in the transaction history table */
export interface TransactionItem {
  service_id: string;
  cost: number;
  status: string;
  txHash?: string;
  paymentRef?: string;
  time: string;
}

/** Shape of the JSON response from POST /run */
export interface RunResponse {
  tx_hash?: string;
  cost_usdc?: number;
  result?: unknown;
  error?: string;
  [key: string]: unknown;
}

/** API key record returned by GET /api-keys/{wallet_address} */
export interface ApiKeyItem {
  id?: string;
  key_prefix: string;
  label: string;
  is_revoked: boolean;
  created_at: string;
}
