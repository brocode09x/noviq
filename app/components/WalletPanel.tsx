"use client";

import React, { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { useToast } from "@/context/ToastContext";
import { truncateAddress, formatPrice } from "@/app/lib/utils";

export function WalletPanel() {
  const { wallet, isWalletPanelOpen, closeWalletPanel, disconnectWallet, approveUSDC } = useWallet();
  const { showToast } = useToast();
  const [approvalAmount, setApprovalAmount] = useState<string>("10");

  if (!wallet) return null;

  const balanceFormatted = formatPrice(wallet.usdc_balance || 0);

  const copyDetail = (label: string, value: string) => {
    navigator.clipboard.writeText(value);
    showToast(`${label} copied!`, "success");
  };

  return (
    <div id="wallet-panel" className={`wallet-panel ${isWalletPanelOpen ? "open" : ""}`}>
      <div
        className="wallet-panel-backdrop"
        id="wallet-backdrop"
        onClick={closeWalletPanel}
      />
      <div className="wallet-panel-content glass-panel">
        <div className="wallet-panel-header">
          <h3>Your Wallet</h3>
          <button
            className="btn btn-ghost btn-sm text-error"
            id="btn-disconnect-wallet"
            title="Disconnect Wallet"
            onClick={disconnectWallet}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>

        <div className="wallet-panel-body" id="wallet-panel-body">
          <div className="wallet-balance-display">
            <div className="wallet-balance-amount">${balanceFormatted}</div>
            <div className="wallet-balance-currency">USDC on Arc Mainnet</div>
          </div>



          <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem", display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
            <div style={{ display: "flex", width: "100%" }}>
              <input
                type="number"
                value={approvalAmount}
                onChange={(e) => setApprovalAmount(e.target.value)}
                min="0.001"
                step="0.1"
                placeholder="Amount"
                style={{
                  flex: "1 1 auto",
                  minWidth: "0",
                  boxSizing: "border-box",
                  padding: "6px 10px",
                  borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
                  border: "1px solid var(--border-light)",
                  borderRight: "none",
                  background: "var(--bg-tertiary)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  outline: "none"
                }}
              />
              <button
                className="btn btn-primary btn-sm"
                style={{
                  margin: 0,
                  borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                }}
                onClick={() => approveUSDC(Number(approvalAmount) || 0)}
              >
                Approve
              </button>
            </div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", textAlign: "center", lineHeight: "1.3" }}>
              Set an allowance to let the smart contract auto-pay for your API requests.
            </span>
            {wallet.allowance !== undefined && (
              <span style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: 500, marginTop: "4px" }}>
                Current Approved: {wallet.allowance.toFixed(2)} USDC
              </span>
            )}
          </div>

          <div className="wallet-detail">
            <span className="wallet-detail-label">EVM Address</span>
            <div
              className="wallet-detail-value-wrapper"
              onClick={() => copyDetail("EVM Address", wallet.user_id)}
              title="Click to copy"
            >
              <span className="wallet-detail-value" title={wallet.user_id}>
                {truncateAddress(wallet.user_id)}
              </span>
              <svg
                className="wallet-detail-copy-icon"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </div>
          </div>

          <div className="wallet-detail">
            <span className="wallet-detail-label">Network</span>
            <div className="wallet-detail-value-wrapper wallet-detail-value-wrapper--static">
              <span className="wallet-detail-value" title="Arc Mainnet">
                Arc Mainnet
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
