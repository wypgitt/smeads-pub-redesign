/** All public copy — single source of truth (from smeadspub.com). */

export const site = {
  name: "Smeads Pub",
  /** Circular pub mark (PNG) — `public/images/brand/smeads-mark.png` */
  brandMarkSrc: "/images/brand/smeads-mark.png",
  tagline: "Washougal’s Ultimate Upper End Dive Bar",
  phone: "(360) 835-7370",
  phoneTel: "+13608357370",
  /** General inbox — publish mailto links with this. */
  email: "info@smeadspub.com",
  address: {
    street: "3395 Evergreen Way",
    city: "Washougal",
    state: "WA",
    zip: "98671",
  },
  mapQuery: "3395+Evergreen+Way+Washougal+WA+98671",
  /** In-app full menu (see /menu). Legacy WordPress menu URL if needed for redirects. */
  menuUrl: "/menu",
  facebookUrl: "https://www.facebook.com/smeadspub",
  hours: [
    { label: "Monday", lines: ["4 pm – 10 pm"] },
    { label: "Tue – Thu", lines: ["3 pm – 11 pm"] },
    { label: "Friday", lines: ["3 pm – 1 am"] },
    {
      label: "Saturday",
      lines: [
        "9 am – 1 am",
        "Family breakfast 9 am – 12:30 pm",
        "Kids welcome until 2 pm",
      ],
    },
    {
      label: "Sunday",
      lines: [
        "9 am – 10 pm",
        "Family breakfast 9 am – 12:30 pm",
        "Kids welcome until 2 pm",
      ],
    },
  ],
  contactIntro: [
    "Got a question? Perhaps a tap request? We’re happy to help — and maybe even oblige.",
    "Call us, use the email link, or the form on this page. Or just come on by.",
  ],
  /** Shown near hours on /contact and visit section. */
  hoursDisclaimer:
    "Hours can change for holidays or special events — call ahead if you’re unsure.",
  hero: {
    headline: "Same door since 1931. Cold beer, loud laughs, zero attitude.",
    sub: "Washougal’s neighborhood joint — twenty taps, a beer garden, karaoke weekends, and Thursday trivia with the crew. Come as you are.",
  },
  about: {
    lede: "Behind the bar and in front of it, Smeads Pub willingly stands toe-to-toe with any establishment up and down the Mighty Columbia River.",
    body: [
      "Why? Simple. Smeads is the local go-to neighborhood bar. We offer not only a full-service bar, but also twenty taps of popular beers. Combined with daily happy hour specials, karaoke, live bands, a stylish outdoor beer garden, and awesomely fun themed festivity nights, Smeads Pub really does have something for everyone.",
      "Live music, Taco Tuesdays, Wings Wednesdays, Thankful Thursdays, karaoke nights, Oktoberfest, St. Paddy's Day events, and a fantastic beer garden — we pride ourselves on providing our patrons with great food and service while creating a warm and inviting atmosphere that is sure to please.",
      "Opened in 1931 in this very location by Tom and Clara Smead, Smeads Pub is not only the finest Upper End Dive Bar Experience in Washougal, but anywhere along the Columbia Gorge.",
      "Don't believe us? Come on in and find out for yourself.",
    ],
  },
  highlights: [
    { title: "Washougal regulars", detail: "Not a chain — a room full of neighbors" },
    { title: "Taps & tunes", detail: "Beer garden, karaoke, the occasional bad decision" },
    { title: "Thursday brains", detail: "Trivia — prove you’re clever (or lucky)" },
    { title: "Takeout", detail: "Order online — we’ll yell when it’s ready" },
  ],
  specialsIntro:
    "In addition to our awesome regular menu, we have a rotating cast of specials — plus themed nights all week.",
  specials: [
    {
      id: "tuesday",
      shortLabel: "Tue",
      pill: "Tacos",
      title: "Tightwad Taco Tuesdays",
      description:
        "Crunchy tacos 3 for $5. Chicken or skirt steak street tacos $3/ea. Queso nachos $7. Queso & chips $4. Guacamole & chips $5. Original margaritas $6; fresh fruit margaritas or press $7.50. See the pattern, cheapskate? Every Tuesday, all day.",
    },
    {
      id: "wednesday",
      shortLabel: "Wed",
      pill: "Wings",
      title: "Wine & Wing Wednesdays",
      description:
        "Six wings for $8, wine for $5 a glass. Every Wednesday, all day.",
    },
    {
      id: "thursday",
      shortLabel: "Thu",
      pill: "Sliders",
      title: "Slide into Thursdays",
      description:
        "Slider specials — 2 for $7. Flavors: buffalo chicken, meatloaf, halibut, BBQ beef cheddar, and ham and swiss. Tall boys $2.50. Every Thursday, all day.",
    },
    {
      id: "friday",
      shortLabel: "Fri",
      pill: "Fish",
      title: "Fish Fridays",
      description:
        "Halibut fish tacos: 2 for $16. Fish & chips basket: $18. Add a cup of homemade clam chowder for $2, or chowder by itself: $4 cup / $4.50 bowl. Every Friday, all day.",
    },
    {
      id: "saturday",
      shortLabel: "Sat",
      pill: "Breakfast",
      title: "Breakfast Saturdays",
      description:
        "Family-friendly breakfast 9 am – 12:30 pm. Better than making it yourself — no cleanup, and kids are welcome from 9 am until 2 pm.",
    },
    {
      id: "sunday",
      shortLabel: "Sun",
      pill: "Brunch Sun",
      title: "Breakfast Sundays",
      description:
        "Same breakfast window 9 am – 12:30 pm. Open until 10 pm Sunday; kids welcome until 2 pm. Special events TBA — check Facebook or stop back here.",
    },
  ],
  trivia: {
    title: "Smeads Pub Trivia Night",
    schedule: "Thursdays · 7:00 pm – 9:00 pm",
    description:
      "Think you’re smart? Come prove it. Great food and drink specials, teams welcome, good-natured chaos guaranteed.",
  },
  karaoke: {
    title: "Award‑winning karaoke",
    body: [
      "Pretty much every Friday and Saturday, Smeads hosts karaoke for the adventurous (and not‑so‑adventurous) souls who love to belt out a tune or two.",
      "It’s not just a sing‑along machine in the corner — we run a live DJ, multiple video screens, and a serious sound system.",
      "Voted a finalist for Best Karaoke in Clark County by The Columbian and their readers. Award‑winning karaoke: we’re going to get mileage out of that phrase.",
    ],
  },
  menuHighlights: [
    "Burgers & pub classics",
    "Appetizers built for the bar",
    "Seasonal fish & comfort plates",
    "Full cocktail list + locals on tap",
  ],
  /** Photos sourced from smeadspub.com gallery/media and stored locally. */
  gallery: [
    {
      src: "/images/smeads/interior.jpg",
      alt: "Smeads Pub — inside the bar",
      caption: "Inside the bar",
    },
    {
      src: "/images/smeads/taps.jpg",
      alt: "Smeads Pub — bar and taps",
      caption: "The bar & taps",
    },
    {
      src: "/images/smeads/food.jpg",
      alt: "Pub food at Smeads",
      caption: "From the kitchen",
    },
    {
      src: "/images/smeads/garden.jpg",
      alt: "Smeads Pub — outdoor patio and guests",
      caption: "Patio & crowd",
    },
    {
      src: "/images/smeads/karaoke.jpg",
      alt: "Karaoke at Smeads Pub",
      caption: "Karaoke nights",
    },
    {
      src: "/images/events/trivia-night-flyer.jpg",
      alt: "Smeads Pub Trivia Night flyer — Thursdays 7–9 pm",
      caption: "Thursday trivia",
    },
  ],
} as const;
