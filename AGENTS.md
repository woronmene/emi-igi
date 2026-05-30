# AGENTS.md — ÈMÍ-ÌGI

Guide for AI agents (and developers) continuing work on this codebase.

## What this project is

Marketing site for **ÈMÍ-ÌGI**, an artisanal design studio selling handcrafted sculptures and art-market pieces. The homepage lists products from **Contentful CMS**, grouped into two sections. Primary conversion is **WhatsApp** (“Become a Collector”). Secondary: newsletter signup (Google Sheet), Instagram, email.

Brand name uses special characters: **ÈMÍ-ÌGI** (not “Emi-igi” in user-facing copy unless matching an existing URL).

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, JavaScript (no TypeScript) |
| Styling | Tailwind CSS v4 via `@import "tailwindcss"` in `app/globals.css` |
| Animation | Framer Motion (`"use client"` components) |
| CMS | Contentful Delivery API (`contentful` npm package) |
| Fonts | Inknut Antiqua via `next/font/google` |
| Deploy target | Vercel (typical; not configured in-repo) |

Path alias: `@/*` → project root (`jsconfig.json`).

---

## Commands

```bash
npm install          # install deps
npm run dev          # dev server → http://localhost:3000
npm run build        # production build (needs env vars for Contentful)
npm run start        # serve production build
npm run lint         # ESLint (eslint-config-next)
```

Contentful smoke test (requires `.env.local`):

```bash
node test-contentful.js
```

Debug Contentful field shapes in browser: `GET /api/debug-contentful` (remove or protect before production).

---

## Environment variables

Copy `.env.local.example` → `.env.local` (never commit).

| Variable | Required | Purpose |
|----------|----------|---------|
| `CONTENTFUL_SPACE_ID` | Yes (for products) | Contentful space |
| `CONTENTFUL_ACCESS_TOKEN` | Yes | Content delivery token |
| `NEWSLETTER_GOOGLE_SCRIPT_URL` | Optional | Google Apps Script web app URL for footer newsletter |
| `NEXT_PUBLIC_SITE_URL` | Optional | Absolute URL base for OG metadata (defaults to `http://localhost:3000`) |

Setup docs: `docs/CONTENTFUL_SETUP.md`, `docs/NEWSLETTER_GOOGLE_SHEET.md`.

If Contentful creds are missing, `getProducts()` returns empty arrays (homepage renders without products, no crash).

---

## Repository layout

```
app/
  layout.js              # Root layout, metadata, Inknut Antiqua font
  page.js                # Homepage (products from Contentful)
  globals.css              # Design tokens + Tailwind theme
  about/page.js            # Static About page
  vision/page.js           # Static Vision page
  pieces/[slug]/page.js    # Product detail (sculptures only linked from home)
  components/              # React components (many are client components)
  api/
    newsletter/route.js    # POST → Google Sheet
    debug-contentful/route.js
lib/
  contentful.js            # CMS client, field mapping, getProducts / getProductBySlug
docs/                      # Client-facing setup guides
public/
  emi-igi-vid.mp4          # Hero background video
  images/                  # Logo, favicons, hero OG image
```

---

## Routes

| Path | Type | Notes |
|------|------|-------|
| `/` | Server | Hero + sculpted art sections + Art Market section + Footer |
| `/vision` | Server | Static copy |
| `/about` | Server | Static copy |
| `/pieces/[slug]` | Server (ISR) | Detail page; no Navbar; Back link to home |
| `/privacy`, `/terms` | **Missing** | Linked from Footer but pages do not exist yet |
| `/api/newsletter` | API | POST `{ email }` |
| `/api/debug-contentful` | API | Dev/debug only |

---

## Data flow (Contentful)

**Content type:** `product` (lowercase API id).

**Categories** (field `category`, lowercase):
- `sculpture` → homepage top section (“solid/sculpted art”); gets “See description” link to `/pieces/[slug]`
- `drawing` → “Art Market” section below a titled divider
- anything else → treated as sculpture

**Field mapping** lives in `lib/contentful.js` → `mapEntryToProduct()`. The mapper is defensive: accepts multiple casings (`title`/`Title`, `productImage`/`image`, etc.) and resolves linked assets from `includes`.

**Product shape** returned to components:

```js
{
  id, slug, title, description, imageSrc, imageAlt,
  detailIntro, delivery, authenticity, dimensions, gallery
}
```

**Fetching:**
- `getProducts()` → `{ sculptedArt, artMarket }`
- `getProductBySlug(slugOrId)` → single product or `null`

**Caching:** Home and detail pages use `export const revalidate = 10` (ISR, 10s). Detail page also has `generateStaticParams()` from all products.

**Images:** Remote host `images.ctfassets.net` allowed in `next.config.mjs`. Use `next/image` with `fill` + `object-contain` for product shots.

**Contentful fields for detail page** (optional in CMS; add to Product content type as needed):
- `slug`, `detailIntro`, `dimensions`, `delivery`, `authenticity`, `galleryImages`

See `docs/CONTENTFUL_SETUP.md` for minimum fields; extend the content type for detail-page fields.

---

## Component conventions

### Server vs client

- **Server components (default):** pages, data fetching
- **Client components (`"use client"`):** anything using Framer Motion, `useState`, scroll listeners — `Hero`, `Navbar`, `ProductSection`, `Footer`, `AnimatedPageContent`, `AnimatedSectionTitle`, `ProductGallery`

