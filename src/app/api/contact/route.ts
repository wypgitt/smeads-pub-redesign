import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { site } from "@/data/site";

const bodySchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(32).optional().default(""),
    message: z.string().trim().min(10).max(4000),
    /** Honeypot — leave empty (bots often fill hidden fields). */
    website: z.string().optional().default(""),
  })
  .refine((d) => !d.website?.trim(), {
    message: "Invalid submission",
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
      { error: "Please check your name, email, and message." },
      { status: 400 },
    );
  }

  const { name, email, phone, message } = parsed.data;

  const notifyTo =
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ||
    process.env.TAKEOUT_NOTIFY_EMAIL?.trim();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();

  const plain = [
    `Contact form — ${site.name}`,
    "",
    `From: ${name}`,
    `Reply-to: ${email}`,
    phone ? `Phone: ${phone}` : "",
    "",
    "Message:",
    message,
    "",
    `Sent via ${site.name} website`,
  ]
    .filter(Boolean)
    .join("\n");

  if (notifyTo && resendKey) {
    if (!from) {
      return NextResponse.json(
        { error: "Email sender is not configured. Please call or email us directly." },
        { status: 500 },
      );
    }

    try {
      const resend = new Resend(resendKey);
      const { error } = await resend.emails.send({
        from,
        to: notifyTo,
        replyTo: email,
        subject: `[Contact] ${name}`,
        text: plain,
      });

      if (error) {
        console.error("[contact] Resend error", error);
        return NextResponse.json(
          { error: "Could not send right now. Please call or email us directly." },
          { status: 502 },
        );
      }

      return NextResponse.json({
        ok: true,
        delivery: "email" as const,
        message:
          "Thanks — your message is on its way. We’ll get back to you soon.",
      });
    } catch (e) {
      console.error("[contact]", e);
      return NextResponse.json(
        { error: "Could not send right now. Please call or email us directly." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    ok: true,
    delivery: "manual" as const,
    message:
      "Email isn’t configured on the server yet — please copy your message or use the email link below.",
    plain,
  });
}
