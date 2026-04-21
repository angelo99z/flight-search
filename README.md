# ✈ AeroFind

A European flight search engine that aggregates real-time prices from multiple airlines — built with pure HTML, CSS and JavaScript, no frameworks.

**[Live demo →](https://aero-find-gilt.vercel.app)**

---

## Overview

AeroFind lets users search for flights across 4 major European carriers, compare prices side-by-side and get redirected directly to the airline's booking page. No paid APIs, no middlemen.

![AeroFind screenshot](https://aero-find-gilt.vercel.app)

---

## Features

- **Real-time prices** via Ryanair's own availability API (no key required)
- **Multi-airline aggregation** — Ryanair, British Airways, Air France, KLM
- **Sky Scrapper integration** (RapidAPI) for BA, AF and KLM live prices
- **Deep-link redirects** to each airline's booking page with route and date pre-filled
- **Smart fallback** — seeded estimated prices when live sources are unavailable
- **Dual-month calendar** — always shows 60+ future dates
- **Filters** — stops, departure time, max price, duration, airline
- **Sort** — Recommended, Cheapest, Fastest
- **Best pick** card with savings indicator
- Fully responsive — mobile, tablet and desktop

---

## Airlines

| Airline | Price source | Booking redirect |
|---|---|---|
| Ryanair | Direct API (live) | Pre-filled route + date |
| British Airways | Sky Scrapper (indicative) | Homepage |
| Air France | Sky Scrapper (indicative) | Pre-filled via `/search/open-dates` |
| KLM | Sky Scrapper (indicative) | Pre-filled via `/search/open-dates` |

> BA/AF/KLM prices from Sky Scrapper may be cached — always verify on the airline's site before booking. Prices marked with `~€` are indicative.

---

## Tech stack

- **HTML5 / CSS3 / JavaScript (ES2022)** — zero dependencies, zero frameworks
- **Ryanair Availability API** — `ryanair.com/api/booking/v4/en-gb/availability`
- **Sky Scrapper v3** via [RapidAPI](https://rapidapi.com/apiheya/api/sky-scrapper3) — covers BA, AF, KLM and 400+ airlines
- **allorigins.win** — CORS proxy for GET requests
- **Vercel** — hosting and deployment

---

## Getting started

No build step required. Clone and open.

```bash
git clone https://github.com/angelo99z/aero-find.git
cd aero-find
# open index.html in your browser
```

### Optional: enable Sky Scrapper live prices

1. Create a free account at [rapidapi.com](https://rapidapi.com)
2. Subscribe to [Sky Scrapper](https://rapidapi.com/apiheya/api/sky-scrapper3) (free tier: 50 req/month)
3. Open `app.js` and set your key:

```js
const RAPIDAPI_KEY  = 'your-key-here';
const RAPIDAPI_HOST = 'sky-scrapper3.p.rapidapi.com';
```

---

## Project structure

```
aero-find/
├── index.html   — markup and layout
├── style.css    — design system, components, responsive
└── app.js       — all application logic
    ├── Airport data & AIRLINES array
    ├── Ryanair live API
    ├── Sky Scrapper (RapidAPI)
    ├── Fallback price simulation
    ├── Calendar (dual-month)
    ├── Filters & sorting
    ├── Flight card rendering
    └── buildBookingUrl() — per-airline deep-links
```

---

## License

MIT — free to use and modify.

---

Built by [Angelo Galeano](https://angelo99z.github.io/portifolio/)
