# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start   # dev server at http://localhost:8080 with live reload
npm run build   # build static site into docs/
```

No test suite exists.

## Architecture

This is an [Eleventy (11ty)](https://www.11ty.dev/) static site for ABQueer WCS, a queer West Coast Swing dance organization in Albuquerque, NM. The built output lands in `docs/` (served by GitHub Pages).

**Source layout:**
- `src/` — Nunjucks (`.njk`) templates; input root for Eleventy
- `src/_layouts/base.njk` — single shared HTML shell (loads all CSS/JS)
- `src/_includes/` — header and footer partials
- `src/_data/` — JSON data files consumed as template globals
- `assets/` — static files (CSS, JS, images, documents); copied verbatim to `docs/`

**Data files drive the site content:**
- `src/_data/events.json` — event objects (`title`, `date` as ISO string, `description[]`, `time`, `location`, `image`, optional `gallery[]`). Upcoming vs. past events are split at render time using the custom `toMillis` filter.
- `src/_data/board.json` — board member objects (`name`, `role`, `bio[]`, `image`, optional `photoCredit`)
- `src/_data/carousel.json` — ordered array of image paths shown on the home page carousel
- `src/_data/faq.json` — FAQ entries (`question`, `answer`, optional `links[]`)

**Custom Eleventy filters** (defined in `.eleventy.js`):
- `date(format)` — formats ISO date strings using Luxon (default: `"MMMM d, yyyy"`)
- `toMillis` — converts ISO date string or `"now"` to epoch ms; used in templates to compare event dates against current time

**Special pages:**
- `src/events/events/` — individual event detail pages (e.g. `2026-06-27-big-june-event.njk`) with custom content and their own permalink
- `src/events/past.njk` — renders all events where `date | toMillis < now`, newest first; includes photo gallery support via `event.gallery[]`
- `src/events/index.njk` — renders upcoming events only; first upcoming event gets the `event-highlight` CSS class

**Adding a new recurring event:** add an object to `src/_data/events.json` with at minimum `title`, `date`, and `description[]`. Add the flyer image to `assets/images/events/` named `YYYY-MM-DD.png`.

**Adding gallery photos for a past event:** populate the `gallery` array on the event object in `events.json` with paths under `assets/images/events/gallery/YYYY-MM-DD/`.
