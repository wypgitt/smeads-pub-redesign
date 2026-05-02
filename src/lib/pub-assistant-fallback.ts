import { site } from "@/data/site";

/** Cheap deterministic replies when OpenAI is not configured or fails. */
export function ruleBasedPubAnswer(question: string): string | null {
  const q = question.toLowerCase();

  if (
    /\b(hour|open|close|closing|when.*you|schedule)\b/.test(q) ||
    q.includes("how late")
  ) {
    const lines = site.hours
      .map((h) => `• ${h.label}: ${h.lines.join(" · ")}`)
      .join("\n");
    return `Here’s what we publish for hours — holiday changes happen, so call ${site.phone} to double-check:\n${lines}\n\n${site.hoursDisclaimer}`;
  }

  if (
    /\b(phone|call|text|reach)\b/.test(q) ||
    /\(\s*360\s*\)/.test(q)
  ) {
    return `You can reach us at ${site.phone}. Tap-to-call works great from your phone.`;
  }

  if (/\b(where|address|location|direction|map|evergreen|washougal)\b/.test(q)) {
    return `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}. Google Maps is linked on our Contact page.`;
  }

  if (/\b(email|inbox|mailto|info@)\b/.test(q)) {
    return `General email: ${site.email}. Or use the contact form on this page.`;
  }

  if (/\b(trivia|thursday|quiz|smart)\b/.test(q)) {
    return `${site.trivia.title} — ${site.trivia.schedule}. ${site.trivia.description} Details and dates are also on /events.`;
  }

  if (/\b(karaoke|sing)\b/.test(q)) {
    return `${site.karaoke.title}: ${site.karaoke.body[0]} More on the home page under Karaoke.`;
  }

  if (/\b(menu|food|burger|eat|dinner|breakfast|taco|wing)\b/.test(q)) {
    return `We’ve got a full pub menu (apps, burgers, sandwiches, breakfast weekends, and more). Browse /menu on this site — for tonight’s board or mods, ask your bartender or call ${site.phone}.`;
  }

  if (/\b(order|takeout|pickup|to\s*go)\b/.test(q)) {
    return `Takeout ordering is on /order. There’s a small per-item to-go fee on the printed menu — staff can confirm totals when you order.`;
  }

  if (/\b(parking|wheelchair|dog)\b/.test(q)) {
    return null;
  }

  return null;
}

export function defaultAssistantFallback(): string {
  return `I can help with hours, location, trivia, takeout, and general pub stuff from what’s on this site. For tap lines tonight, private parties, or hiring, call ${site.phone} or email ${site.email}.`;
}
