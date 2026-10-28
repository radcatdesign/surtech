import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Cable,
  ChartLine,
  CircuitBoard,
  Database,
  Eraser,
  FileBadge,
  FileSpreadsheet,
  Globe,
  Gpu,
  HandCoins,
  HardDrive,
  Headset,
  Hourglass,
  MemoryStick,
  Network,
  PackageSearch,
  ReceiptText,
  ScanBarcode,
  Server,
  ServerCog,
  ShieldCheck,
  Tag,
  TrendingUp,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { ANCHORS, SITE } from "@/lib/site";
import { PulseSignup } from "./PulseSignup";
import s from "./Sections.module.css";

/* ------------------------------------------------------------------ */

const BUYING = [
  "NVIDIA HGX + GPU servers",
  "Dell PowerEdge",
  "HPE ProLiant",
  "Lenovo ThinkSystem",
  "Supermicro",
  "DDR4 + DDR5 RDIMMs",
  "CPUs",
  "NVMe, SAS + SATA drives",
  "Switches + optics",
];

export function BuyingStrip() {
  return (
    <div className={s.strip}>
      <div className={`wrap ${s.stripInner}`}>
        <span className={s.stripLabel}>
          <HandCoins size={16} aria-hidden="true" />
          We buy
        </span>
        <ul className={s.stripList}>
          {BUYING.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Item = { icon: LucideIcon; label: string };

const WE_BUY: Item[] = [
  { icon: ServerCog, label: "GPU servers + HGX systems" },
  { icon: Server, label: "Rack and blade servers" },
  { icon: MemoryStick, label: "DDR4 + DDR5 memory, CPUs" },
  { icon: HardDrive, label: "NVMe, SAS + SATA drives" },
  { icon: Network, label: "Switches, routers + optics" },
  { icon: Database, label: "Storage arrays" },
];

const WE_SOURCE: Item[] = [
  { icon: Gpu, label: "NVIDIA B200, B300 + RTX 50" },
  { icon: ServerCog, label: "AI servers, all major OEMs" },
  { icon: CircuitBoard, label: "Memory, NICs, PSUs, cooling" },
  { icon: HardDrive, label: "SAS, SATA + NVMe with trays" },
  { icon: Cable, label: "Optical transceivers" },
  { icon: Globe, label: "APAC-compliant GPU variants" },
];

export function Desks() {
  return (
    <section id="desks" className={s.section} aria-labelledby="desks-title">
      <div className={`wrap ${s.sectionInner}`}>
        <div className={s.head}>
          <div className={s.headMain}>
            <p className="eyebrow">Two desks, one partner</p>
            <h2 id="desks-title" className={`display ${s.h2}`}>
              Both sides of the secondary market.
            </h2>
          </div>
          <p className={s.headCopy}>
            We buy and we sell. So we price your retired gear against real demand, and we already know where the
            parts you need are sitting.
          </p>
        </div>

        <div className={s.desks}>
          <article id="sell" className={`${s.desk} ${s.deskLight}`}>
            <div className={s.deskTop}>
              <span className={s.deskIcon}>
                <HandCoins size={24} aria-hidden="true" />
              </span>
              <span className={s.deskTags}>
                <span className={s.deskName}>Sell desk</span>
                <span className={s.deskKind}>Buyback + ITAD</span>
              </span>
            </div>
            <h3 className={s.h3}>Retiring hardware? Get paid for it.</h3>
            <p className={s.deskCopy}>
              We buy decommissioned data center equipment, handle the de-install, destroy the data and pay you
              what it&rsquo;s worth on today&rsquo;s market. Fully depreciated on your books doesn&rsquo;t mean
              worthless.
            </p>
            <div className={s.listBlock}>
              <p className={s.listLabel}>What we buy</p>
              <ul className={s.iconList}>
                {WE_BUY.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.deskFoot}>
              <a href={ANCHORS.estimate} className="btn btn-ink">
                Estimate my hardware
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <span className={s.brands}>Dell · HPE · Lenovo · Supermicro · Cisco · NVIDIA</span>
            </div>
          </article>

          <article id="buy" className={`${s.desk} ${s.deskDark}`}>
            <div className={s.deskTop}>
              <span className={s.deskIcon}>
                <PackageSearch size={24} aria-hidden="true" />
              </span>
              <span className={s.deskTags}>
                <span className={s.deskName}>Buy desk</span>
                <span className={s.deskKind}>Sourcing + warranty</span>
              </span>
            </div>
            <h3 className={s.h3}>Can&rsquo;t wait 40 weeks? Don&rsquo;t.</h3>
            <p className={s.deskCopy}>
              OEM lead times on server memory stretched past 40 weeks this year and list prices kept climbing. We
              source Tier 1 parts through a global supply chain we&rsquo;ve run since 2011, with extended warranties
              available.
            </p>
            <div className={s.listBlock}>
              <p className={s.listLabel}>What we source</p>
              <ul className={s.iconList}>
                {WE_SOURCE.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <Icon size={18} aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.deskFoot}>
              <a href={ANCHORS.source} className="btn btn-accent">
                Request a part
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <span className={s.brands}>New, refurbished + used</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PULSE: { icon: LucideIcon; figure: string; text: string; source: string; href: string }[] = [
  {
    icon: TrendingUp,
    figure: "+88–93%",
    text: "Server DRAM contract prices, Q1 2026 versus the quarter before.",
    source: "TrendForce, via heise online",
    href: "https://heise.de/-11164238",
  },
  {
    icon: Hourglass,
    figure: "40+ wks",
    text: "Lead time on larger DRAM orders. Before the shortage it was 8 to 12 weeks.",
    source: "SoftwareSeni, May 2026",
    href: "https://www.softwareseni.com/dram-up-70-to-110-percent-what-it-means-for-enterprise-hardware-budgets",
  },
  {
    icon: Tag,
    figure: "~34%",
    text: "Dell's cumulative hardware price increases in Q1 2026 alone.",
    source: "SoftwareSeni, May 2026",
    href: "https://www.softwareseni.com/dram-up-70-to-110-percent-what-it-means-for-enterprise-hardware-budgets",
  },
  {
    icon: ChartLine,
    figure: "$4.1B",
    text: "Used and refurbished data center GPU market in 2026, growing about 18% a year.",
    source: "Meticulous Research, Oct 2026",
    href: "https://www.meticulousresearch.com/product/used-refurbished-data-center-gpu-market-6983",
  },
];

export function MarketPulse() {
  return (
    <section id="pulse" className={`${s.section} ${s.dark}`} aria-labelledby="pulse-title">
      <div className={`wrap ${s.sectionInner}`}>
        <div className={s.head}>
          <div className={s.headMain}>
            <p className={`eyebrow ${s.eyebrowAccent}`}>Market Pulse · October 2026</p>
            <h2 id="pulse-title" className={`display ${s.h2}`}>
              The market your hardware sells into.
            </h2>
          </div>
          <p className={s.headCopy}>
            AI data centers are buying memory, storage and GPUs faster than fabs can make them. Here&rsquo;s what
            that does to your budget on both sides of the ledger.
          </p>
        </div>

        <ul className={s.pulseGrid}>
          {PULSE.map(({ icon: Icon, figure, text, source, href }) => (
            <li key={figure} className={s.pulseTile}>
              <Icon size={22} aria-hidden="true" className={s.pulseIcon} />
              <span className={`${s.pulseFigure} tabular`}>{figure}</span>
              <span className={s.pulseText}>{text}</span>
              <a className={s.pulseSource} href={href} target="_blank" rel="noopener noreferrer">
                Source: {source}
              </a>
            </li>
          ))}
        </ul>

        <PulseSignup />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: FileSpreadsheet, title: "Send your list", text: "Share an asset list or a spreadsheet export. Bigger estate? We'll evaluate it on site." },
  { icon: ReceiptText, title: "Get an itemized offer", text: "Every line priced against current secondary market demand, so you can see exactly where the value sits." },
  { icon: Truck, title: "We de-install and ship", text: "Our crew de-racks, manages cabling, packs and handles logistics, then cleans up the site." },
  { icon: Banknote, title: "Data destroyed. You get paid.", text: "Certified sanitization or physical destruction, a certificate of destruction for your auditors, then payment." },
];

export function Process() {
  return (
    <section id="process" className={s.section} aria-labelledby="process-title">
      <div className={`wrap ${s.sectionInner} ${s.processInner}`}>
        <div className={s.headMain}>
          <p className="eyebrow">Selling to SUR</p>
          <h2 id="process-title" className={`display ${s.h2}`}>
            From rack to paid in four steps.
          </h2>
        </div>
        <ol className={s.steps}>
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className={s.step}>
              <div className={s.stepTop}>
                <span className={s.stepNum}>Step {String(i + 1).padStart(2, "0")}</span>
                <span className={s.stepIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>
              </div>
              <h3 className={s.stepTitle}>{title}</h3>
              <p className={s.stepText}>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const SECURITY: { icon: LucideIcon; term: string; text: string }[] = [
  { icon: ShieldCheck, term: "NIST SP 800-88", text: "Clear, purge or destroy, matched to the media type and your policy." },
  { icon: Eraser, term: "DoD 5220.22-M", text: "Multi-pass overwrite when your policy calls for it." },
  { icon: FileBadge, term: "Certificate of destruction", text: "Documentation for your auditors once disposition is complete." },
  { icon: ScanBarcode, term: "Chain of custody", text: "Tracked from your loading dock to final disposition." },
];

export function Security() {
  return (
    <section id="security" className={s.section} aria-labelledby="security-title">
      <div className={`wrap ${s.securityWrap}`}>
        <div className={s.securityCard}>
          <div className={s.securityIntro}>
            <p className="eyebrow">Data security</p>
            <h2 id="security-title" className={`display ${s.h2} ${s.h2Small}`}>
              Your data leaves with us. Then it&rsquo;s gone.
            </h2>
            <p className={s.headCopy}>
              Every drive is accounted for from the moment it leaves your rack. You get the paperwork your security
              and compliance teams will ask for.
            </p>
          </div>
          <dl className={s.specList}>
            {SECURITY.map(({ icon: Icon, term, text }) => (
              <div key={term} className={s.specRow}>
                <dt>
                  <Icon size={20} aria-hidden="true" />
                  {term}
                </dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ABOUT: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Building2, label: "Who we serve", value: "Data centers, ISPs, OEMs, integrators, VARs" },
  { icon: Globe, label: "Reach", value: "45+ countries" },
  { icon: Headset, label: "Support", value: "24/7 technical support" },
  { icon: BadgeCheck, label: "Warranty", value: "Extended warranties available" },
];

export function About() {
  return (
    <section id="about" className={`${s.section} ${s.ruled}`} aria-labelledby="about-title">
      <div className={`wrap ${s.aboutInner}`}>
        <div className={s.aboutIntro}>
          <p className="eyebrow">About SUR Technology</p>
          <h2 id="about-title" className={`display ${s.h2} ${s.h2Small}`}>
            An independent hardware desk out of Tustin, California.
          </h2>
          <p className={s.headCopy}>
            Since {SITE.founded} we&rsquo;ve sourced and recovered hardware for enterprise data centers, ISPs, OEMs,
            system integrators and value-added resellers. Fewer handoffs, less red tape, and a team that picks up the
            phone.
          </p>
        </div>
        <dl className={s.aboutGrid}>
          {ABOUT.map(({ icon: Icon, label, value }) => (
            <div key={label}>
              <dt>
                <Icon size={18} aria-hidden="true" />
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section className={s.cta} aria-labelledby="cta-title">
      <div className={`wrap ${s.ctaInner}`}>
        <h2 id="cta-title" className={`display ${s.ctaTitle}`}>
          Retiring a rack this quarter? Let&rsquo;s put a number on it.
        </h2>
        <div className={s.ctaSide}>
          <div className={s.ctaButtons}>
            <a href={ANCHORS.estimate} className="btn btn-ink">
              <HandCoins size={18} aria-hidden="true" />
              Estimate my hardware
            </a>
            <a href={ANCHORS.source} className="btn btn-outline">
              <PackageSearch size={18} aria-hidden="true" />
              Request a part
            </a>
          </div>
          <p className={s.ctaContact}>
            <a href={SITE.phoneHref}>{SITE.phone}</a> · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
