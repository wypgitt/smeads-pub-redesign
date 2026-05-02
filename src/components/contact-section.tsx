import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

const mapSrc = `https://www.google.com/maps?q=${site.mapQuery}&output=embed`;

export function ContactSection() {
  return (
    <section
      id="visit"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Find us" title="Visit Smeads">
          <p>
            {site.address.street}, {site.address.city}, {site.address.state}{" "}
            {site.address.zip}
          </p>
          <p className="mt-3">
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-2 text-sm">{site.hoursDisclaimer}</p>
        </SectionHeading>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
            <iframe
              title="Map — Smeads Pub Washougal"
              src={mapSrc}
              className="aspect-square w-full grayscale-[20%] sm:aspect-video lg:aspect-auto lg:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                Phone
              </h3>
              <a
                href={`tel:${site.phoneTel}`}
                className="focus-ring mt-2 inline-block font-serif text-3xl font-semibold tabular-nums text-[var(--text-primary)] hover:text-[var(--accent)]"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
                Hours (summary)
              </h3>
              <ul className="mt-3 space-y-3 text-[var(--text-muted)]">
                {site.hours.map((h) => (
                  <li key={h.label} className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="min-w-[7rem] font-medium text-[var(--text-primary)]">
                      {h.label}
                    </span>
                    <span>{h.lines.join(" · ")}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="focus-ring inline-flex rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] hover:brightness-110"
              >
                Contact &amp; form
              </Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${site.mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex rounded-full border border-[var(--border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
              >
                Open in Google Maps
              </a>
              <a
                href={site.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex rounded-full border border-[var(--border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
