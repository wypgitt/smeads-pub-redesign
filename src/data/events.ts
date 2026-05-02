/**
 * Events landing copy — pairs with /events and the home “What’s happening” block.
 * Trivia schedule should match what you run in the room.
 */

export const eventsPageIntro = [
  "What’s happening at Smeads Pub? What’s coming up next? Glad you asked.",
  "Taco Tuesday, live music, charity nights, holidays, birthdays, and more — follow us on Facebook for pop‑ups. Below is our steady weekly anchor: Thursday trivia.",
];

export const otherHappenings = [
  "Weekly specials (tacos, wings, sliders, fish, brunch)",
  "Karaoke weekends · themed nights · beer garden",
  "Seasonal parties — Oktoberfest, St. Patrick’s, and whatever we dream up",
];

export const triviaFlyer = {
  /** Served from /public — replace file anytime without code changes. */
  imageSrc: "/images/events/trivia-night-flyer.png",
  /** Real text for SEO & screen readers (matches flyer). */
  imageAlt:
    "Smeads Pub Trivia Night: every Thursday from 7 to 9 pm. Try the Bacon and Brains special. 3395 Evergreen Way, Washougal, WA 98671.",
  headline: "Trivia Night",
  tagline: "Every Thursday · 7–9 pm",
  foodSpecial: {
    title: "Try our Bacon and Brains special",
    href: "/order" as const,
  },
  longDescription:
    "You think you’re so smart? Come on down and prove it. Teams welcome — great food and drink specials, laughs, and bragging rights on the line.",
};
