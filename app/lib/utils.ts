// ── Shared utility functions ──────────────────────────────────────

/**
 * Shorten an EVM address for display.
 * On narrow viewports (≤480 px) the truncation is more aggressive.
 */
export function truncateAddress(addr: string | null | undefined): string {
  if (!addr || addr.length < 10) return addr || "";
  if (typeof window !== "undefined" && window.innerWidth <= 480) {
    return addr.slice(0, 4) + "···" + addr.slice(-3);
  }
  return addr.slice(0, 6) + "···" + addr.slice(-4);
}

/** Shorten a transaction hash or payment reference for table display. */
export function truncateRef(ref: string | null | undefined): string {
  if (!ref || ref.length < 16) return ref || "—";
  return ref.slice(0, 8) + "···" + ref.slice(-8);
}

/**
 * Format a USDC price for display.
 * Uses 3 decimal places for sub-cent values, 2 otherwise.
 */
export function formatPrice(usdc: number): string {
  return usdc > 0 && usdc < 0.01 ? usdc.toFixed(3) : usdc.toFixed(2);
}
