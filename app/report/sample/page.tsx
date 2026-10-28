import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileBadge,
  Gpu,
  HardDrive,
  Layers,
  MemoryStick,
  Network,
  Phone,
  Mail,
  ScanBarcode,
  Server,
  ShieldCheck,
  Truck,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { SITE } from "@/lib/site";
import s from "./report.module.css";

export const metadata: Metadata = {
  title: "Sample Market Value Report",
  description: "What a lead receives after running the Value Check: an itemized valuation of their retired hardware.",
  robots: { index: false, follow: false },
};

type Path = "Resell whole" | "Harvest parts" | "Wipe + resell" | "Recycle";

interface Line {
  icon: LucideIcon;
  item: string;
  detail: string;
  qty: number;
  age: string;
  unitLow: number;
  unitHigh: number;
  path: Path;
}

/** SAMPLE DATA. Illustrates the deliverable; not a real customer or a real offer. */
const LINES: Line[] = [
  { icon: Gpu, item: "NVIDIA A100 80GB PCIe", detail: "Pulled from 4-GPU nodes", qty: 16, age: "3 yrs", unitLow: 11_000, unitHigh: 14_500, path: "Resell whole" },
  { icon: Server, item: "Dell PowerEdge R750", detail: "2× Xeon Gold 6338 · 512GB", qty: 48, age: "3 yrs", unitLow: 2_400, unitHigh: 3_300, path: "Resell whole" },
  { icon: MemoryStick, item: "64GB DDR4-3200 RDIMM", detail: "Pulled from the R640 fleet", qty: 384, age: "5 yrs", unitLow: 95, unitHigh: 140, path: "Harvest parts" },
  { icon: HardDrive, item: "3.84TB U.2 NVMe", detail: "Samsung PM1733", qty: 96, age: "3 yrs", unitLow: 210, unitHigh: 320, path: "Wipe + resell" },
  { icon: Network, item: "Cisco Nexus 93180YC-FX", detail: "48× 25G · 6× 100G", qty: 6, age: "5 yrs", unitLow: 1_600, unitHigh: 2_600, path: "Resell whole" },
  { icon: Layers, item: "Dell PowerEdge R640 chassis", detail: "Stripped of memory + drives", qty: 32, age: "6 yrs", unitLow: 40, unitHigh: 90, path: "Recycle" },
];

const PATH_CLASS: Record<Path, string> = {
  "Resell whole": s.pathResell,
  "Harvest parts": s.pathHarvest,
  "Wipe + resell": s.pathWipe,
  Recycle: s.pathRecycle,
};

const MONTHLY_DECLINE = 0.028;
const BAR_COLORS = ["var(--accent)", "#a9b4b6", "#8f9b9e", "#6b787c"];

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const k = (n: number) => `$${(n / 1000).toFixed(1)}K`;

