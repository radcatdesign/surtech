import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ANCHORS, SITE } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import s from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.inner}`}>
        <div className={s.cols}>
          <div className={s.brandCol}>
            <Wordmark tone="light" size="sm" />
            <p className={s.line}>
              <MapPin size={16} aria-hidden="true" />
              <span>
                {SITE.address.street}
                <br />
                {SITE.address.city}
              </span>
            </p>
          </div>

          <nav aria-label="Sell" className={s.col}>
            <span className={s.colLabel}>Sell</span>
            <a href={ANCHORS.estimate}>Hardware buyback</a>
            <a href="#process">Data center decommissioning</a>
            <a href="#security">Data destruction</a>
          </nav>

          <nav aria-label="Buy" className={s.col}>
            <span className={s.colLabel}>Buy</span>
            <a href={ANCHORS.source}>GPUs + AI servers</a>
            <a href={ANCHORS.source}>Memory + server options</a>
            <a href={ANCHORS.source}>Storage + optics</a>
          </nav>

          <div className={s.col}>
            <span className={s.colLabel}>Talk to the desk</span>
            <a className={s.line} href={SITE.phoneHref}>
              <Phone size={16} aria-hidden="true" />
              {SITE.phone}
            </a>
            <a className={s.line} href={`mailto:${SITE.email}`}>
              <Mail size={16} aria-hidden="true" />
              {SITE.email}
            </a>
            <span className={s.line}>
              <Clock size={16} aria-hidden="true" />
              {SITE.hours} · 24/7 support
            </span>
          </div>
        </div>

        <div className={s.bottom}>
          <span>© {new Date().getFullYear()} SUR Technology. All rights reserved.</span>
          <a href="#top" className={s.top}>
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
