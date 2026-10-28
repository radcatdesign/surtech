import { ArrowRight, TrendingUp } from "lucide-react";
import { ANCHORS } from "@/lib/site";
import s from "./AlertBar.module.css";

/** Timely hook tied to the current market. Update the copy (and its source) as the market moves. */
export function AlertBar() {
  return (
    <div className={s.bar} role="region" aria-label="Market alert">
      <div className={`wrap ${s.inner}`}>
        <span className={s.label}>
          <TrendingUp size={16} aria-hidden="true" className={s.icon} />
          Market alert
        </span>
        <span>Server DRAM contract prices jumped 88 to 93% in Q1 2026. Retired memory is worth more right now.</span>
        <a href={ANCHORS.estimate} className={s.link}>
          Check yours
          <ArrowRight size={14} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
