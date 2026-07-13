# CodeCroupier — Marketing Site

A fully responsive React + Vite + Tailwind CSS v4 marketing site for
CodeCroupier / C-Chip, built from the "Black Diamond Protocol" theme.

## What's included

- **Original design & copy** — inspired by the layout rhythm of a reference
  site, but with original graphics (SVG chip visual, CSS glow effects) and
  original copy. No images or text were copied from any third-party site.
- **No ROI / affiliate-commission / referral pages** — this build is a
  straightforward product marketing site (hero, features, how-it-works,
  dashboard preview, about, FAQ, contact). It does not include guaranteed-return
  pricing tiers or MLM-style referral/commission structures.
- Tailwind CSS v4 (via `@theme` tokens matching the Black Diamond palette)
- Framer Motion for scroll-triggered left/right/up reveal animations and
  hover micro-interactions
- Fully responsive from mobile (375px) up through desktop
- Component/data folder structure for easy editing

## Folder structure

```
src/
  components/
    ui/          # Reusable primitives: Button, Reveal, Icon, ChipVisual,
                 # PageHeader, ScrollToTop
    sections/    # Section blocks: Navbar, Hero, Features, HowItWorks,
                 # BenefitsBanner, DashboardPreview, About, FAQ, Contact, Footer
  pages/         # Routed pages: Home, HowItWorksPage, AboutPage, FaqPage,
                 # ContactPage — each composes section components
  data/          # JSON content: nav.json, features.json, steps.json,
                 # faq.json, about.json, testimonials.json, howToBenefit.json
  App.jsx        # Route definitions
  main.jsx       # BrowserRouter wrapper
  index.css      # Tailwind import + Black Diamond color/font tokens
```

## Routes

| Path | Page |
|---|---|
| `/` | Home (hero, features, how-it-works teaser, dashboard preview) |
| `/how-it-works` | Full "How It Works" page with benefits + steps |
| `/about` | About Us — mission, vision, testimonials |
| `/faq` | Full FAQ accordion |
| `/contact` | Contact form + details |

Navigating between these uses React Router (`react-router-dom`), so
clicking a nav link is a real client-side route change, not an anchor
scroll. `public/_redirects` (Netlify) and `vercel.json` (Vercel) are
included so refreshing a deep link like `/faq` in production doesn't 404 —
add an equivalent rewrite rule for any other static host.

## Editing content

All section copy lives in `src/data/*.json` — edit those files to change
headlines, feature descriptions, FAQ entries, etc. without touching component code.

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # preview the production build
```

## Color tokens (from Black Diamond Protocol theme)

| Token | Hex |
|---|---|
| brand-red | #D72638 |
| brand-crimson | #A20821 |
| brand-pink | #FF2E55 |
| bg-primary | #000000 |
| bg-coal | #0A0A0A |
| bg-panel | #111111 |
| silver / silver-light | #CCCCCC / #E0E0E0 |
| silver-border | #7A7A7A |
| graphite | #2A2A2A |
| neon-purple | #9A00FF |
| neon-cyan | #00E8FF |
| profit-green | #00C57E |

## Extending

To add a roulette game page or fuller token dashboard, create a new file in
`src/components/sections/`, add any content to a new file in `src/data/`,
and import it into `App.jsx`. Keep in mind: any real-money betting or
token-payout logic should be backed by an actual, auditable smart contract —
not just UI that implies fairness.
