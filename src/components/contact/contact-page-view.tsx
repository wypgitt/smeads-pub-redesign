"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  MessageSquareText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AskSmeadsAiCta } from "@/components/contact/ask-smeads-ai-cta";
import { site } from "@/data/site";

type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | {
      kind: "success";
      delivery: "email" | "manual";
      message: string;
      plain?: string;
    }
  | { kind: "error"; message: string };

export function ContactPageView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const mapSrc = `https://www.google.com/maps?q=${site.mapQuery}&output=embed`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          website: honeypot,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        delivery?: "email" | "manual";
        message?: string;
        plain?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong. Try calling us.",
        });
        return;
      }

      setStatus({
        kind: "success",
        delivery: data.delivery ?? "manual",
        message: data.message ?? "Thanks for reaching out.",
        plain: data.plain,
      });
      setCopied(false);
      if (data.delivery === "email") {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Call or email us instead.",
      });
    }
  }

  async function copyPlain() {
    if (status.kind !== "success" || !status.plain) return;
    try {
      await navigator.clipboard.writeText(status.plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({
        kind: "error",
        message: "Could not copy — select the text in your email app instead.",
      });
    }
  }

  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(`Message for ${site.name}`)}`;

  return (
    <div className="grain relative pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[var(--accent)]/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Contact
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Get in touch
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-lg text-[var(--text-muted)]">
          {site.contactIntro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <div className="mt-14 max-w-3xl">
          <AskSmeadsAiCta />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <div className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-lg shadow-black/20">
              <iframe
                title="Map — Smeads Pub Washougal"
                src={mapSrc}
                className="aspect-[4/3] w-full grayscale-[15%] sm:aspect-video"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="border-t border-[var(--border-subtle)] p-5">
                <div className="flex gap-3">
                  <MapPin
                    className="mt-0.5 size-5 shrink-0 text-[var(--accent)]"
                    aria-hidden
                  />
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">
                      {site.address.street}
                    </p>
                    <p className="text-[var(--text-muted)]">
                      {site.address.city}, {site.address.state} {site.address.zip}
                    </p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${site.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring mt-3 inline-flex text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="hours"
              className="scroll-mt-28 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6"
            >
              <h2 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                Hours
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {site.hoursDisclaimer}
              </p>
              <ul className="mt-5 space-y-3 text-[var(--text-muted)]">
                {site.hours.map((h) => (
                  <li
                    key={h.label}
                    className="flex flex-col gap-0.5 border-b border-[var(--border-subtle)] pb-3 last:border-b-0 last:pb-0 sm:flex-row sm:justify-between"
                  >
                    <span className="font-medium text-[var(--text-primary)]">
                      {h.label}
                    </span>
                    <span>{h.lines.join(" · ")}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={`tel:${site.phoneTel}`}
                className="focus-ring flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--accent)]"
              >
                <Phone className="size-5 shrink-0 text-[var(--accent)]" aria-hidden />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Phone
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold tabular-nums text-[var(--text-primary)]">
                    {site.phone}
                  </p>
                </div>
              </a>
              <a
                href={mailtoHref}
                className="focus-ring flex items-start gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 transition hover:border-[var(--accent)]"
              >
                <Mail className="size-5 shrink-0 text-[var(--accent)]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    Email
                  </p>
                  <p className="mt-1 break-all font-medium text-[var(--text-primary)]">
                    {site.email}
                  </p>
                </div>
              </a>
            </div>

            <p className="text-center text-sm text-[var(--text-muted)] lg:text-left">
              <Link href="/" className="text-[var(--accent)] hover:underline">
                ← Back to home
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <MessageSquareText
                className="size-5 text-[var(--accent)]"
                aria-hidden
              />
              <h2 className="font-serif text-xl font-semibold">Send a message</h2>
            </div>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Tap requests, party questions, or leave your number if you’d like a call back.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-ring mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus-ring mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Phone{" "}
                  <span className="font-normal normal-case text-[var(--text-muted)]">
                    (optional)
                  </span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="focus-ring mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)]"
                  placeholder={site.phone}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Event date, party size, tap ideas…"
                  className="focus-ring mt-1 w-full resize-y rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
              </div>

              <AnimatePresence mode="wait">
                {status.kind === "error" ? (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                    role="alert"
                  >
                    {status.message}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status.kind === "submitting"}
                className="focus-ring w-full rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:brightness-110 disabled:opacity-60"
              >
                {status.kind === "submitting" ? "Sending…" : "Send message"}
              </button>

              <AnimatePresence>
                {status.kind === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm text-emerald-100"
                  >
                    <p>{status.message}</p>
                    {status.delivery === "manual" && status.plain ? (
                      <div className="mt-4 space-y-3">
                        <button
                          type="button"
                          onClick={copyPlain}
                          className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                        >
                          {copied ? (
                            <Check className="size-4 text-emerald-400" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                          {copied ? "Copied" : "Copy message text"}
                        </button>
                        <a
                          href={`mailto:${site.email}?subject=${encodeURIComponent(`Contact from ${name || "website"}`)}&body=${encodeURIComponent(message)}`}
                          className="focus-ring block text-center text-xs font-semibold text-[var(--accent)] underline"
                        >
                          Or open email to {site.email}
                        </a>
                      </div>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
