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

export type CartLine = { id: TakeoutItemId; qty: number };

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
    rows.push(
      `${line.qty}× ${item.name} — ${formatMoney(lineTotal)} (${formatMoney(item.priceCents)} ea)`,
    );
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

export function resolveCartLines(
  items: { id: string; qty: number }[],
): CartLine[] | null {
  const merged = new Map<TakeoutItemId, number>();
  for (const row of items) {
    const item = takeoutItems.find((i) => i.id === row.id);
    if (!item) return null;
    if (row.qty < 1 || row.qty > 25) return null;
    merged.set(item.id, (merged.get(item.id) ?? 0) + row.qty);
  }
  return Array.from(merged.entries()).map(([id, qty]) => ({ id, qty }));
}
