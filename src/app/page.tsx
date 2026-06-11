import { CapabilityBand } from "@/components/capability-band";
import { ContactCta } from "@/components/contact-cta";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { ProjectsGrid } from "@/components/projects-grid";
import { SelectedWork } from "@/components/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Testimonials } from "@/components/testimonials";
import { TrustStrip } from "@/components/trust-strip";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <SelectedWork />
        <CapabilityBand />
        <Process />
        <ProjectsGrid />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
