"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "../components/ThemeToggle";
import { useToast } from "@/context/ToastContext";
import "./docs.css";

const DOCS_SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "quickstart", label: "Quickstart" },
  { id: "authentication", label: "Authentication" },
  { id: "payments", label: "Payments" },
  { id: "services-registry", label: "Services Registry" },
  { id: "arc-network", label: "Arc Network" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "api-run", label: "POST /run" },
  { id: "api-services", label: "GET /services" },
  { id: "api-transactions", label: "GET /transactions/{id}" },
  { id: "api-wallet", label: "Wallet Endpoints" },
  { id: "api-keys-endpoints", label: "API Key Management" },
  { id: "api-health", label: "GET /health" },
  { id: "error-codes", label: "Error Codes" },
];

export default function DocsPage() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
      }
    );

    DOCS_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const copyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    showToast("Code copied to clipboard!", "success");
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="docs-body">
      
      <nav id="navbar" className="navbar docs-navbar">
        <div className="navbar-brand">
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Image src="/assets/Noviq.png" alt="Noviq Logo" width={26} height={26} className="brand-logo" priority />
            <span className="brand-text">noviq</span>
          </Link>
          <span className="docs-navbar-divider">/</span>
          <span className="docs-navbar-title">Docs</span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/" className="btn btn-ghost btn-sm docs-nav-back-link" style={{ fontSize: "0.8rem" }}>
            ← Back
          </Link>

          <ThemeToggle
            style={{ position: "static", borderRadius: "50%", padding: "8px" }}
            className="btn btn-ghost btn-sm btn-icon"
          />

          <button
            id="docs-mobile-menu-btn"
            className="docs-mobile-menu-btn"
            aria-label="Toggle Menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ marginLeft: 0 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>

      
      <div
        className={`docs-sidebar-backdrop ${sidebarOpen ? "open" : ""}`}
        id="docs-sidebar-backdrop"
        onClick={closeSidebar}
      />

      <div className="docs-layout">
        
        <aside className={`docs-sidebar ${sidebarOpen ? "open" : ""}`} id="docs-sidebar">
          <div className="docs-sidebar-content">
            <div className="docs-nav-group">
              <h4 className="docs-nav-title">Getting Started</h4>
              <ul className="docs-nav-links">
                <li>
                  <a
                    href="#introduction"
                    className={`docs-nav-link ${activeSection === "introduction" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Introduction
                  </a>
                </li>
                <li>
                  <a
                    href="#quickstart"
                    className={`docs-nav-link ${activeSection === "quickstart" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Quickstart
                  </a>
                </li>
                <li>
                  <a
                    href="#authentication"
                    className={`docs-nav-link ${activeSection === "authentication" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Authentication
                  </a>
                </li>
              </ul>
            </div>

            <div className="docs-nav-group">
              <h4 className="docs-nav-title">Core Concepts</h4>
              <ul className="docs-nav-links">
                <li>
                  <a
                    href="#payments"
                    className={`docs-nav-link ${activeSection === "payments" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Payments
                  </a>
                </li>
                <li>
                  <a
                    href="#services-registry"
                    className={`docs-nav-link ${activeSection === "services-registry" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Services Registry
                  </a>
                </li>
                <li>
                  <a
                    href="#arc-network"
                    className={`docs-nav-link ${activeSection === "arc-network" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Arc Network
                  </a>
                </li>
                <li>
                  <a
                    href="#rate-limits"
                    className={`docs-nav-link ${activeSection === "rate-limits" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Rate Limits
                  </a>
                </li>
              </ul>
            </div>

            <div className="docs-nav-group">
              <h4 className="docs-nav-title">API Reference</h4>
              <ul className="docs-nav-links">
                <li>
                  <a
                    href="#api-run"
                    className={`docs-nav-link ${activeSection === "api-run" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    POST /run
                  </a>
                </li>
                <li>
                  <a
                    href="#api-services"
                    className={`docs-nav-link ${activeSection === "api-services" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    GET /services
                  </a>
                </li>
                <li>
                  <a
                    href="#api-transactions"
                    className={`docs-nav-link ${activeSection === "api-transactions" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    GET /transactions/&#123;id&#125;
                  </a>
                </li>
                <li>
                  <a
                    href="#api-wallet"
                    className={`docs-nav-link ${activeSection === "api-wallet" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Wallet Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="#api-keys-endpoints"
                    className={`docs-nav-link ${activeSection === "api-keys-endpoints" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    API Key Management
                  </a>
                </li>
                <li>
                  <a
                    href="#api-health"
                    className={`docs-nav-link ${activeSection === "api-health" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    GET /health
                  </a>
                </li>
                <li>
                  <a
                    href="#error-codes"
                    className={`docs-nav-link ${activeSection === "error-codes" ? "active" : ""}`}
                    onClick={closeSidebar}
                  >
                    Error Codes
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        
        <main className="docs-main">
          <article className="docs-article" id="docs-article">
            <div className="docs-header">
              <p className="docs-eyebrow">Getting Started</p>
              <h1 id="introduction" className="docs-title">
                Introduction to Noviq
              </h1>
              <p className="docs-description">
                Noviq is a pay-per-request AI services marketplace powered by on-chain USDC payments
                on the Arc network. No subscriptions. No gas fees. Just sign and run.
              </p>
            </div>

            <div className="docs-content">
              <p>
                Traditional APIs trap developers in monthly subscriptions, requiring credit cards,
                accounts, and complicated billing portals. Noviq changes this paradigm by allowing
                developers to pay for exactly what they use — as little as $0.005 — in USDC on Arc
                Mainnet (Chain ID: 5042).
              </p>

              <div className="docs-alert docs-alert-info">
                <div className="docs-alert-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div className="docs-alert-content">
                  <p>
                    <strong>Note:</strong> Noviq runs on <strong>Arc Mainnet</strong> (Chain ID{" "}
                    <code>5042</code>). You will need USDC on Arc to use Noviq services. The USDC
                    contract address on Arc Mainnet is{" "}
                    <code>0x3600000000000000000000000000000000000000</code>.
                  </p>
                </div>
              </div>

              
              <h2 id="quickstart">Quickstart</h2>
              <p>
                Integrating Noviq into your application takes two steps: generate an API key through
                the dashboard, then make an HTTP POST request to <code>/run</code> with your key in the{" "}
                <code>Authorization</code> header.
              </p>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">python</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `import requests

response = requests.post("https://YOUR_DOMAIN/run",
    headers={"Authorization": "nvq_YOUR_API_KEY"},
    json={
        "service_id": "token_price",
        "input_data": "bitcoin"
    }
)

print(response.json()["result"])`,
                        1
                      )
                    }
                  >
                    {copiedIndex === 1 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`import requests

response = requests.post("https://YOUR_DOMAIN/run",
    headers={"Authorization": "nvq_YOUR_API_KEY"},
    json={
        "service_id": "token_price",
        "input_data": "bitcoin"
    }
)

print(response.json()["result"])`}
                  </code>
                </pre>
              </div>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">javascript</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `const response = await fetch("https://YOUR_DOMAIN/run", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "nvq_YOUR_API_KEY"
  },
  body: JSON.stringify({
    service_id: "token_price",
    input_data: "bitcoin"
  })
});

const data = await response.json();
console.log(data.result);`,
                        2
                      )
                    }
                  >
                    {copiedIndex === 2 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`const response = await fetch("https://YOUR_DOMAIN/run", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "nvq_YOUR_API_KEY"
  },
  body: JSON.stringify({
    service_id: "token_price",
    input_data: "bitcoin"
  })
});

const data = await response.json();
console.log(data.result);`}
                  </code>
                </pre>
              </div>

              
              <h2 id="authentication">Authentication</h2>
              <p>
                Noviq uses <strong>API key-based authentication</strong> with{" "}
                <strong>wallet signature verification</strong> for key management. To get started:
              </p>

              <ol>
                <li>
                  <strong>Connect your wallet</strong> — visit the Noviq dashboard and connect your
                  MetaMask (or any EVM-compatible) wallet.
                </li>
                <li>
                  <strong>Sign a challenge</strong> — when generating an API key, your wallet will
                  prompt you to sign a one-time nonce message (valid for{" "}
                  <strong>300 seconds</strong>). This cryptographically proves you own the wallet.
                </li>
                <li>
                  <strong>Generate an API key</strong> — after signing, a new API key prefixed with{" "}
                  <code>nvq_</code> is created. The full key is shown <em>only once</em> — copy and
                  store it securely. Each wallet is limited to{" "}
                  <strong>2 active keys</strong> at a time.
                </li>
                <li>
                  <strong>Use the key in requests</strong> — include the key in the{" "}
                  <code>Authorization</code> header of every API request. Both bare and{" "}
                  <code>Bearer</code> formats are accepted:
                </li>
              </ol>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">http</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() => copyCode("Authorization: nvq_YOUR_API_KEY\n# or\nAuthorization: Bearer nvq_YOUR_API_KEY", 3)}
                  >
                    {copiedIndex === 3 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>{`Authorization: nvq_YOUR_API_KEY\n# or\nAuthorization: Bearer nvq_YOUR_API_KEY`}</code>
                </pre>
              </div>

              <p>
                Each API key is tied to your wallet address. When you call a service, Noviq
                automatically looks up the wallet associated with your key and executes the on-chain
                USDC payment from that wallet.
              </p>

              <div className="docs-alert docs-alert-info">
                <div className="docs-alert-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div className="docs-alert-content">
                  <p>
                    <strong>Signature Flow:</strong> To generate or revoke API keys, the backend
                    first issues a one-time nonce via{" "}
                    <code>GET /auth/nonce/&#123;wallet_address&#125;</code>. The challenge message
                    format is:{" "}
                    <code>Noviq: Verify wallet ownership\nNonce: &lt;nonce&gt;</code>. The frontend
                    signs this using EIP-191 <code>personal_sign</code>, then submits the signature
                    with the request. Nonces expire after <strong>300 seconds</strong> and are
                    single-use.
                  </p>
                </div>
              </div>

              <div className="docs-alert docs-alert-warning">
                <div className="docs-alert-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div className="docs-alert-content">
                  <p>
                    <strong>Warning:</strong> Treat your API key like a password. If compromised,
                    revoke it immediately from the dashboard and generate a new one. You may hold a
                    maximum of <strong>2 active keys</strong> per wallet. Ensure your wallet is
                    funded with sufficient USDC on Arc Mainnet before running services.
                  </p>
                </div>
              </div>

              
              <h2 id="payments">Payments</h2>
              <p>
                Noviq&apos;s payment system enables micro-transactions as small as{" "}
                <strong>$0.005 USDC</strong> without gas fees borne by the end user. Payments are
                settled on-chain via the <code>NoviqMarketplace</code> smart contract&apos;s{" "}
                <code>payForService</code> function, called directly over the Arc Mainnet RPC.
              </p>
              <p>
                The payment flow works as follows: before executing any service, the backend
                performs a <strong>balance pre-check</strong> to confirm the user has sufficient
                USDC. The service is run first — if it succeeds, the payment is charged. If the
                service fails for any reason, <strong>no charge is made</strong>. The resulting
                blockchain transaction hash is returned in every successful response.
              </p>
              <p>
                USDC amounts are expressed internally in <strong>atomic units</strong> (6 decimal
                places). For example, $0.001 USDC = <code>1000</code> atomic units.
              </p>

              
              <h2 id="services-registry">Services Registry</h2>
              <p>
                The registry contains all available AI services, their costs, and expected inputs.
                You can query it programmatically at any time — no authentication required.
              </p>

              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Service ID</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price (USDC)</th>
                      <th>Example Input</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>token_price</code></td>
                      <td>📈 Token Price</td>
                      <td>Gets the real-time price for any cryptocurrency token via CoinGecko.</td>
                      <td><strong>$0.005</strong></td>
                      <td><code>bitcoin</code></td>
                    </tr>
                    <tr>
                      <td><code>twitter_fetch</code></td>
                      <td>🐦 Twitter Fetch</td>
                      <td>Fetches recent tweets for a given Twitter handle.</td>
                      <td><strong>$0.02</strong></td>
                      <td><code>elonmusk</code></td>
                    </tr>
                    <tr>
                      <td><code>nemotron-3-super</code></td>
                      <td>🧠 nemotron-3</td>
                      <td>NVIDIA Nemotron-3 Super 120B — MoE model with leading accuracy for agentic tasks.</td>
                      <td><strong>$0.05</strong></td>
                      <td><code>What is the capital of France?</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">bash</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() => copyCode("curl https://YOUR_DOMAIN/services", 4)}
                  >
                    {copiedIndex === 4 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>curl https://YOUR_DOMAIN/services</code>
                </pre>
              </div>

              
              <h2 id="arc-network">Arc Network</h2>
              <p>
                Arc is the underlying blockchain infrastructure providing fast settlement and low
                latency. Because Arc is an L2 designed for high-throughput, latency for API requests
                remains extremely competitive with Web2 APIs.
              </p>

              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Network</td>
                      <td>Arc Mainnet</td>
                    </tr>
                    <tr>
                      <td>Chain ID</td>
                      <td><code>5042</code></td>
                    </tr>
                    <tr>
                      <td>RPC URL</td>
                      <td><code>https://rpc.drpc.mainnet.arc.io</code></td>
                    </tr>
                    <tr>
                      <td>USDC Contract</td>
                      <td><code>0x3600000000000000000000000000000000000000</code></td>
                    </tr>
                    <tr>
                      <td>Block Explorer</td>
                      <td>
                        <a href="https://explorer.arc.io" target="_blank" rel="noopener noreferrer">
                          explorer.arc.io
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              
              <h2 id="rate-limits">Rate Limits</h2>
              <p>
                Each API key is subject to a rate limit of <strong>60 requests per minute</strong>.
                Exceeding this limit returns a <code>429 Too Many Requests</code> response. There
                are no daily or monthly caps — only per-minute limits per key.
              </p>

              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Limit</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Requests per minute (per key)</td>
                      <td>60</td>
                    </tr>
                    <tr>
                      <td>Active keys per wallet</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Nonce expiry</td>
                      <td>300 seconds</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              
              <h2 id="api-run">POST /run</h2>
              <p>
                The primary endpoint to execute a service and handle payment automatically. The
                service is run before the charge — if the service fails, <strong>no payment is
                  taken</strong>. Requires a valid API key in the <code>Authorization</code> header.
              </p>

              <h3>Headers</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Header</th>
                      <th>Value</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>Authorization</code></td>
                      <td>
                        <code>nvq_YOUR_API_KEY</code> or <code>Bearer nvq_YOUR_API_KEY</code>
                      </td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td><code>Content-Type</code></td>
                      <td><code>application/json</code></td>
                      <td>Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Request Body</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>service_id</code></td>
                      <td><code>string</code></td>
                      <td>
                        The unique identifier of the service. One of{" "}
                        <code>token_price</code>, <code>twitter_fetch</code>,{" "}
                        <code>nemotron-3-super</code>.
                      </td>
                    </tr>
                    <tr>
                      <td><code>input_data</code></td>
                      <td><code>string</code></td>
                      <td>The payload or prompt required by the service. Must be non-empty.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Response</h3>
              <p>
                Returns the result of the AI execution, the price charged, and the blockchain
                transaction hash.
              </p>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `{
  "service_id": "token_price",
  "result": "96521.0",
  "price_usdc": 0.005,
  "tx_hash": "0x5f3a..."
}`,
                        5
                      )
                    }
                  >
                    {copiedIndex === 5 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`{
  "service_id": "token_price",
  "result": "96521.0",
  "price_usdc": 0.005,
  "tx_hash": "0x5f3a..."
}`}
                  </code>
                </pre>
              </div>

              
              <h2 id="api-services">GET /services</h2>
              <p>
                Returns a list of all available services on the Noviq platform. No authentication
                required.
              </p>

              <h3>Response</h3>
              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `[
  {
    "id": "token_price",
    "name": "Token Price",
    "description": "Gets the current price for a given cryptocurrency token.",
    "price_usdc": 0.005
  },
  {
    "id": "twitter_fetch",
    "name": "Twitter Fetch",
    "description": "Fetches recent tweets for a given keyword or handle.",
    "price_usdc": 0.02
  },
  {
    "id": "nemotron-3-super",
    "name": "nemotron-3",
    "description": "MoE model with leading domain accuracy for agentic tasks.",
    "price_usdc": 0.05
  }
]`,
                        7
                      )
                    }
                  >
                    {copiedIndex === 7 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`[
  {
    "id": "token_price",
    "name": "Token Price",
    "description": "Gets the current price for a given cryptocurrency token.",
    "price_usdc": 0.005
  },
  {
    "id": "twitter_fetch",
    "name": "Twitter Fetch",
    "description": "Fetches recent tweets for a given keyword or handle.",
    "price_usdc": 0.02
  },
  {
    "id": "nemotron-3-super",
    "name": "nemotron-3",
    "description": "MoE model with leading domain accuracy for agentic tasks.",
    "price_usdc": 0.05
  }
]`}
                  </code>
                </pre>
              </div>

              
              <h2 id="api-transactions">GET /transactions/&#123;user_id&#125;</h2>
              <p>
                Fetch the complete transaction history for a given wallet address (EVM checksum
                address). This endpoint is public and does not require an API key.
              </p>

              <h3>Path Parameters</h3>
              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Type</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>user_id</code></td>
                      <td><code>string</code></td>
                      <td>
                        The EVM wallet address (e.g. <code>0xAbCd...</code>). Automatically
                        converted to checksum format.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">bash</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() => copyCode("curl https://YOUR_DOMAIN/transactions/0xYOUR_WALLET_ADDRESS", 8)}
                  >
                    {copiedIndex === 8 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>curl https://YOUR_DOMAIN/transactions/0xYOUR_WALLET_ADDRESS</code>
                </pre>
              </div>

              
              <h2 id="api-wallet">Wallet Endpoints</h2>
              <p>
                Wallet endpoints allow you to create or retrieve wallet info and USDC balance for
                a given user.
              </p>

              <h3>POST /wallet</h3>
              <p>
                Create or retrieve the Circle wallet for a given user. No authentication required.
                Returns wallet address, ID, USDC balance, and allowance.
              </p>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `// Request
{
  "user_id": "0xYOUR_WALLET_ADDRESS"
}

// Response
{
  "wallet_id": "abc123",
  "address": "0xAb...",
  "usdc_balance": 1.25,
  "allowance": 0.0,
  "user_id": "0xYOUR_WALLET_ADDRESS"
}`,
                        9
                      )
                    }
                  >
                    {copiedIndex === 9 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`// Request
{
  "user_id": "0xYOUR_WALLET_ADDRESS"
}

// Response
{
  "wallet_id": "abc123",
  "address": "0xAb...",
  "usdc_balance": 1.25,
  "allowance": 0.0,
  "user_id": "0xYOUR_WALLET_ADDRESS"
}`}
                  </code>
                </pre>
              </div>

              <h3>GET /wallet/&#123;user_id&#125;</h3>
              <p>
                Returns wallet info and USDC balance for the authenticated user. Requires a valid
                API key in the <code>Authorization</code> header. You may only view your own
                wallet — attempting to access another address returns <code>403 Forbidden</code>.
              </p>

              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Header</th>
                      <th>Value</th>
                      <th>Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>Authorization</code></td>
                      <td><code>nvq_YOUR_API_KEY</code></td>
                      <td>Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              
              <h2 id="api-keys-endpoints">API Key Management</h2>
              <p>
                These endpoints allow you to create, list, and revoke API keys for your wallet
                address. Key creation and revocation require proof of wallet ownership via
                the signature flow. Each wallet supports a maximum of{" "}
                <strong>2 active keys</strong>.
              </p>

              <h3>GET /auth/nonce/&#123;wallet_address&#125;</h3>
              <p>
                Generate a one-time nonce for wallet signature verification. The returned{" "}
                <code>message</code> should be signed using EIP-191 <code>personal_sign</code>.
                Nonces expire after <strong>300 seconds</strong> and are single-use.
              </p>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `// Response
{
  "nonce": "a1b2c3d4e5f6...",
  "message": "Noviq: Verify wallet ownership\\nNonce: a1b2c3d4e5f6...",
  "expires_in": 300
}`,
                        10
                      )
                    }
                  >
                    {copiedIndex === 10 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`// Response
{
  "nonce": "a1b2c3d4e5f6...",
  "message": "Noviq: Verify wallet ownership\\nNonce: a1b2c3d4e5f6...",
  "expires_in": 300
}`}
                  </code>
                </pre>
              </div>

              <h3>POST /api-keys</h3>
              <p>
                Generate a new API key. Requires a wallet signature (obtain a nonce first via{" "}
                <code>GET /auth/nonce</code>). A <code>label</code> is required. The full key is
                returned <strong>only once</strong> in the response — store it securely. Returns{" "}
                <code>409 Conflict</code> if the wallet already has 2 active keys.
              </p>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `// Request
{
  "wallet_address": "0xYOUR_WALLET_ADDRESS",
  "label": "My Production Key",
  "signature": "0x...",
  "nonce": "a1b2c3d4e5f6..."
}

// Response
{
  "api_key": "nvq_a1b2c3d4...",
  "key_prefix": "nvq_a1b2c3d4",
  "label": "My Production Key",
  "created_at": "2026-10-02T12:00:00+00:00"
}`,
                        11
                      )
                    }
                  >
                    {copiedIndex === 11 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`// Request
{
  "wallet_address": "0xYOUR_WALLET_ADDRESS",
  "label": "My Production Key",
  "signature": "0x...",
  "nonce": "a1b2c3d4e5f6..."
}

// Response
{
  "api_key": "nvq_a1b2c3d4...",
  "key_prefix": "nvq_a1b2c3d4",
  "label": "My Production Key",
  "created_at": "2026-10-02T12:00:00+00:00"
}`}
                  </code>
                </pre>
              </div>

              <h3>GET /api-keys/&#123;wallet_address&#125;</h3>
              <p>
                List all API keys (active and revoked) for a given wallet.{" "}
                <strong>Never returns the full key</strong> — only the prefix, label, timestamps,
                and revocation status.
              </p>

              <h3>DELETE /api-keys/&#123;key_prefix&#125;</h3>
              <p>
                Revoke an API key by its prefix (e.g., <code>nvq_a1b2c3d4</code>). Requires
                either:
              </p>
              <ul>
                <li>
                  A valid API key for the same wallet in the <code>Authorization</code> header,{" "}
                  <strong>or</strong>
                </li>
                <li>
                  A wallet <code>signature</code> + <code>nonce</code> in the request body.
                </li>
              </ul>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `// Request body (if using signature auth)
{
  "wallet_address": "0xYOUR_WALLET_ADDRESS",
  "signature": "0x...",
  "nonce": "a1b2c3d4e5f6..."
}

// Response
{
  "status": "revoked",
  "key_prefix": "nvq_a1b2c3d4"
}`,
                        12
                      )
                    }
                  >
                    {copiedIndex === 12 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`// Request body (if using signature auth)
{
  "wallet_address": "0xYOUR_WALLET_ADDRESS",
  "signature": "0x...",
  "nonce": "a1b2c3d4e5f6..."
}

// Response
{
  "status": "revoked",
  "key_prefix": "nvq_a1b2c3d4"
}`}
                  </code>
                </pre>
              </div>

              
              <h2 id="api-health">GET /health</h2>
              <p>
                Returns the operational status of the backend. Useful for monitoring and
                deployment health checks. No authentication required.
              </p>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `{
  "status": "ok",
  "backend_key_set": true,
  "marketplace_contract_set": true,
  "seller_wallet_configured": true
}`,
                        13
                      )
                    }
                  >
                    {copiedIndex === 13 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`{
  "status": "ok",
  "backend_key_set": true,
  "marketplace_contract_set": true,
  "seller_wallet_configured": true
}`}
                  </code>
                </pre>
              </div>

              
              <h2 id="error-codes">Error Codes</h2>
              <p>
                All error responses include a consistent JSON body with a <code>result</code> field
                (always <code>null</code> on error), an <code>error</code> string, and a{" "}
                <code>status_code</code>.
              </p>

              <div className="docs-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr>
                      <th>Status Code</th>
                      <th>Meaning</th>
                      <th>Common Cause</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>400</code></td>
                      <td>Bad Request</td>
                      <td>Invalid <code>service_id</code>, empty <code>input_data</code>, or service execution error.</td>
                    </tr>
                    <tr>
                      <td><code>401</code></td>
                      <td>Unauthorized</td>
                      <td>Missing, invalid, or revoked API key. Invalid or expired nonce.</td>
                    </tr>
                    <tr>
                      <td><code>402</code></td>
                      <td>Payment Required</td>
                      <td>Insufficient USDC balance or failed on-chain payment.</td>
                    </tr>
                    <tr>
                      <td><code>403</code></td>
                      <td>Forbidden</td>
                      <td>Trying to view another wallet&apos;s data, or API key belongs to a different wallet.</td>
                    </tr>
                    <tr>
                      <td><code>404</code></td>
                      <td>Not Found</td>
                      <td>Unknown <code>service_id</code> or API key not found.</td>
                    </tr>
                    <tr>
                      <td><code>409</code></td>
                      <td>Conflict</td>
                      <td>Wallet already has 2 active API keys.</td>
                    </tr>
                    <tr>
                      <td><code>429</code></td>
                      <td>Too Many Requests</td>
                      <td>Rate limit exceeded — max 60 requests/minute per key.</td>
                    </tr>
                    <tr>
                      <td><code>500</code></td>
                      <td>Internal Server Error</td>
                      <td>Unexpected service or server error.</td>
                    </tr>
                    <tr>
                      <td><code>502</code></td>
                      <td>Bad Gateway</td>
                      <td>Upstream service (CoinGecko, NVIDIA, Circle) returned an error.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="docs-code-block-wrapper">
                <div className="docs-code-block-header">
                  <span className="docs-code-lang">json</span>
                  <button
                    className="docs-btn-copy"
                    onClick={() =>
                      copyCode(
                        `// Error response shape (consistent across all error codes)
{
  "result": null,
  "error": "Insufficient USDC balance: wallet has 0.0 USDC, but 0.001 USDC is required.",
  "status_code": 402
}`,
                        14
                      )
                    }
                  >
                    {copiedIndex === 14 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="docs-code-block">
                  <code>
                    {`// Error response shape (consistent across all error codes)
{
  "result": null,
  "error": "Insufficient USDC balance: wallet has 0.0 USDC, but 0.001 USDC is required.",
  "status_code": 402
}`}
                  </code>
                </pre>
              </div>
            </div>
          </article>

          <footer className="docs-footer">
            <div className="docs-footer-content">
              <p>&copy; 2026 Noviq. Built on Arc.</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
