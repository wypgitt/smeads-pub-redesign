import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why Smeads" title="The Columbia Gorge’s neighborhood bar">
          <p>{site.about.lede}</p>
        </SectionHeading>
        <div className="mt-12 space-y-6 text-[var(--text-muted)]">
          {site.about.body.map((p) => (
            <p key={p.slice(0, 40)} className="max-w-3xl text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
