/** Next N Thursday dates (local calendar) as `YYYY-MM-DD` for Washougal schedule display. */
export function upcomingThursdayIsos(count: number, from: Date = new Date()): string[] {
  const out: string[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 12, 0, 0);
  const thursday = 4;
  const add = (thursday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + add);
  for (let i = 0; i < count; i++) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    out.push(`${y}-${m}-${day}`);
    d.setDate(d.getDate() + 7);
  }
  return out;
}
