import { Mic2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

export function KaraokeSection() {
  return (
    <section
      id="karaoke"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Friday & Saturday" title={site.karaoke.title}>
            <p className="flex items-center gap-2 text-[var(--text-muted)]">
              <Mic2 className="size-5 shrink-0 text-[var(--accent)]" aria-hidden />
              Live DJ · multiple screens · serious sound
            </p>
          </SectionHeading>
          <div className="space-y-5 text-lg leading-relaxed text-[var(--text-muted)]">
            {site.karaoke.body.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
