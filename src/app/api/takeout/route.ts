import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import {
  buildOrderRef,
  cartSubtotal,
  formatMoney,
  formatOrderPlainText,
  resolveCartLines,
} from "@/lib/takeout-format";

const bodySchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(10).max(32),
  pickupMode: z.enum(["asap", "schedule"]),
  pickupDetail: z.string().trim().max(240).optional().default(""),
  notes: z.string().trim().max(800).optional().default(""),
  items: z
    .array(
      z.object({
        id: z.string(),
        qty: z.number().int().positive(),
        modifiers: z.record(z.string(), z.string()).optional(),
      }),
    )
    .min(1)
    .max(40),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { customerName, phone, pickupMode, pickupDetail, notes, items } =
    parsed.data;

  if (pickupMode === "schedule" && !pickupDetail.trim()) {
    return NextResponse.json(
      { error: "Pick a time or describe when you’d like pickup." },
      { status: 400 },
    );
  }

  const lines = resolveCartLines(
    items.map((row) => ({
      id: row.id,
      qty: row.qty,
      modifiers: row.modifiers,
    })),
  );
  if (!lines) {
    return NextResponse.json({ error: "Unknown menu item or bad quantity." }, { status: 400 });
  }

  const orderRef = buildOrderRef();
  const subtotal = cartSubtotal(lines);
  const plain = formatOrderPlainText({
    orderRef,
    customerName,
    phone,
    pickupMode,
    pickupDetail,
    notes,
    lines,
  });

  const notifyTo = process.env.TAKEOUT_NOTIFY_EMAIL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();

  let delivery: "email" | "manual" = "manual";

  if (notifyTo && resendKey) {
    if (!from) {
      return NextResponse.json(
        { error: "Email sender is not configured. Call the pub or try again." },
        { status: 500 },
      );
    }

    try {
      const resend = new Resend(resendKey);

      const { error } = await resend.emails.send({
        from,
        to: notifyTo,
        subject: `[Takeout ${orderRef}] ${customerName} · ${formatMoney(subtotal)}`,
        text: plain,
      });

      if (error) {
        console.error("[takeout] Resend error", error);
        return NextResponse.json(
          { error: "Could not send order. Call the pub or try again." },
          { status: 502 },
        );
      }
      delivery = "email";
    } catch (e) {
      console.error("[takeout]", e);
      return NextResponse.json(
        { error: "Could not send order. Call the pub or try again." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    orderRef,
    delivery,
    subtotalCents: subtotal,
    plain,
    message:
      delivery === "email"
        ? `We received your order (${orderRef}). We’ll confirm by phone if needed.`
        : `Your order reference is ${orderRef}. Copy the summary below and text or call us to fire the kitchen — email alerts are not configured yet.`,
  });
}
