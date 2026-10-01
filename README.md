# Luloyiso Funeral Services — website

Marketing site for **Luloyiso Funeral Services**, a funeral business in Matatiele,
Eastern Cape. Mobile-first, bilingual (English / isiXhosa), and deployable to Vercel.

Built with Vite + React + TypeScript + Tailwind CSS and the shadcn/ui component set.

## What's on the site

- **Hero** with the business premises, contact shortcuts and a scripture line.
- **Services** — coffins, décor, tents, chairs, tombstones, video, P.A. system,
  transport, lowering device, programmes and more.
- **Burial scheme** — three age-banded plans with a Single / With-spouse premium toggle.
- **Tombstone catalogue** — search, filter by size, sort, switch between table and
  card views, a Head & Base / Full Set / Full Set + Slab price toggle, a shortlist
  drawer, print/download, and WhatsApp quote links per design.
- **Trust & membership** — SAFPA membership and the certificate image.
- **Contact** — address, both phone numbers, email, an embedded map, and an enquiry
  form that opens WhatsApp with the details pre-filled.
- **Sticky mobile action bar** with Call and WhatsApp, so both are always one tap away.

## Local development

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run lint
npm test         # vitest
```

## Editing content

Almost everything a non-developer needs to change lives in `src/data/`:

| File | What it holds |
| --- | --- |
| `src/data/contact.ts` | Address, phone numbers, emails, map coordinates, WhatsApp defaults |
| `src/data/scheme.ts` | Burial scheme plans, member benefits, terms and joining fee |
| `src/data/tombstones.ts` | The full tombstone price list and the slab add-on price |
| `src/data/translations.ts` | Every English / isiXhosa string used on the site |

The language toggle is driven entirely by `src/data/translations.ts`. To add or change
wording, edit the `en` and `xh` values for the relevant key — both languages are
required by the type, so the build fails if one is missing.

## Tombstone photos

The catalogue currently shows a "photo coming soon" placeholder for every design
because the real catalogue photos have not been supplied yet. To add a photo, drop a
file at `public/tombstones/{code}.jpg` (for example `public/tombstones/P1.jpg`) — no
code change is needed, the card picks it up automatically.

> **Privacy:** the printed catalogue photos show headstones bearing the names and dates
> of deceased people. Please get the family's consent (or use cropped / abstract detail
> shots) before publishing any real photo.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. In Vercel, **New Project → Import** the repository.
3. Vercel detects Vite automatically. Build command `npm run build`, output directory `dist`.
4. `vercel.json` already contains the SPA rewrite so client-side routes resolve on refresh.

No environment variables or backend services are required — the site is fully static.

## Before going live — please confirm with the client

These items were transcribed from photos and flyers and should be checked before launch:

- **Slab price** (`SLAB_PRICE` in `src/data/tombstones.ts`) — the source sheet shows a
  handwritten correction. Confirm whether it is R6 500 or R7 000.
- **Tombstone prices flagged in `src/data/tombstones.ts`** — a few rows were hard to read
  (P24 appears twice, and P44, P47, P48, P56, P57 look like partial numbers). Each is
  marked with a `TODO(client)` comment.
- **Burial scheme terms** — dependants, the 6-month waiting period, free collection for
  members, and the R50/month option are paraphrased from the flyer and shown with a
  "please confirm with us" note.
- **Domain name** — not yet chosen.
