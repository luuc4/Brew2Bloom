# Brew2Bloom

**Brew. Grow. Repeat.** — Urban gardening kits made from upcycled coffee grounds.

A static, mobile-first marketing site. No build step, no framework, no tracking.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Pages

| File | Section |
|---|---|
| `index.html` | Hero, mission, the loop, products, partners, testimonials, newsletter |
| `shop.html` | Starter kit detail, subscription plans, workshop schedule, merch, FAQ |
| `map.html` | Interactive Vorarlberg map (Leaflet + OpenStreetMap) |
| `learn.html` | Field notes blog grid with category filter |
| `impact.html` | Quarterly impact report, allocation breakdown, NGO partners |

## Files

- `styles.css` — full design system, mobile-first, no frameworks
- `script.js` — counters, scroll-reveal, FAQ, map, blog filter

## Design tokens

| Token | Hex | Use |
|---|---|---|
| Espresso Black | `#1A1A1A` | Type, contrast surfaces |
| Raw Earth | `#B85C38` | Substrate accent (warm terracotta) |
| Earth Deep | `#8C3D1F` | Hover states, deep accents |
| Minty Leaf | `#B4D3B2` | Highlights, tags |
| Mint Deep | `#6FA86C` | Success states |
| Recycled Paper | `#F5F5DC` | Background |
| Paper-2 | `#EDE8C8` | Section alternates |

Headlines: **Space Grotesk** · Body: **Lora** (Google Fonts).

## What's interactive

- Animated hero scene (steam, dripping coffee, sprouting plant) — pure CSS keyframes
- Impact counters animate when scrolled into view
- Reveal-on-scroll for cards and sections
- Mobile hamburger nav
- FAQ accordions
- Map filter (drop / pickup / all)
- Blog category filter
- Real Leaflet map with OpenStreetMap tiles, custom Brew2Bloom pins, sidebar location list
- Newsletter form (visual only — wire to your provider)
- Respects `prefers-reduced-motion`
