import { AlertBar } from "@/components/AlertBar";
import { Hero } from "@/components/Hero";
import { About, BuyingStrip, Desks, FinalCta, MarketPulse, Process, Security } from "@/components/Sections";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <div id="top">
      <AlertBar />
      <SiteHeader />
      <main>
        <Hero />
        <BuyingStrip />
        <Desks />
        <MarketPulse />
        <Process />
        <Security />
        <About />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
