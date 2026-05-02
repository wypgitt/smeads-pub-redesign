import { site } from "@/data/site";
import {
  getTakeoutItem,
  takeoutItems,
  type TakeoutItemId,
} from "@/data/takeout-menu";

export function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export type CartLine = {
  id: TakeoutItemId;
  qty: number;
  /** Per-line choices (e.g. sauce, cook temp). Empty if none. */
  modifiers: Record<string, string>;
};

function modsKey(mods: Record<string, string>): string {
  const keys = Object.keys(mods).sort();
  if (keys.length === 0) return "";
  return JSON.stringify(
    Object.fromEntries(keys.map((k) => [k, mods[k] ?? ""])),
  );
}

export function cartLineKey(line: CartLine): string {
  return `${line.id}::${modsKey(line.modifiers)}`;
}

export function cartSubtotal(lines: CartLine[]) {
  let total = 0;
  for (const line of lines) {
    const item = getTakeoutItem(line.id);
    if (!item) continue;
    total += item.priceCents * line.qty;
  }
  return total;
}

export function buildOrderRef() {
  const d = new Date();
  const y = d.getFullYear().toString().slice(-2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SM-${y}${m}${day}-${rand}`;
}

function formatModifiersLine(mods: Record<string, string>): string {
  const entries = Object.entries(mods).filter(([, v]) => v.trim());
  if (entries.length === 0) return "";
  return entries.map(([k, v]) => `${k}: ${v}`).join("; ");
}

export function formatOrderPlainText(params: {
  orderRef: string;
  customerName: string;
  phone: string;
  pickupMode: "asap" | "schedule";
  pickupDetail: string;
  notes: string;
  lines: CartLine[];
}) {
  const { orderRef, customerName, phone, pickupMode, pickupDetail, notes, lines } =
    params;
  const rows: string[] = [
    `TAKEOUT ORDER ${orderRef}`,
    site.name,
    site.address.street,
    `${site.address.city}, ${site.address.state} ${site.address.zip}`,
    "",
    `Name: ${customerName}`,
    `Phone: ${phone}`,
    `Pickup: ${pickupMode === "asap" ? "ASAP" : "Scheduled"}${pickupDetail ? ` — ${pickupDetail}` : ""}`,
    "",
    "ITEMS",
  ];

  for (const line of lines) {
    const item = getTakeoutItem(line.id);
    if (!item) continue;
    const lineTotal = item.priceCents * line.qty;
    const modStr = formatModifiersLine(line.modifiers);
    rows.push(
      `${line.qty}× ${item.name} — ${formatMoney(lineTotal)} (${formatMoney(item.priceCents)} ea)`,
    );
    if (modStr) {
      rows.push(`   ${modStr}`);
    }
  }

  rows.push("", `Subtotal: ${formatMoney(cartSubtotal(lines))}`);
  rows.push("", "Tax may be added at pickup.");
  if (notes.trim()) {
    rows.push("", "Notes:", notes.trim());
  }
  rows.push(
    "",
    "Payment: pay at pickup unless staff arranged otherwise.",
    `Questions? ${site.phone}`,
  );

  return rows.join("\n");
}

export type RawCartRow = { id: string; qty: number; modifiers?: Record<string, string> };

export function resolveCartLines(items: RawCartRow[]): CartLine[] | null {
  const merged = new Map<string, CartLine>();

  for (const row of items) {
    const item = takeoutItems.find((i) => i.id === row.id);
    if (!item) return null;
    if (row.qty < 1 || row.qty > 25) return null;

    const modifiers: Record<string, string> = {};
    if (row.modifiers && typeof row.modifiers === "object") {
      for (const [k, v] of Object.entries(row.modifiers)) {
        if (typeof v !== "string" || v.length > 80) return null;
        modifiers[k] = v.slice(0, 80);
      }
    }

    const modGroups =
      "modifiers" in item && item.modifiers && item.modifiers.length > 0
        ? item.modifiers
        : null;
    if (modGroups) {
      for (const g of modGroups) {
        const picked = modifiers[g.id]?.trim();
        if (!picked || !(g.options as readonly string[]).includes(picked)) {
          return null;
        }
      }
    } else if (Object.keys(modifiers).length > 0) {
      return null;
    }

    const line: CartLine = { id: item.id, qty: row.qty, modifiers };
    const key = cartLineKey(line);
    const prev = merged.get(key);
    if (prev) {
      prev.qty += line.qty;
      if (prev.qty > 25) return null;
    } else {
      merged.set(key, { ...line });
    }
  }

  const out = Array.from(merged.values());
  if (out.length === 0) return null;
  return out;
}
