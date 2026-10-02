

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price_usdc: number;
}


export interface TransactionItem {
  service_id: string;
  cost: number;
  status: string;
  txHash?: string;
  paymentRef?: string;
  time: string;
}


export interface RunResponse {
  tx_hash?: string;
  cost_usdc?: number;
  result?: unknown;
  error?: string;
  [key: string]: unknown;
}


export interface ApiKeyItem {
  id?: string;
  key_prefix: string;
  label: string;
  is_revoked: boolean;
  created_at: string;
}