### Design tokens (`app/globals.css`)

Use CSS variables, not hardcoded colors when possible:

- `--background: #E1D7C6` (warm beige page bg)
- `--surface-cream: #e8e0d7` (product section bg)
- `--text-dark`, `--text-light`, `--accent-brown`, `--accent-brown-light`
- `--navbar-height: 4rem`

### UI patterns (follow these)

- **Buttons:** `rounded-none` (square corners) — recent design pass removed border radius site-wide
- **Primary CTA:** brown `#A08B6D`, white text, links to WhatsApp `+2349153081531`
- **Secondary CTA:** white bg, black text (“See description” on sculptures)
- **Typography:** Inknut Antiqua everywhere; product body text often `#524F4F` or `#494545` at ~14–16px
- **Motion:** shared easing `[0.25, 0.1, 0.25, 1]`, scroll-triggered `whileInView` with `viewport={{ once: true }}`
- **Navbar:** sticky, transparent over home hero until ~80% viewport scrolled; light text on hero, dark text after
- **Navbar logo:** currently commented out in `Navbar.js` (lines ~66–79)

### Key components

| Component | Role |
|-----------|------|
| `Hero` | Full-viewport video hero, “Become a Collector” WhatsApp CTA |
| `ProductSection` | Reusable product row (image left, copy + CTAs right). Props: `isSculpture`, `slug`, `renderWrapper`, `underlineTitle` |
| `Footer` | Newsletter form, contact, Instagram, legal links |
| `ProductGallery` | Auto-rotating mobile slider + desktop grid — **built but not used** on detail page after recent redesign (single image only) |

---

## External integrations

| Integration | Where | Notes |
|-------------|-------|-------|
| WhatsApp | Hero, ProductSection | Pre-filled commission inquiry messages |
| Instagram | Footer | `@emi_igi` |
| Email | Footer | `Info@emi-igi.co.site` |
| Google Sheets | `/api/newsletter` | Server-side proxy to Apps Script; URL never exposed to client |

---

## Known gaps & tech debt

1. **`/privacy` and `/terms`** — linked in Footer, pages not implemented
2. **`ProductGallery`** — orphaned after detail page switched to single centered image; gallery data still mapped in Contentful
3. **`underlineTitle` prop** on `ProductSection` — passed from home for Art Market but underline class was removed in WIP; prop is currently a no-op
4. **`/api/debug-contentful`** — should be removed or gated in production
5. **Navbar logo** — commented out; may need restoration
6. **`.env.local.example`** — documents `image` field; CMS doc says `productImage`; mapper accepts both
7. **Large video assets** in `public/` (~57MB total); consider CDN or compression for perf

---

## Current work in progress (uncommitted)

As of last agent session, unstaged changes on `main`:

- **Design consistency:** `rounded-none` on Hero, Footer, ProductSection buttons
- **Background token:** `--background` changed to `#E1D7C6`
- **ProductSection:** tighter spacing; button order swapped (Collector first, then See description); Collector text white
- **ISR:** replaced `force-dynamic` with `revalidate = 10` on home and detail pages
- **Detail page:** removed Navbar and ProductGallery; single centered image; added DIMENSIONS section from Contentful `dimensions` field
- **contentful.js:** added `dimensions` field mapping

Verify with `git diff` before assuming committed state.

---

## Agent guidelines

### Do

- Match existing patterns: JS (not TS), App Router, Tailwind + CSS variables, Framer Motion for animation
- Keep Contentful field mapping tolerant of naming variants in `lib/contentful.js`
- Use `next/image` for all remote/product images
- Preserve WhatsApp as primary CTA unless explicitly asked to change
- Run `npm run build` after substantive changes (catches missing env, image domain issues)
- Read `docs/` before changing CMS or newsletter behavior

### Don’t

- Commit `.env`, `.env.local`, or secrets
- Add TypeScript or new major dependencies without explicit request
- Switch back to `force-dynamic` without discussing ISR tradeoffs
- Remove defensive Contentful field aliases without confirming CMS schema
- Create git commits or PRs unless the user asks

### When adding Contentful fields

1. Document in `docs/CONTENTFUL_SETUP.md` if client-facing
2. Map in `mapEntryToProduct()` with lowercase + PascalCase fallbacks
3. Use `toPlainText()` for rich text fields
4. Use `getImageUrl()` for media fields

### When adding pages

Follow existing page shell: `Navbar` + `main` + `Footer` (except detail page, which intentionally omits Navbar). Use `AnimatedPageContent` for simple text pages like About/Vision.

---

## Quick mental model

```
Contentful (product entries)
       ↓
lib/contentful.js (map + categorize)
       ↓
app/page.js → ProductSection × N
       ↓ (sculpture + slug)
app/pieces/[slug]/page.js (detail)
```

Static marketing pages (About, Vision) are hardcoded. Products are CMS-driven. Newsletter and WhatsApp are the only interactive flows.

---

## Contact constants (hardcoded)

- WhatsApp: `https://wa.me/2349153081531` (message text varies by location)
- Email: `Info@emi-igi.co.site`
- Instagram: `https://instagram.com/emi_igi`

Update all occurrences if these change (Hero, ProductSection, Footer).
