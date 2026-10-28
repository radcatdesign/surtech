/** Shared lead types and validation, used by the client forms and the /api/leads route. */

export type LeadType = "sell" | "buy" | "pulse";

export interface SellLead {
  type: "sell";
  email: string;
  name?: string;
  company?: string;
  timing?: string;
  estimate: {
    category: string;
    quantity: number;
    age: string;
    low: number;
    high: number;
  };
}

export interface BuyLead {
  type: "buy";
  email: string;
  category: string;
  part?: string;
  quantity?: number;
  neededBy?: string;
}

export interface PulseLead {
  type: "pulse";
  email: string;
}

export type Lead = SellLead | BuyLead | PulseLead;

export type LeadPayload = Lead & { website?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string | undefined | null): boolean {
  return !!value && value.length <= 254 && EMAIL_RE.test(value.trim());
}

export async function submitLead(payload: LeadPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: data?.error ?? "We couldn't send that. Try again, or email info@surtechno.com." };
  } catch {
    return { ok: false, error: "You look offline. Check your connection and try again." };
  }
}
