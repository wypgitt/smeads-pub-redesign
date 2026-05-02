"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTakeoutItem,
  takeoutCategories,
  takeoutItems,
  type TakeoutCategoryId,
  type TakeoutItemId,
} from "@/data/takeout-menu";
import { site } from "@/data/site";
import {
  cartSubtotal,
  formatMoney,
  formatOrderPlainText,
  type CartLine,
} from "@/lib/takeout-format";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | {
      kind: "success";
      orderRef: string;
      delivery: "email" | "manual";
      message: string;
      plain: string;
    }
  | { kind: "error"; message: string };

function linesFromCart(cart: Record<string, number>): CartLine[] {
  return (Object.entries(cart) as [TakeoutItemId, number][])
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ id, qty }));
}

export function TakeoutOrderClient() {
  const [category, setCategory] = useState<TakeoutCategoryId>(
    takeoutCategories[0]!.id,
  );
  const [cart, setCart] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupMode, setPickupMode] = useState<"asap" | "schedule">("asap");
  const [pickupDetail, setPickupDetail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => linesFromCart(cart), [cart]);
  const subtotal = useMemo(() => cartSubtotal(lines), [lines]);
  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.qty, 0),
    [lines],
  );

  const filtered = useMemo(
    () => takeoutItems.filter((i) => i.categoryId === category),
    [category],
  );

  function bump(id: TakeoutItemId, delta: number) {
    setCart((prev) => {
      const next = { ...prev };
      const q = (next[id] ?? 0) + delta;
      if (q <= 0) delete next[id];
      else next[id] = Math.min(25, q);
      return next;
    });
  }

  async function submit() {
    if (lines.length === 0) {
      setStatus({ kind: "error", message: "Add something tasty to your cart first." });
      return;
    }
    if (!name.trim()) {
      setStatus({
        kind: "error",
        message: "Add your name so we know who’s picking up.",
      });
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setStatus({
        kind: "error",
        message: "Add a mobile number we can reach for pickup timing.",
      });
      return;
    }
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/takeout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          phone,
          pickupMode,
          pickupDetail:
            pickupMode === "schedule" ? pickupDetail : "",
          notes,
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        orderRef?: string;
        delivery?: "email" | "manual";
        message?: string;
        plain?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "Something went wrong. Try calling the pub.",
        });
        return;
      }
      setStatus({
        kind: "success",
        orderRef: data.orderRef ?? "",
        delivery: data.delivery ?? "manual",
        message: data.message ?? "Order received.",
        plain: data.plain ?? "",
      });
      setCopied(false);
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Call the pub and we’ll take your order.",
      });
    }
  }

  async function copyFallbackSummary() {
    const plain =
      status.kind === "success" && status.plain
        ? status.plain
        : formatOrderPlainText({
            orderRef: "COPY-PREVIEW",
            customerName: name || "(your name)",
            phone: phone || site.phone,
            pickupMode,
            pickupDetail,
            notes,
            lines,
          });
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatus({
        kind: "error",
        message: "Could not copy — select the text below manually.",
      });
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Takeout
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Order for pickup
        </h1>
        <p className="mt-3 text-[var(--text-muted)]">
          Build your order here; we&apos;ll confirm prep time by phone when needed.
          Pay at pickup unless we&apos;ve arranged something else.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_min(26rem,100%)] lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2 border-b border-[var(--border-subtle)] pb-4">
            {takeoutCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c.id
                    ? "bg-[var(--accent)] text-[var(--bg-deep)]"
                    : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <ul className="mt-8 space-y-4">
            {filtered.map((item) => {
              const qty = cart[item.id] ?? 0;
              return (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                      {item.name}
                    </p>
                    {item.description.trim() ? (
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        {item.description}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm font-medium text-[var(--accent)]">
                      {formatMoney(item.priceCents)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      className="focus-ring flex size-10 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-primary)] disabled:opacity-40"
                      onClick={() => bump(item.id, -1)}
                      disabled={qty <= 0}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="min-w-[2ch] text-center tabular-nums text-[var(--text-primary)]">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add one ${item.name}`}
                      className="focus-ring flex size-10 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--bg-deep)]"
                      onClick={() => bump(item.id, 1)}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-sm text-[var(--text-muted)]">
            Don&apos;t see what you want? Mention it in the notes or{" "}
            <a
              href={`tel:${site.phoneTel}`}
              className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            >
              call {site.phone}
            </a>
            — we&apos;ll see what the kitchen can do.
          </p>
        </div>

        <aside
          id="cart"
          className="lg:sticky lg:top-24"
        >
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 shadow-xl shadow-black/20">
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <ShoppingBag className="size-5 text-[var(--accent)]" aria-hidden />
              <h2 className="font-serif text-xl font-semibold">Your order</h2>
            </div>

            {lines.length === 0 ? (
              <p className="mt-4 text-sm text-[var(--text-muted)]">
                Cart is empty — add starters or a burger from the left.
              </p>
            ) : (
              <ul className="mt-4 space-y-3 border-b border-[var(--border-subtle)] pb-4">
                {lines.map((line) => {
                  const item = getTakeoutItem(line.id);
                  if (!item) return null;
                  return (
                    <li
                      key={line.id}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <span className="text-[var(--text-muted)]">
                        <span className="font-medium text-[var(--text-primary)]">
                          {line.qty}×
                        </span>{" "}
                        {item.name}
                      </span>
                      <span className="shrink-0 tabular-nums text-[var(--text-primary)]">
                        {formatMoney(item.priceCents * line.qty)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-4 flex items-center justify-between text-[var(--text-primary)]">
              <span className="font-semibold">Subtotal</span>
              <span className="font-serif text-xl font-semibold tabular-nums">
                {formatMoney(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Tax may be added at pickup. Menu items & prices are examples — sync with your printed menu.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="takeout-name"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Name
                </label>
                <input
                  id="takeout-name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus-ring mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="takeout-phone"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Mobile phone
                </label>
                <input
                  id="takeout-phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="focus-ring mt-1 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  placeholder={site.phone}
                />
              </div>

              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  Pickup
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPickupMode("asap")}
                    className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold ${
                      pickupMode === "asap"
                        ? "bg-[var(--accent)] text-[var(--bg-deep)]"
                        : "border border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    ASAP
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupMode("schedule")}
                    className={`focus-ring rounded-full px-4 py-2 text-sm font-semibold ${
                      pickupMode === "schedule"
                        ? "bg-[var(--accent)] text-[var(--bg-deep)]"
                        : "border border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}
                  >
                    Schedule
                  </button>
                </div>
                {pickupMode === "schedule" ? (
                  <input
                    value={pickupDetail}
                    onChange={(e) => setPickupDetail(e.target.value)}
                    className="focus-ring mt-3 w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                    placeholder="e.g. Today around 6:15 pm"
                  />
                ) : null}
              </fieldset>

              <div>
                <label
                  htmlFor="takeout-notes"
                  className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]"
                >
                  Notes (allergies, sauces, extras)
                </label>
                <textarea
                  id="takeout-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="focus-ring mt-1 w-full resize-y rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  placeholder="No onions, extra ranch…"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status.kind === "error" ? (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                  role="alert"
                >
                  {status.message}
                </motion.p>
              ) : null}
            </AnimatePresence>

            <button
              type="button"
              disabled={status.kind === "submitting" || lines.length === 0}
              onClick={submit}
              className="focus-ring mt-6 flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.kind === "submitting" ? "Sending…" : "Send takeout order"}
            </button>

            <AnimatePresence>
              {status.kind === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm text-emerald-100"
                >
                  <p className="font-semibold text-emerald-50">
                    {status.orderRef}
                  </p>
                  <p className="mt-2 leading-relaxed">{status.message}</p>
                  {status.delivery === "manual" ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={copyFallbackSummary}
                        className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                      >
                        {copied ? (
                          <Check className="size-4 text-emerald-400" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                        {copied ? "Copied" : "Copy order summary"}
                      </button>
                      <a
                        href={`sms:${site.phoneTel}?body=${encodeURIComponent(status.plain.slice(0, 1800))}`}
                        className="focus-ring inline-flex rounded-full border border-[var(--border-subtle)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
                      >
                        Text the pub
                      </a>
                    </div>
                  ) : null}
                  {status.delivery === "manual" && status.plain ? (
                    <pre className="mt-4 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-[var(--bg-deep)] p-3 text-xs text-[var(--text-muted)]">
                      {status.plain}
                    </pre>
                  ) : null}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            <Link href="/" className="text-[var(--accent)] hover:underline">
              ← Back to home
            </Link>
          </p>
        </aside>
      </div>

      {/* Mobile cart bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--border-subtle)] bg-[var(--bg-deep)]/95 p-4 backdrop-blur-lg sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-[var(--text-muted)]">Cart</p>
            <p className="font-semibold text-[var(--text-primary)]">
              {itemCount} item{itemCount === 1 ? "" : "s"} · {formatMoney(subtotal)}
            </p>
          </div>
          <a
            href="#cart"
            className="focus-ring rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-deep)]"
          >
            Review & send
          </a>
        </div>
      </div>
    </div>
  );
}
