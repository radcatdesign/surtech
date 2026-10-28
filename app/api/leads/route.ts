import { NextResponse } from "next/server";
import { isValidEmail, type Lead, type LeadPayload } from "@/lib/leads";

const MAX_TEXT = 300;

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, MAX_TEXT);
  return trimmed || undefined;
}

function cleanNumber(value: unknown): number | undefined {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.min(Math.floor(n), 10_000_000) : undefined;
}

function normalize(body: LeadPayload): Lead | null {
  const email = clean(body.email);
  if (!isValidEmail(email)) return null;

  switch (body.type) {
    case "sell": {
      const est = body.estimate ?? ({} as Partial<typeof body.estimate>);
      return {
        type: "sell",
        email: email!,
        name: clean(body.name),
        company: clean(body.company),
        timing: clean(body.timing),
        estimate: {
          category: clean(est.category) ?? "unknown",
          quantity: cleanNumber(est.quantity) ?? 0,
          age: clean(est.age) ?? "unknown",
          low: cleanNumber(est.low) ?? 0,
          high: cleanNumber(est.high) ?? 0,
        },
      };
    }
    case "buy":
      return {
        type: "buy",
        email: email!,
        category: clean(body.category) ?? "unknown",
        part: clean(body.part),
        quantity: cleanNumber(body.quantity),
        neededBy: clean(body.neededBy),
      };
    case "pulse":
      return { type: "pulse", email: email! };
    default:
      return null;
  }
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "That request couldn't be read. Try again." }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field. Accept quietly, drop the lead.
  if (body?.website) return NextResponse.json({ ok: true });

  const lead = normalize(body);
  if (!lead) {
    return NextResponse.json(
      { ok: false, error: "Enter a work email like you@company.com and try again." },
      { status: 422 },
    );
  }

  const record = { ...lead, receivedAt: new Date().toISOString(), source: "surtechno.com" };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    console.info("[lead]", JSON.stringify(record));
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] delivery failed", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send that just now. Try again, or email info@surtechno.com." },
      { status: 502 },
    );
  }
}
