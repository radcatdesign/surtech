"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Cable,
  Check,
  CircuitBoard,
  FileText,
  Gpu,
  HandCoins,
  HardDrive,
  Hourglass,
  MemoryStick,
  Minus,
  Network,
  PackageSearch,
  Plus,
  Server,
  ServerCog,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import {
  AGE_BANDS,
  BUY_CATEGORIES,
  DECOMMISSION_TIMING,
  HOLD_MONTHS,
  NEEDED_BY,
  SELL_CATEGORIES,
  estimateRecovery,
  formatMoney,
  type AgeBandId,
  type BuyCategoryId,
  type SellCategoryId,
} from "@/lib/estimator";
import { isValidEmail, submitLead } from "@/lib/leads";
import { SITE } from "@/lib/site";
import s from "./ValueCheck.module.css";

const SELL_ICONS: Record<SellCategoryId, LucideIcon> = {
  "gpu-servers": ServerCog,
  gpus: Gpu,
  servers: Server,
  memory: MemoryStick,
  storage: HardDrive,
  network: Network,
};

const BUY_ICONS: Record<BuyCategoryId, LucideIcon> = {
  gpus: Gpu,
  "ai-servers": ServerCog,
  memory: MemoryStick,
  drives: HardDrive,
  optics: Cable,
  "server-parts": CircuitBoard,
};

type Mode = "sell" | "buy";
type SellStep = "calc" | "form" | "done";

const digitsOnly = (v: string) => v.replace(/[^0-9]/g, "").slice(0, 6);

