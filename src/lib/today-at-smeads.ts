import { site } from "@/data/site";
import { upcomingThursdayIsos } from "@/lib/upcoming-thursdays";

const WEEKDAY_LONG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** 0 = Sunday … 6 = Saturday (America/Los_Angeles). */
export function getPacificWeekdayIndex(): number {
  const name = getPacificNow().weekday;
  const idx = WEEKDAY_LONG.indexOf(name as (typeof WEEKDAY_LONG)[number]);
  return idx >= 0 ? idx : new Date().getDay();
}

function getPacificNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

const SPECIAL_IDS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export function getTodaysSpecialBlurb(): string {
  const d = getPacificWeekdayIndex();
  const id = SPECIAL_IDS[d] ?? "tuesday";
  const match = site.specials.find((s) => s.id === id);
  if (match) {
    return `${match.title}: ${match.description.slice(0, 160)}${match.description.length > 160 ? "…" : ""}`;
  }
  const fallback = site.specials[0];
  return fallback
    ? `The board changes — ${fallback.title} is a good bet. Ask the bar what’s hot today.`
    : "Daily specials on food and drink — ask your server.";
}

export function getTodaysHoursLine(): string {
  const d = getPacificWeekdayIndex();
  if (d === 0) {
    const h = site.hours.find((x) => x.label === "Sunday");
    return `Sunday: ${h?.lines.join(" · ") ?? "see site"}`;
  }
  if (d === 1) {
    const h = site.hours.find((x) => x.label === "Monday");
    return `Monday: ${h?.lines.join(" · ") ?? "see site"}`;
  }
  if (d >= 2 && d <= 4) {
    const h = site.hours.find((x) => x.label === "Tue – Thu");
    return `Tue–Thu: ${h?.lines.join(" · ") ?? "see site"}`;
  }
  if (d === 5) {
    const h = site.hours.find((x) => x.label === "Friday");
    return `Friday: ${h?.lines.join(" · ") ?? "see site"}`;
  }
  const h = site.hours.find((x) => x.label === "Saturday");
  return `Saturday: ${h?.lines.join(" · ") ?? "see site"}`;
}

export function getOpenNowHint(): string {
  const { weekday, minutes } = getPacificNow();
  const day = WEEKDAY_LONG.indexOf(weekday as (typeof WEEKDAY_LONG)[number]);
  const today = scheduleForDay(day);
  const previous = scheduleForDay((day + 6) % 7);

  if (previous.close > 24 * 60 && minutes < previous.close - 24 * 60) {
    return `Open now by posted bar hours — until ${formatClock(previous.close - 24 * 60)}. Call for kitchen timing near close.`;
  }

  if (minutes >= today.open && minutes < Math.min(today.close, 24 * 60)) {
    const close = today.close > 24 * 60 ? today.close - 24 * 60 : today.close;
    return `Open now by posted bar hours — until ${formatClock(close)}. Call for kitchen timing near close.`;
  }

  if (minutes < today.open) {
    return `Closed right now by posted hours — opens today at ${formatClock(today.open)}.`;
  }

  const next = scheduleForDay((day + 1) % 7);
  return `Closed right now by posted hours — opens next at ${formatClock(next.open)}.`;
}

export function getNextTriviaDisplay(): string {
  const iso = upcomingThursdayIsos(1)[0];
  if (!iso) return site.trivia.schedule;
  const date = new Date(`${iso}T12:00:00`);
  return `${site.trivia.title} · ${date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  })} · 7–9 pm`;
}

const DAILY_SCHEDULE = [
  { open: 9 * 60, close: 22 * 60 },
  { open: 16 * 60, close: 22 * 60 },
  { open: 15 * 60, close: 23 * 60 },
  { open: 15 * 60, close: 23 * 60 },
  { open: 15 * 60, close: 23 * 60 },
  { open: 15 * 60, close: 25 * 60 },
  { open: 9 * 60, close: 25 * 60 },
] as const;

function scheduleForDay(day: number) {
  return DAILY_SCHEDULE[day] ?? DAILY_SCHEDULE[0];
}

function formatClock(minutes: number): string {
  const safeMinutes = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hour24 = Math.floor(safeMinutes / 60);
  const minute = safeMinutes % 60;
  const suffix = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 || 12;
  return minute === 0
    ? `${hour12} ${suffix}`
    : `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}
