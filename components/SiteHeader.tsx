"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { ANCHORS, SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import s from "./SiteHeader.module.css";

const NAV = [
  { href: "#sell", label: "Sell hardware" },
  { href: "#buy", label: "Buy hardware" },
  { href: "#security", label: "Data security" },
  { href: "#pulse", label: "Market Pulse" },
  { href: "#about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={s.header}>
      <div className={`wrap ${s.bar}`}>
        <a href="#top" className={s.brand} aria-label="SUR Technology home">
          <Wordmark />
        </a>

        <nav id="site-nav" aria-label="Main" className={s.nav} data-open={open}>
          <ul className={s.links}>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={close}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={s.navFoot}>
            <a href={ANCHORS.estimate} className={`btn btn-ink ${s.navCta}`} onClick={close}>
              Get an offer
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className={s.navPhone} href={SITE.phoneHref}>
              <Phone size={16} aria-hidden="true" />
              {SITE.phone}
            </a>
          </div>
        </nav>

        <div className={s.actions}>
          <a className={s.phone} href={SITE.phoneHref}>
            <Phone size={16} aria-hidden="true" />
            {SITE.phone}
          </a>
          <a href={ANCHORS.estimate} className={`btn btn-ink ${s.cta}`} onClick={close}>
            Get an offer
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
