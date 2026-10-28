import s from "./Wordmark.module.css";

/** Typographic stand-in until SUR's final logo files arrive. Swap the markup here and it updates everywhere. */
export function Wordmark({ tone = "ink", size = "md" }: { tone?: "ink" | "light"; size?: "md" | "sm" }) {
  return (
    <span className={`${s.mark} ${tone === "light" ? s.light : ""} ${size === "sm" ? s.sm : ""}`}>
      <svg className={s.glyph} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="2" y="3" width="22" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="2" y="10" width="22" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="2" y="17" width="22" height="6" rx="1" stroke="currentColor" strokeWidth="2" />
        <circle cx="19.5" cy="13" r="1.7" fill="var(--accent)" />
      </svg>
      <span className={s.sur}>SUR</span>
      <span className={s.tech}>TECHNOLOGY</span>
    </span>
  );
}
