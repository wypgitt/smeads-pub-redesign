# Smeads Pub Redesign

Design-first Next.js app for Smeads Pub: homepage, menu, events, contact, a floating Ask Smeads AI drawer, and a takeout pickup flow.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npm run build
```

This project uses the App Router on Next.js 16. The local agent rules require checking `node_modules/next/dist/docs/` before changing Next APIs or conventions.

## Site Content

Most public copy lives in:

- `src/data/site.ts` for hours, contact info, homepage copy, specials, and gallery images
- `src/data/full-menu.ts` for the full menu page
- `src/data/takeout-menu.ts` for online pickup items, prices, and modifiers
- `src/data/events.ts` for trivia and event content

Local images are served from `public/images/` and referenced by root-relative paths such as `/images/smeads/interior.jpg`.

## Takeout

The `/order` page builds a pickup order, supports search, popular items, item modifiers, pickup presets, notes, and a manual copy/text fallback.

Email delivery is optional. Configure these environment variables to send takeout emails:

```bash
RESEND_API_KEY=...
RESEND_FROM="Smeads Pub <orders@smeadspub.com>"
TAKEOUT_NOTIFY_EMAIL=...
```

Without email configuration, the app still returns a formatted order summary for manual text/call handling.

## Contact

The contact form uses the same `RESEND_API_KEY` and `RESEND_FROM`. It sends to `CONTACT_NOTIFY_EMAIL`, falling back to `TAKEOUT_NOTIFY_EMAIL` if needed.

```bash
CONTACT_NOTIFY_EMAIL=...
```

Without email configuration, the form returns copyable message text and a mailto fallback.

## Ask Smeads AI

The floating Ask AI drawer calls `/api/pub-assistant`. It answers from local site knowledge first and can use OpenAI for better wording when configured:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=...
```

If no OpenAI key is present, the route falls back to local rule-based answers.

## Design Notes

The current design goal is a real customer-facing pub app, not a generic restaurant brochure:

- task-first navigation: Order, Menu, Events, Visit, Ask
- local Smeads imagery instead of stock placeholders
- mobile-friendly takeout ordering with a persistent cart review bar
- global AI help without burying the assistant on the contact page