export function ValueCheck() {
  const [mode, setMode] = useState<Mode>("sell");

  // Sell
  const [catId, setCatId] = useState<SellCategoryId>("servers");
  const [qtyText, setQtyText] = useState("120");
  const [ageId, setAgeId] = useState<AgeBandId>("2to4");
  const [step, setStep] = useState<SellStep>("calc");
  const [contact, setContact] = useState({ email: "", name: "", company: "", timing: "this-quarter", website: "" });
  const [sellError, setSellError] = useState("");

  // Buy
  const [buy, setBuy] = useState({
    category: "memory" as BuyCategoryId,
    part: "",
    quantity: "200",
    neededBy: "asap",
    email: "",
    website: "",
  });
  const [buyError, setBuyError] = useState("");
  const [buyDone, setBuyDone] = useState(false);

  const [sending, setSending] = useState(false);
  const statusHeading = useRef<HTMLHeadingElement>(null);

  // Links anywhere on the page to #estimate or #source open the matching tab.
  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#source") setMode("buy");
      if (window.location.hash === "#estimate") setMode("sell");
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href="#source"], a[href="#estimate"]');
      if (link) setMode(link.getAttribute("href") === "#source" ? "buy" : "sell");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Move focus to the confirmation so screen reader users hear it.
  useEffect(() => {
    if (step === "done" || buyDone) statusHeading.current?.focus();
  }, [step, buyDone]);

  const category = SELL_CATEGORIES.find((c) => c.id === catId) ?? SELL_CATEGORIES[2];
  const age = AGE_BANDS.find((a) => a.id === ageId) ?? AGE_BANDS[1];
  const qty = parseInt(qtyText, 10) || 0;
  const est = useMemo(() => estimateRecovery(category, qty, age), [category, qty, age]);
  const range = `${formatMoney(est.low)}–${formatMoney(est.high)}`;
  const summary = `${qty.toLocaleString("en-US")} ${category.units} · ${age.label}`;

  const buyCategory = BUY_CATEGORIES.find((c) => c.id === buy.category) ?? BUY_CATEGORIES[2];
  const buyQty = parseInt(buy.quantity, 10) || 0;
  const buySummary = `${buyQty > 0 ? `${buyQty.toLocaleString("en-US")} × ` : ""}${buy.part.trim() || buyCategory.label.toLowerCase()}`;

  const firstName = contact.name.trim().split(/\s+/)[0];

  async function sendSell(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(contact.email)) {
      setSellError("Enter a work email like you@company.com so we can send your report.");
      return;
    }
    setSending(true);
    setSellError("");
    const res = await submitLead({
      type: "sell",
      email: contact.email.trim(),
      name: contact.name,
      company: contact.company,
      timing: contact.timing,
      website: contact.website,
      estimate: { category: category.label, quantity: qty, age: age.label, low: Math.round(est.low), high: Math.round(est.high) },
    });
    setSending(false);
    if (res.ok) setStep("done");
    else setSellError(res.error);
  }

  async function sendBuy(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(buy.email)) {
      setBuyError("Enter a work email like you@company.com so we can reply with availability.");
      return;
    }
    setSending(true);
    setBuyError("");
    const res = await submitLead({
      type: "buy",
      email: buy.email.trim(),
      category: buyCategory.label,
      part: buy.part,
      quantity: buyQty,
      neededBy: buy.neededBy,
      website: buy.website,
    });
    setSending(false);
    if (res.ok) setBuyDone(true);
    else setBuyError(res.error);
  }

  const isSell = mode === "sell";

  return (
    <div id="estimate" className={s.card}>
      <span id="source" className={s.anchor} aria-hidden="true" />
      <div className={s.top}>
        <span>SUR / {isSell ? "VALUE CHECK" : "PARTS DESK"}</span>
        <span className={s.leds} aria-hidden="true">
          <span className="led" style={{ background: "#3fd08a" }} />
          <span className="led" style={{ background: "var(--amber)" }} />
          <span className="led" style={{ background: "#5b8cff" }} />
        </span>
      </div>
      <div className={s.vent} aria-hidden="true" />

      <div className={s.body}>
        <h2 className={s.title}>
          {isSell ? "What's your retired hardware worth today?" : "Need parts the OEM can't ship? Check our shelves."}
        </h2>

        <div className={s.tabs}>
          <button type="button" aria-pressed={isSell} className={s.tab} onClick={() => setMode("sell")}>
            <HandCoins size={18} aria-hidden="true" />
            Sell hardware
          </button>
          <button type="button" aria-pressed={!isSell} className={s.tab} onClick={() => setMode("buy")}>
            <PackageSearch size={18} aria-hidden="true" />
            Buy hardware
          </button>
        </div>

        {isSell && step === "calc" && (
          <div className={s.stack}>
            <fieldset className={s.group}>
              <legend className={s.label}>1 · What are you retiring?</legend>
              <div className={s.chipGrid}>
                {SELL_CATEGORIES.map((c) => {
                  const Icon = SELL_ICONS[c.id];
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={s.chip}
                      aria-pressed={c.id === catId}
                      onClick={() => {
                        setCatId(c.id);
                        setQtyText(String(c.defaultQty));
                      }}
                    >
                      <Icon size={20} aria-hidden="true" className={s.chipIcon} />
                      <span className={s.chipText}>
                        <span className={s.chipLabel}>{c.label}</span>
                        <span className={s.chipSub}>{c.per}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className={s.group}>
              <legend className={s.label}>2 · How many?</legend>
              <div className={s.qtyRow}>
                <div className={s.stepper}>
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQtyText(String(Math.max(0, qty - category.step)))}
                  >
                    <Minus size={18} aria-hidden="true" />
                  </button>
                  <input
                    id="sell-qty"
                    inputMode="numeric"
                    aria-label={`Quantity of ${category.units}`}
                    value={qtyText}
                    onChange={(e) => setQtyText(digitsOnly(e.target.value))}
                  />
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQtyText(String(Math.min(999_999, qty + category.step)))}
                  >
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </div>
                <span className={s.unit}>{category.units}</span>
              </div>
            </fieldset>

            <fieldset className={s.group}>
              <legend className={s.label}>3 · How old is it?</legend>
              <div className={s.ageGrid}>
                {AGE_BANDS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={s.pill}
                    aria-pressed={a.id === ageId}
                    onClick={() => setAgeId(a.id)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className={s.result} aria-live="polite">
              <div className={s.resultHead}>
                <span className={s.resultLabel}>Estimated recovery</span>
                <span>{summary}</span>
              </div>
              {qty > 0 ? (
                <>
                  <p className={s.range}>{range}</p>
                  <div className={s.bars}>
                    <div className={s.barRow}>
                      <span>Sell now</span>
                      <span className={s.track}>
                        <span className={s.fillNow} style={{ width: "100%" }} />
                      </span>
                      <span className={s.barValue}>{formatMoney(est.mid)}</span>
                    </div>
                    <div className={s.barRow}>
                      <span>In {HOLD_MONTHS * 30} days</span>
                      <span className={s.track}>
                        <span className={s.fillLater} style={{ width: `${Math.round(est.keptShare * 100)}%` }} />
                      </span>
                      <span className={s.barValue}>{formatMoney(est.afterHold)}</span>
                    </div>
                  </div>
                  <p className={s.loss}>
                    <TrendingDown size={16} aria-hidden="true" />
                    Waiting {HOLD_MONTHS * 30} days could cost about {formatMoney(est.holdLoss)}.
                  </p>
                </>
              ) : (
                <p className={s.empty}>Enter how many units you&rsquo;re retiring to see a range.</p>
              )}
            </div>

            <button
              type="button"
              className="btn btn-accent btn-block"
              disabled={qty === 0}
              onClick={() => {
                setSellError("");
                setStep("form");
              }}
            >
              Get my itemized offer
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className={s.fine}>
              Indicative range based on recent secondary market activity. Your real offer is itemized by model,
              configuration and condition.
            </p>
          </div>
        )}

        {isSell && step === "form" && (
          <form className={s.stack} onSubmit={sendSell} noValidate>
            <button type="button" className={s.back} onClick={() => setStep("calc")}>
              <ArrowLeft size={16} aria-hidden="true" />
              Edit estimate
            </button>
            <div className={s.summaryBox}>
              <span className={s.resultLabel}>Your estimate</span>
              <span className={s.summaryRange}>{range}</span>
              <span className={s.summaryText}>{summary}</span>
            </div>
            <p className={s.copy}>
              Tell us where to send your Market Value Report: every line priced, what to resell whole, what to part
              out, and what waiting would cost you.{" "}
              <a className={s.sampleLink} href="/report/sample" target="_blank" rel="noopener">
                <FileText size={15} aria-hidden="true" />
                See a sample report
              </a>
            </p>
            <div className={s.field}>
              <label htmlFor="sell-email">Work email</label>
              <input
                id="sell-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={contact.email}
                aria-invalid={!!sellError}
                aria-describedby={sellError ? "sell-error" : undefined}
                onChange={(e) => {
                  setContact({ ...contact, email: e.target.value });
                  setSellError("");
                }}
              />
            </div>
            <div className={s.fieldRow}>
              <div className={s.field}>
                <label htmlFor="sell-name">Full name</label>
                <input
                  id="sell-name"
                  autoComplete="name"
                  placeholder="Jordan Reyes"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                />
              </div>
              <div className={s.field}>
                <label htmlFor="sell-company">Company</label>
                <input
                  id="sell-company"
                  autoComplete="organization"
                  placeholder="Company name"
                  value={contact.company}
                  onChange={(e) => setContact({ ...contact, company: e.target.value })}
                />
              </div>
            </div>
            <fieldset className={s.group}>
              <legend className={s.fieldLegend}>When does it come out of the rack?</legend>
              <div className={s.pillGrid3}>
                {DECOMMISSION_TIMING.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={s.pill}
                    aria-pressed={contact.timing === t.id}
                    onClick={() => setContact({ ...contact, timing: t.id })}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className={s.honeypot} aria-hidden="true">
              <label htmlFor="sell-website">Website</label>
              <input
                id="sell-website"
                tabIndex={-1}
                autoComplete="off"
                value={contact.website}
                onChange={(e) => setContact({ ...contact, website: e.target.value })}
              />
            </div>
            {sellError && (
              <p id="sell-error" role="alert" className={s.error}>
                {sellError}
              </p>
            )}
            <button type="submit" className="btn btn-accent btn-block" disabled={sending}>
              {sending ? "Sending…" : "Send my value report"}
              {!sending && <ArrowRight size={18} aria-hidden="true" />}
            </button>
            <p className={s.fine}>A real person on our recovery desk reads every request.</p>
          </form>
        )}

        {isSell && step === "done" && (
          <div className={s.done}>
            <span className={s.doneMark} aria-hidden="true">
              <Check size={26} strokeWidth={2.5} />
            </span>
            <h3 ref={statusHeading} tabIndex={-1} className={s.doneTitle}>
              {firstName ? `Thanks, ${firstName}. We're on it.` : "Thanks. We're on it."}
            </h3>
            <p className={s.copy}>
              A specialist will reply within 4 hours ({SITE.hours}) with your itemized Market Value Report and next
              steps for {summary}.
            </p>
            <p className={s.callout}>
              Need it sooner? Call the desk at <a href={SITE.phoneHref}>{SITE.phone}</a>
            </p>
            <button type="button" className="btn btn-ghost-dark" onClick={() => setStep("calc")}>
              Run another estimate
            </button>
          </div>
        )}

        {!isSell && !buyDone && (
          <form className={s.stack} onSubmit={sendBuy} noValidate>
            <fieldset className={s.group}>
              <legend className={s.label}>1 · What do you need?</legend>
              <div className={s.chipGrid}>
                {BUY_CATEGORIES.map((c) => {
                  const Icon = BUY_ICONS[c.id];
                  return (
                    <button
                      key={c.id}
                      type="button"
                      className={s.chip}
                      aria-pressed={c.id === buy.category}
                      onClick={() => setBuy({ ...buy, category: c.id })}
                    >
                      <Icon size={20} aria-hidden="true" className={s.chipIcon} />
                      <span className={s.chipText}>
                        <span className={s.chipLabel}>{c.label}</span>
                        <span className={s.chipSub}>{c.examples}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className={s.field}>
              <label htmlFor="buy-part" className={s.label}>
                2 · Part number or spec
              </label>
              <input
                id="buy-part"
                placeholder="64GB DDR5-4800 RDIMM, or an OEM part number"
                value={buy.part}
                onChange={(e) => setBuy({ ...buy, part: e.target.value })}
              />
            </div>
            <div className={s.fieldRow}>
              <div className={s.field}>
                <label htmlFor="buy-qty" className={s.label}>
                  3 · Quantity
                </label>
                <input
                  id="buy-qty"
                  inputMode="numeric"
                  value={buy.quantity}
                  onChange={(e) => setBuy({ ...buy, quantity: digitsOnly(e.target.value) })}
                />
              </div>
              <fieldset className={s.group}>
                <legend className={s.label}>Needed by</legend>
                <div className={s.pillGrid3}>
                  {NEEDED_BY.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      className={`${s.pill} ${s.pillTight}`}
                      aria-pressed={buy.neededBy === w.id}
                      onClick={() => setBuy({ ...buy, neededBy: w.id })}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className={s.field}>
              <label htmlFor="buy-email" className={s.label}>
                4 · Work email
              </label>
              <input
                id="buy-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={buy.email}
                aria-invalid={!!buyError}
                aria-describedby={buyError ? "buy-error" : undefined}
                onChange={(e) => {
                  setBuy({ ...buy, email: e.target.value });
                  setBuyError("");
                }}
              />
            </div>
            <div className={s.honeypot} aria-hidden="true">
              <label htmlFor="buy-website">Website</label>
              <input
                id="buy-website"
                tabIndex={-1}
                autoComplete="off"
                value={buy.website}
                onChange={(e) => setBuy({ ...buy, website: e.target.value })}
              />
            </div>
            <p className={s.note}>
              <Hourglass size={16} aria-hidden="true" />
              <span>OEM lead times on server memory ran past 40 weeks this year. Ask what we can ship from stock.</span>
            </p>
            {buyError && (
              <p id="buy-error" role="alert" className={s.error}>
                {buyError}
              </p>
            )}
            <button type="submit" className="btn btn-accent btn-block" disabled={sending}>
              {sending ? "Sending…" : "Check availability"}
              {!sending && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </form>
        )}

        {!isSell && buyDone && (
          <div className={s.done}>
            <span className={s.doneMark} aria-hidden="true">
              <Check size={26} strokeWidth={2.5} />
            </span>
            <h3 ref={statusHeading} tabIndex={-1} className={s.doneTitle}>
              Request received.
            </h3>
            <p className={s.copy}>
              A sourcing specialist will reply within 4 hours with availability and pricing for {buySummary}.
            </p>
            <button
              type="button"
              className="btn btn-ghost-dark"
              onClick={() => {
                setBuyDone(false);
                setBuy({ ...buy, part: "" });
              }}
            >
              Request another part
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
