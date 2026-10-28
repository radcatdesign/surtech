import { Clock, ShieldCheck, Truck } from "lucide-react";
import { ValueCheck } from "./ValueCheck";
import s from "./Hero.module.css";

const PROOF = [
  { icon: Clock, label: "Reply within 4 hours" },
  { icon: ShieldCheck, label: "NIST 800-88 data destruction" },
  { icon: Truck, label: "On-site de-installation" },
];

const STATS = [
  { label: "Founded", value: "2011" },
  { label: "Enterprise customers", value: "1,250+" },
  { label: "Countries served", value: "45+" },
];

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className="eyebrow">Enterprise hardware buyback + sourcing</p>
          <h1 id="hero-title" className={`display ${s.title}`}>
            <span>Sell what you&rsquo;re retiring.</span>
            <span className={s.titleSecond}>Buy what you can&rsquo;t get.</span>
          </h1>
          <p className={s.lede}>
            AI build-outs drained the world&rsquo;s supply of server memory, drives and GPUs. That pushed up what
            your retired gear is worth and pushed new parts out by months. SUR Technology works both sides of that
            market for enterprise IT teams.
          </p>
          <ul className={s.proof}>
            {PROOF.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className={s.proofIcon}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <dl className={s.stats}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd className="tabular">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ValueCheck />
      </div>
    </section>
  );
}
