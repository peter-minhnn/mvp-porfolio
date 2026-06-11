import { CapabilityBand } from "@/components/capability-band";
import { ContactCta } from "@/components/contact-cta";
import { CvSection } from "@/components/cv-section";
import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { SkillsKeys } from "@/components/skills-keys";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <SelectedWork />
        <CapabilityBand />
        <SkillsKeys />
        <CvSection />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
