/**
 * Value Check pricing model.
 *
 * These ranges are INDICATIVE PLACEHOLDERS, roughed from public 2026 secondary-market
 * data so the tool demos realistically. The SUR recovery desk should replace them with
 * its own numbers before launch. Everything the estimator shows is derived from this file.
 *
 * low / high:      recovery per unit, in USD, for hardware under 2 years old
 * monthlyDecline:  share of value lost per month if the hardware sits idle
 */

export type SellCategoryId = "gpu-servers" | "gpus" | "servers" | "memory" | "storage" | "network";
export type AgeBandId = "lt2" | "2to4" | "4to6" | "6plus";

export interface SellCategory {
  id: SellCategoryId;
  label: string;
  per: string;
  units: string;
  low: number;
  high: number;
  step: number;
  defaultQty: number;
  monthlyDecline: number;
}

export interface AgeBand {
  id: AgeBandId;
  label: string;
  multiplier: number;
}

export const SELL_CATEGORIES: SellCategory[] = [
  { id: "gpu-servers", label: "GPU servers", per: "per 8-GPU system", units: "8-GPU systems", low: 115_000, high: 150_000, step: 1, defaultQty: 4, monthlyDecline: 0.045 },
  { id: "gpus", label: "Data center GPUs", per: "per PCIe or SXM card", units: "GPU cards", low: 10_500, high: 15_500, step: 8, defaultQty: 32, monthlyDecline: 0.04 },
  { id: "servers", label: "Rack servers", per: "per 1U or 2U server", units: "rack servers", low: 2_600, high: 4_200, step: 10, defaultQty: 120, monthlyDecline: 0.03 },
  { id: "memory", label: "Server memory", per: "per 64GB RDIMM", units: "64GB RDIMMs", low: 170, high: 260, step: 50, defaultQty: 800, monthlyDecline: 0.02 },
  { id: "storage", label: "SSD + NVMe", per: "per enterprise drive", units: "enterprise drives", low: 110, high: 220, step: 25, defaultQty: 400, monthlyDecline: 0.03 },
  { id: "network", label: "Switches + optics", per: "per switch, optics incl.", units: "switches", low: 900, high: 2_200, step: 5, defaultQty: 40, monthlyDecline: 0.03 },
];

export const AGE_BANDS: AgeBand[] = [
  { id: "lt2", label: "Under 2 yrs", multiplier: 1 },
  { id: "2to4", label: "2–4 yrs", multiplier: 0.6 },
  { id: "4to6", label: "4–6 yrs", multiplier: 0.3 },
  { id: "6plus", label: "6+ yrs", multiplier: 0.12 },
];

export const HOLD_MONTHS = 3;

export interface Estimate {
  low: number;
  high: number;
  mid: number;
  afterHold: number;
  holdLoss: number;
  /** afterHold as a share of mid, 0 to 1 */
  keptShare: number;
}

export function estimateRecovery(category: SellCategory, quantity: number, age: AgeBand): Estimate {
  const qty = Math.max(0, Math.floor(quantity));
  const low = qty * category.low * age.multiplier;
  const high = qty * category.high * age.multiplier;
  const mid = (low + high) / 2;
  const afterHold = mid * Math.pow(1 - category.monthlyDecline, HOLD_MONTHS);
  return {
    low,
    high,
    mid,
    afterHold,
    holdLoss: mid - afterHold,
    keptShare: mid > 0 ? afterHold / mid : 0,
  };
}

/** $940, $8.4K, $187K, $1.25M */
export function formatMoney(value: number): string {
  if (value >= 1e6) {
    const m = value / 1e6;
    const s = m >= 100 ? m.toFixed(0) : m.toFixed(2).replace(/0$/, "").replace(/\.$/, "");
    return `$${s}M`;
  }
  if (value >= 1e4) return `$${Math.round(value / 1e3)}K`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/* Buy side */

export type BuyCategoryId = "gpus" | "ai-servers" | "memory" | "drives" | "optics" | "server-parts";

export const BUY_CATEGORIES: { id: BuyCategoryId; label: string; examples: string }[] = [
  { id: "gpus", label: "GPUs", examples: "B200, B300, RTX 50" },
  { id: "ai-servers", label: "AI servers", examples: "Dell, HPE, Lenovo, SMC" },
  { id: "memory", label: "Memory", examples: "DDR4 + DDR5 RDIMM" },
  { id: "drives", label: "Drives", examples: "NVMe, SAS, SATA" },
  { id: "optics", label: "Optics", examples: "SFP, QSFP, OSFP" },
  { id: "server-parts", label: "Server parts", examples: "NICs, PSUs, cooling" },
];

export const NEEDED_BY = [
  { id: "asap", label: "ASAP" },
  { id: "30-days", label: "30 days" },
  { id: "this-quarter", label: "This quarter" },
] as const;

export const DECOMMISSION_TIMING = [
  { id: "this-month", label: "This month" },
  { id: "this-quarter", label: "This quarter" },
  { id: "planning", label: "Just planning" },
] as const;
