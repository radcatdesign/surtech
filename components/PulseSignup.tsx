"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail, Send } from "lucide-react";
import { isValidEmail, submitLead } from "@/lib/leads";
import s from "./Sections.module.css";

export function PulseSignup() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a work email like you@company.com.");
      return;
    }
    setSending(true);
    setError("");
    const res = await submitLead({ type: "pulse", email: email.trim(), website });
    setSending(false);
    if (res.ok) setDone(true);
    else setError(res.error);
  }

  return (
    <div className={s.signup}>
      <div className={s.signupCopy}>
        <span className={s.signupIcon}>
          <Mail size={22} aria-hidden="true" />
        </span>
        <div>
          <h3 className={s.signupTitle}>Get Market Pulse every month.</h3>
          <p className={s.signupText}>
            Buyback values, lead times and price moves for IT and procurement teams. One email a month, written by
            our trading desk.
          </p>
        </div>
      </div>
      {done ? (
        <p role="status" className={s.signupDone}>
          <Check size={20} aria-hidden="true" />
          You&rsquo;re subscribed. The next issue goes to {email.trim()}.
        </p>
      ) : (
        <form className={s.signupForm} onSubmit={onSubmit} noValidate>
          <label htmlFor="pulse-email">Work email</label>
          <div className={s.signupRow}>
            <input
              id="pulse-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              aria-invalid={!!error}
              aria-describedby={error ? "pulse-error" : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <button type="submit" className="btn btn-accent" disabled={sending}>
              {sending ? "Sending…" : "Subscribe"}
              {!sending && <Send size={16} aria-hidden="true" />}
            </button>
          </div>
          <div className={s.honeypot} aria-hidden="true">
            <label htmlFor="pulse-website">Website</label>
            <input
              id="pulse-website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          {error && (
            <p id="pulse-error" role="alert" className={s.signupError}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