export default function SampleReportPage() {
  const totalUnits = LINES.reduce((sum, l) => sum + l.qty, 0);
  const totalLow = LINES.reduce((sum, l) => sum + l.qty * l.unitLow, 0);
  const totalHigh = LINES.reduce((sum, l) => sum + l.qty * l.unitHigh, 0);
  const mid = (totalLow + totalHigh) / 2;
  const hold = [0, 1, 2, 3].map((m) => mid * Math.pow(1 - MONTHLY_DECLINE, m));
  const atRisk = mid - hold[3];
  const gpuShare = (16 * (11_000 + 14_500)) / 2 / mid;

  return (
    <main className={s.page}>
      <article className={s.sheet} aria-label="Sample Market Value Report">
        <header className={s.header}>
          <div className={s.headerTop}>
            <Wordmark tone="light" size="sm" />
            <span className={s.sample}>Sample report</span>
          </div>
          <div>
            <h1 className={s.title}>Market Value Report</h1>
            <p className={s.preparedFor}>Prepared for [Company] · [Contact name], [Title]</p>
          </div>
          <dl className={s.meta}>
            <div>
              <dt>Report no.</dt>
              <dd>SUR-MVR-[0000]</dd>
            </div>
            <div>
              <dt>Valued on</dt>
              <dd>[Date]</dd>
            </div>
            <div>
              <dt>Line items</dt>
              <dd>
                {LINES.length} lines · {totalUnits} units
              </dd>
            </div>
            <div>
              <dt>Specialist</dt>
              <dd>[Specialist name]</dd>
            </div>
          </dl>
        </header>

        <div className={s.content}>
          <section className={s.summary} aria-label="Summary">
            <div>
              <span className={s.kicker}>Estimated recovery</span>
              <span className={s.big}>
                {k(totalLow)}–{k(totalHigh)}
              </span>
              <span className={s.accentBar} aria-hidden="true" />
            </div>
            <div>
              <span className={s.kicker}>Midpoint</span>
              <span className={s.big}>{k(mid)}</span>
            </div>
            <div>
              <span className={s.kicker}>At risk if held 90 days</span>
              <span className={`${s.big} ${s.risk}`}>
                <TrendingDown size={26} aria-hidden="true" />
                {k(atRisk)}
              </span>
            </div>
          </section>

          <section aria-labelledby="items-title" className={s.block}>
            <h2 id="items-title" className={s.blockTitle}>
              Itemized valuation
            </h2>
            <div className={s.tableScroll}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col" className={s.num}>
                      Qty
                    </th>
                    <th scope="col" className={s.num}>
                      Age
                    </th>
                    <th scope="col" className={s.num}>
                      Unit value
                    </th>
                    <th scope="col" className={s.num}>
                      Line value
                    </th>
                    <th scope="col">Path</th>
                  </tr>
                </thead>
                <tbody>
                  {LINES.map((l) => {
                    const Icon = l.icon;
                    return (
                      <tr key={l.item}>
                        <td>
                          <span className={s.itemCell}>
                            <Icon size={18} aria-hidden="true" />
                            <span>
                              <span className={s.itemName}>{l.item}</span>
                              <span className={s.itemDetail}>{l.detail}</span>
                            </span>
                          </span>
                        </td>
                        <td className={s.num}>{l.qty}</td>
                        <td className={s.num}>{l.age}</td>
                        <td className={s.num}>
                          {usd(l.unitLow)}–{usd(l.unitHigh)}
                        </td>
                        <td className={`${s.num} ${s.strong}`}>
                          {k(l.qty * l.unitLow)}–{k(l.qty * l.unitHigh)}
                        </td>
                        <td>
                          <span className={`${s.path} ${PATH_CLASS[l.path]}`}>{l.path}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td className={s.num}>{totalUnits}</td>
                    <td />
                    <td />
                    <td className={s.num}>
                      {k(totalLow)}–{k(totalHigh)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>

          <div className={s.split}>
            <section aria-labelledby="hold-title" className={s.block}>
              <h2 id="hold-title" className={s.blockTitle}>
                Sell now vs. hold
              </h2>
              <figure className={s.chart}>
                <div
                  className={s.bars}
                  role="img"
                  aria-label={`Midpoint value if held: ${hold.map((v, i) => `${i === 0 ? "now" : `${i * 30} days`} ${k(v)}`).join(", ")}`}
                >
                  {hold.map((v, i) => (
                    <div key={i} className={s.barCol}>
                      <span className={s.barValue}>{k(v)}</span>
                      <span className={s.bar} style={{ height: `${(v / hold[0]) * 160}px`, background: BAR_COLORS[i] }} />
                    </div>
                  ))}
                </div>
                <div className={s.barLabels} aria-hidden="true">
                  <span>Now</span>
                  <span>30 days</span>
                  <span>60 days</span>
                  <span>90 days</span>
                </div>
                <figcaption>
                  Midpoint value if the estate sits idle. Bars start at zero. Assumes about{" "}
                  {(MONTHLY_DECLINE * 100).toFixed(1)}% decline per month across this mix.
                </figcaption>
              </figure>
            </section>

            <section aria-labelledby="plan-recs" className={s.block}>
              <h2 id="plan-recs" className={s.blockTitle}>
                What we&rsquo;d do
              </h2>
              <ul className={s.recs}>
                <li>
                  <strong>Sell the A100s first.</strong>
                  <span>
                    They carry {gpuShare > 0.45 ? "nearly half" : "a large share"} of the estate&rsquo;s value and lose
                    the most each time a newer GPU generation ships.
                  </span>
                </li>
                <li>
                  <strong>Pull the memory before the R640s go.</strong>
                  <span>Loose DDR4 RDIMMs are worth far more than the same modules left inside a six-year-old chassis.</span>
                </li>
                <li>
                  <strong>Sell the 48 R750s as one matched lot.</strong>
                  <span>Identical configurations move faster and price higher than mixed pallets.</span>
                </li>
              </ul>
            </section>
          </div>

          <section aria-labelledby="plan-title" className={s.block}>
            <h2 id="plan-title" className={s.blockTitle}>
              Disposition + data security
            </h2>
            <ul className={s.plan}>
              <li>
                <ShieldCheck size={20} aria-hidden="true" />
                <strong>NIST 800-88</strong>
                <span>Purge on all NVMe before resale</span>
              </li>
              <li>
                <FileBadge size={20} aria-hidden="true" />
                <strong>Certificate</strong>
                <span>Certificate of destruction for your auditors</span>
              </li>
              <li>
                <ScanBarcode size={20} aria-hidden="true" />
                <strong>Custody</strong>
                <span>Tracked from your dock to final disposition</span>
              </li>
              <li>
                <Truck size={20} aria-hidden="true" />
                <strong>De-install</strong>
                <span>Crew on site [date], site cleaned after</span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="next-title" className={s.next}>
            <div>
              <h2 id="next-title">Ready to move on this?</h2>
              <p>Reply to accept the offer, or book a 15-minute review with [Specialist name].</p>
            </div>
            <div className={s.nextContact}>
              <a href={SITE.phoneHref}>
                <Phone size={16} aria-hidden="true" />
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`}>
                <Mail size={16} aria-hidden="true" />
                {SITE.email}
              </a>
            </div>
          </section>
        </div>

        <footer className={s.footer}>
          <p>
            Indicative values based on secondary market activity as of [Date]. The final offer follows a physical
            audit of model, configuration and condition. Sample report: all figures shown for illustration.
          </p>
          <div className={s.footerRow}>
            <span>
              SUR Technology · {SITE.address.street}, {SITE.address.city}
            </span>
            <span>Page 1 of 1</span>
          </div>
        </footer>
      </article>
      <p className={s.back}>
        <Link href="/">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to the homepage
        </Link>
      </p>
    </main>
  );
}
