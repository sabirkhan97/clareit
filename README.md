# Clareit — Marketing Website

A full-stack consultancy landing site built with **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion**.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

Build for production:

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build locally
```

## Folder structure

```
clareit/
├── index.html                  Entry HTML (fonts, meta tags)
├── tailwind.config.js          Design tokens: colors, type scale, animations
├── postcss.config.js
├── vite.config.ts              Vite config + "@/" path alias → src/
├── tsconfig.json
├── package.json
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.tsx                 React root
    ├── App.tsx                  Page composition — imports every section in order
    ├── index.css                Tailwind directives + custom utility classes
    ├── vite-env.d.ts
    │
    ├── components/
    │   ├── Navbar.tsx            Sticky nav, scroll-aware pill, mobile drawer
    │   ├── Hero.tsx              Parallax hero, animated headline, stack ticker
    │   ├── ClientStrip.tsx       Logo marquee (social proof)
    │   ├── Services.tsx          8 service cards (reads data/services.json)
    │   ├── StatsBand.tsx         Dark band with animated count-up stats
    │   ├── Work.tsx               Case-study list (reads data/projects.json)
    │   ├── Process.tsx           4-step "how we work" timeline
    │   ├── About.tsx             Founder quote (Azeem) + company stats
    │   ├── Testimonials.tsx      Auto-rotating client quote carousel
    │   ├── Contact.tsx           Form + Google Maps embed + contact cards
    │   ├── CtaBand.tsx           Pre-footer call-to-action banner
    │   ├── Footer.tsx            Sitemap, socials, address
    │   ├── ScrollProgress.tsx    Top scroll-progress bar
    │   ├── PageLoader.tsx        Initial page-load intro animation
    │   │
    │   └── ui/                   Reusable primitives
    │       ├── Reveal.tsx           Scroll-triggered fade/slide-up wrapper
    │       ├── Stagger.tsx          Stagger container + item for grids/lists
    │       ├── Magnetic.tsx         Magnetic-pull hover wrapper (buttons)
    │       ├── Marquee.tsx          Infinite horizontal scroll ticker
    │       ├── SectionHeading.tsx   Eyebrow + title + description block
    │       └── CountUp.tsx          Animated number count-up
    │
    ├── data/                     Static JSON — edit these to change site content
    │   ├── company.json           Brand, founder, contact info, Google Maps URL, stats
    │   ├── services.json          The 8 services offered (icon, stack, description)
    │   ├── stack.json             Tech stack list for the hero marquee
    │   ├── clients.json           Client logos (dummy data) for social-proof strip
    │   ├── projects.json          Case studies / portfolio (dummy data)
    │   └── testimonials.json      Client quotes (dummy data)
    │
    └── hooks/
        ├── useInView.ts          IntersectionObserver-based "has scrolled into view"
        └── useMousePosition.ts   Normalized mouse position (-1 to 1) for effects
```

## Editing content

Almost everything text-based lives in `src/data/*.json` — no need to touch component
code to change copy, add a client logo, add a project, or update the address/phone.

- **Company info, founder, address, map link** → `src/data/company.json`
- **Services offered** → `src/data/services.json` (icon name must match a key in
  `Services.tsx`'s `ICONS` map — uses [lucide-react](https://lucide.dev) icons)
- **Clients (social proof strip)** → `src/data/clients.json`
- **Case studies** → `src/data/projects.json`
- **Testimonials** → `src/data/testimonials.json`
- **Tech stack ticker** → `src/data/stack.json`

## Design system

- **Colors**: warm paper background (`#F6F4EF`), deep ink (`#11151C`), signal indigo
  accent (`#4F46E5`), ember orange secondary accent (`#E8743B`). Defined in
  `tailwind.config.js` under `theme.extend.colors`.
- **Type**: Space Grotesk (display/headlines) + Inter (body) + JetBrains Mono (labels,
  eyebrows, code-styled chips). Loaded via Google Fonts in `index.html`.
- **Motion**: Framer Motion powers scroll reveals (`Reveal`, `Stagger`), the hero
  parallax (`useScroll` + `useTransform`), magnetic buttons, and the marquees use pure
  CSS keyframe animation (`animate-marquee` in `tailwind.config.js`) for performance.

## Notes

- The contact form in `Contact.tsx` is a **static demo** — it shows a success state on
  submit but doesn't send anywhere yet. Wire the `handleSubmit` function up to your
  backend, a form service (Formspree, Resend, etc.), or an API route.
- The Google Map in `Contact.tsx` uses a public, keyless embed URL
  (`company.contact.embedUrl`). For a richer embed (custom pin styling, etc.) swap in
  the Google Maps JavaScript API with your own API key.
- All client, project, and testimonial data is placeholder/dummy data — replace with
  real content before launch.
