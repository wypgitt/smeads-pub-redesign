import { menuCategories } from "@/data/full-menu";
import { otherHappenings, triviaFlyer, eventsPageIntro } from "@/data/events";
import { site } from "@/data/site";
import { takeoutItems } from "@/data/takeout-menu";

function flattenMenuForContext(): string {
  const parts: string[] = [];
  for (const cat of menuCategories) {
    const names: string[] = [];
    if (cat.items) {
      for (const d of cat.items) {
        names.push(`${d.name} (${d.price})`);
      }
    }
    if (cat.subsections) {
      for (const sub of cat.subsections) {
        for (const d of sub.items) {
          names.push(`${d.name} (${d.price})`);
        }
      }
    }
    if (names.length) {
      parts.push(`${cat.title}: ${names.join("; ")}`);
    } else {
      parts.push(`${cat.title}: (see full menu on website)`);
    }
  }
  return parts.join("\n");
}

function takeoutSummary(): string {
  return takeoutItems
    .map((i) => `${i.name} ~$${(i.priceCents / 100).toFixed(2)}`)
    .join("; ");
}

/**
 * Factual text for Smeads Pub AI (RAG-style context). Kept under ~10k chars for API limits.
 */
export function buildPubKnowledgeText(): string {
  const hours = site.hours
    .map((h) => `${h.label}: ${h.lines.join(" · ")}`)
    .join("\n");

  const menu = flattenMenuForContext();
  const maxMenu = 4500;
  const menuClip =
    menu.length > maxMenu ? `${menu.slice(0, maxMenu)}…[menu truncated]` : menu;

  const parts = [
    `PUB: ${site.name} — ${site.tagline}`,
    `ADDRESS: ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
    `PHONE: ${site.phone}`,
    `EMAIL: ${site.email}`,
    `FACEBOOK: ${site.facebookUrl}`,
    "",
    "HOURS:",
    hours,
    site.hoursDisclaimer,
    "",
    "TRIVIA & EVENTS:",
    site.trivia.title,
    site.trivia.schedule,
    site.trivia.description,
    triviaFlyer.foodSpecial.title,
    eventsPageIntro[0],
    "Other happenings: " + otherHappenings.join(" "),
    "",
    "KARAOKE:",
    site.karaoke.title,
    site.karaoke.body.join(" "),
    "",
    "TAKEOUT (online pickup menu on /order; prices may differ from dining room):",
    takeoutSummary(),
    "",
    "FULL MENU (dining; prices and availability can change):",
    menuClip,
  ];

  return parts.join("\n");
}

export function buildAssistantSystemPrompt(): string {
  const knowledge = buildPubKnowledgeText();
  return `You are Smeads Pub AI — a friendly, concise virtual host for ${site.name} in Washougal, Washington — an "upper end dive bar" on the Columbia River since 1931.

You ONLY answer using the KNOWLEDGE block below. Do not invent prices, hours, or specials. If something is not in KNOWLEDGE (e.g. private parties, exact tap list tonight, employment), say you're not sure and give phone ${site.phone} or email ${site.email}, or suggest visiting /contact or /menu on the website.

Tone: warm, local, a little witty — like a regular at the bar — but never misleading.

When mentioning prices, note they may change and to confirm with staff.

KNOWLEDGE:
${knowledge}`;
}
