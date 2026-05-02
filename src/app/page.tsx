import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { HoursStrip } from "@/components/hours-strip";
import { AboutSection } from "@/components/about-section";
import { MenuSection } from "@/components/menu-section";
import { SpecialsSection } from "@/components/specials-section";
import { EventsSection } from "@/components/events-section";
import { KaraokeSection } from "@/components/karaoke-section";
import { GallerySection } from "@/components/gallery-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--bg-deep)]">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HoursStrip />
        <AboutSection />
        <MenuSection />
        <SpecialsSection />
        <EventsSection />
        <KaraokeSection />
        <GallerySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
