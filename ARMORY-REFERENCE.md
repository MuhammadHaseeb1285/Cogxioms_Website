# Armory template — Projects & Case Study reference

Extracted from `https://armory.framer.ai/` (Framer site `ptweoRwpAW8BH5OS8HhnX`) by reading the
served HTML, the inlined stylesheet, and the compiled component chunks. Values below are the
actual numbers from the build, not estimates.

Source of the card component: `dctoRyc_W.CwqiTlf-.mjs` (component class prefix `framer-kCOt4`).

---

## 1. Projects index — `/project`

### Route & data shape

- Index lives at `/project` (singular), detail at `/project/{slug}`.
- Five entries, no filter tabs, no category chips, no pagination, no sort control.
- Order is authored, not computed — every entry is year 2026.

| # | Slug | Title |
|---|------|-------|
| 1 | `cigna-smart-health-systems` | Cigna Smart Health Systems |
| 2 | `aetna-health-data-ecosystem` | Aetna Health Data Ecosystem |
| 3 | `anthem-neural-care-network` | Anthem Neural Care Network |
| 4 | `cvs-smart-supply-chain-hub` | CVS Smart Supply Chain Hub |
| 5 | `united-ai-security-protocol` | United AI Security Protocol |

### Page header copy

- H1: **"AI systems we've designed and deployed"**
- Lede: *"Explore real builds across automation, AI agents, and custom workflows, designed to
  solve specific problems and deliver measurable results."*
- A vertical rich-text label: `STRATEGY / ML ENGINEERING / AUTOMATION / PRODUCT`
  (one text block, lines split on U+2028 line separators rather than separate elements).

### List container

```
border-top:    1px solid rgba(255,255,255,0.06)
border-bottom: 1px solid rgba(255,255,255,0.06)
z-index: 2
flex-flow: column; align-items: center
```

Each row is wrapped in a plain `<a href="./project/{slug}">` — the whole row is one link
target, there is no separate "read more" affordance.

---

## 2. The row card — full interaction spec

One Framer component with six authored variants. This page uses **Desktop black**.

| Variant | id | Desktop class |
|---|---|---|
| Desktop white | `ky_SUP0ij` | `framer-v-8h2i4a` |
| Desktop black | `UKwqRh6bg` | `framer-v-1d9q3aw` |
| Tablet white | `ysfroVNZm` | `framer-v-lf7l2r` |
| Tablet black | `bcaCxSKDY` | `framer-v-3i3bpm` |
| Mobile white | `pG3smCuuc` | `framer-v-1azrith` |
| Mobile black | `SagcHOiM6` | `framer-v-1qz0u0n` |

Framer generates a paired `{id}-hover` variant. Hover is a **variant switch**, not a CSS
`:hover` rule — that is why almost nothing shows up when you grep the stylesheet for `:hover`.

### Layout — desktop

```
.framer-8h2i4a          display:flex; flex-flow:row; width:1200px; height:min-content;
                        align-items:flex-start; place-content:flex-start; gap:0; padding:0;
                        cursor:pointer; position:relative; overflow:visible

.framer-3ney3f  (media) width:25%; align-self:stretch; height:auto;
                        position:relative; overflow:clip

.framer-1l66reh (body)  flex:1 0 0; flex-flow:row;
                        place-content:flex-start space-between;
                        padding: 0 0 30px            /* black variant */
                        padding: 0 0 30px 40px       /* white variant */
```

Row chrome, black variant:
```
background-color: rgb(6,6,6)
border-bottom: 1px solid rgba(255,255,255,0.06)   /* other three sides 0 */
```
White variant: `background-color: rgba(5,5,5,0)` (transparent), border
`rgba(0,0,0,0.06)`.

### Layout — tablet / mobile

```
flex-direction: column; width: 400px; cursor: unset
media:  order 0; width:100%; height:400px; align-self:unset
body:   order 1; flex:none; width:100%; padding: 0 0 40px 40px
logo:   width:229px; height:69px      /* up from 169×51 */
```

Note `cursor: unset` on the small breakpoints — the pointer affordance is desktop-only.

### The media cell — three stacked layers

Inside the 25% media cell, all absolutely positioned:

1. **Project photograph** — `.framer-18yf51`
   `position:absolute; inset:1px; overflow:clip; will-change:filter`
   `object-fit:cover`, served responsive via `srcset` at 512/1024/1920w.
   **Resting `opacity: 0`.**
2. **Client wordmark** — `.framer-uguyv8`
   `169×51px` (`aspect-ratio: 3.31373`), `position:absolute; top:50%; left:50%`
   with `transformTemplate: translate(-50%,-50%) ${t}` so any animated transform composes
   on top of the centring rather than overwriting it.
   **Resting `filter: invert(0.9)`.**
3. **Grain / noise tile** — `.framer-1ajs1mo` (and `.framer-r0xbqz`)
   `position:absolute; inset:0; z-index:1; opacity:0.13; will-change:filter`
   tiled bitmap `6mcf62RlDfRfU61Yg5vb2pefpi4.png` at `background-size: 93.5px auto`.
   Static — does not animate.

### Hover — exact values

Transition for every property below:

```js
{ type: 'spring', stiffness: 400, damping: 40, mass: 1, delay: 0 }
```

| Target | Rest | Hover |
|---|---|---|
| `.framer-18yf51` — project photo | `opacity: 0` | `opacity: 1` |
| `.framer-uguyv8` — client wordmark | `filter: invert(0.9)` | `filter: invert(0)` |
| tint overlay | `opacity: 0` | `opacity: 0.06` |
| `.framer-t90tqx` — body inner | (default align) | `justify-content: flex-start` |

**The wordmark row is variant-dependent, and this matters.** The source artwork is *white on
transparent* (confirmed by opening the PNGs — they render invisible against white). So:

- **Desktop white** (`ky_SUP0ij`) — rest `invert(0.9)`, which turns the white art near-black
  so it reads on the light card; hover `invert(0)` returns it to white exactly as the
  photograph arrives beneath it. **This is the variant that animates.**
- **Desktop black** (`UKwqRh6bg`) — pinned at `invert(0)` in both states. The art is already
  white and the card is already `rgb(6,6,6)`, so only the photo and the scrim move.

The tint overlay flips with the variant too: `rgb(6,6,6)` at 6% on the white card, white at
6% on the black card. Either way it is a 6% scrim in the opposing ink.

So the effect reads as: **a dim monochrome wordmark plate that resolves into the real
photograph, with the wordmark simultaneously un-inverting to its true colour, under a spring
that settles in roughly 200 ms.** `stiffness 400 / damping 40 / mass 1` is slightly
underdamped — there is a faint overshoot, which is what makes it feel snappy rather than
linear. `WebkitFilter` is written alongside `filter` on every variant.

### Which variant each page uses

Counting variant classes in the served markup:

| Page | Desktop variant |
|---|---|
| `/` (homepage case studies) | **white** |
| `/project` (index) | **black** |
| `/project/{slug}` (related) | **black** |

Armory switches the card from light to dark between the homepage and the index. Worth knowing
before assuming one treatment is "the" design.

### Text slots and per-variant colour

Three text slots in the body cell:

| Slot | Element | Style preset | Sample |
|---|---|---|---|
| Year | `p` | `jwHxuw2Vw` | `//2012` — note the `//` prefix is part of the string |
| Title | `h5` | `L2qDMQpXy` | project name |
| Description | `p` | `jwHxuw2Vw` | one-sentence summary |

Colours are swapped per variant via `--framer-text-color`, not inherited:

| Slot | Black variant | White variant |
|---|---|---|
| Year | `rgba(255,255,255,0.85)` | `rgb(26,26,26)` |
| Title | `rgb(255,255,255)` | `rgb(6,6,6)` |
| Description | `rgba(255,255,255,0.85)` | `rgb(26,26,26)` |

Design tokens in play:
```
--token-4fa6f72b…  rgb(6,6,6)               near-black surface
--token-a01086db…  rgb(255,255,255)         white
--token-1223f9f2…  rgb(26,26,26)            dark ink on light
--token-77aa92b6…  rgba(255,255,255,0.85)   muted on dark
--token-ebf3db9c…  rgba(255,255,255,0.06)   hairline border
```

### Click behaviour

Plain anchor navigation to `./project/{slug}`. No modal, no shared-element transition, no
`layoutId` handoff between the row and the detail page — `layoutId`s in the bundle are
Framer's internal per-variant layout animation, scoped inside the card. The detail page is a
normal route load that starts at the top.

---

## 3. Case study detail — `/project/{slug}`

Verified against `/project/cvs-smart-supply-chain-hub` by walking the DOM in document order.
**The page is considerably deeper than a hero-plus-prose layout — the defining feature is
three image galleries interleaved through the copy.** Order:

| # | Block | Notes |
|---|---|---|
| 1 | Date | `Jul 30, 2026` |
| 2 | **Hero media** | project photo `1920×1205` + client wordmark `567×171` — the row card's layer stack, resting revealed |
| 3 | H1 + tagline | "CVS Smart Supply Chain Hub" |
| 4 | **Stat row ×4** | see below |
| 5 | Testimonial | H4-sized quote, then name, then role |
| 6 | Challenge prose | one paragraph |
| 7 | **GALLERY — 3 up** | portrait / landscape / portrait |
| 8 | Solution prose | two paragraphs |
| 9 | **GALLERY — 1 wide** | full width |
| 10 | Achievements ×4 | plain paragraphs, not a bulleted list |
| 11 | **Pull-quote** | H4, *unattributed* — a second voice, distinct from the testimonial |
| 12 | Closing prose | one paragraph |
| 13 | **GALLERY — 2 up** | |
| 14 | Meta block | `Industry`, `Timeline`, `Platform`, `Live website` |
| 15 | Related header | eyebrow `CASE STUDIES`, H2 **"View more projects"**, lede paragraph |
| 16 | Related rows ×3 | reuses the row component |
| 17 | `All Projects` | |
| 18–20 | Newsletter, template CTA, footer | |

Note **"View more projects" is the related section's H2 heading**, not a button.

### Stat row

The server-rendered HTML ships `$0M`, `0%`, `0x`, `0` while the labels carry the real targets
("The operational savings from our AI pilot helped greenlight a massive logistics tech
overhaul."). Digits animate up from zero on scroll into view — ship 0 in the markup, count to
target in JS. Labels are full sentences, not the two-word captions a stat row usually gets.

### Gallery geometry

```
row    display:flex; gap:0; width:100%; border-top:1px solid <hairline>
       flex-direction:column at mobile
cell   flex:1 0 0; width:1px; aspect-ratio:1.15385   /* 15:13 */
wide   flex:none;  width:100%; aspect-ratio:2.30769  /* exactly 2× the cell */
mobile cell -> flex:none; width:100%; aspect-ratio:1.15385
```

Heights resolve to 390px desktop / 351px tablet / 338px mobile — those are Framer's
`--framer-aspect-ratio-supported` fallbacks, the ratio does the real work.

Two details that carry the look:

- **`gap: 0`.** Images are flush edge to edge, with a single hairline above the row.
- **`filter: grayscale()` on the gallery wrapper**, not the images. This is what lets a mixed
  set of source photographs read as one commission. Remove it and the page becomes a mood
  board.

The `flex: 1 0 0` + `width: 1px` pairing is deliberate: without the explicit width, an image
with larger intrinsic dimensions claims extra space and the columns stop being equal.

Prose column is capped at `max-width: 700px` while galleries run full width — the alternation
between measured text and full-bleed image is the page's whole rhythm.

### Reveal-on-scroll

Section blocks are server-rendered with `will-change:transform; opacity:0; transform:none`
and are faded in at runtime by Framer's appear-effects script. Only three elements use the
*optimised* appear payload; the one authored transition in it is:

```js
{ type:'spring', bounce:0.2, duration:0.4, delay:5 }   // opacity 0.001 → 1
```

`delay: 5` is the page-loader overlay, not content — do not copy that delay onto sections.
Two tween curves also appear in the page module, both currently `duration: 0`:
`cubic-bezier(.5,0,.88,.77)` and `cubic-bezier(.12,.23,.5,1)`.

There are **no** `@keyframes` anywhere in the stylesheet, and no scroll-linked
(`useScroll`/`useTransform`) parallax on these two pages. Everything is discrete state
change: appear-on-view, and hover variant switch.

---

## 4. Gap analysis vs `MYsite`

Your `src/components/Projects/Projects.jsx` already matches the structure closely — same
four-part row anatomy (media, year, body, chevron), same homepage-trim-to-3 pattern, same
slug-based routing. Differences that matter:

| Aspect | Armory | `MYsite` today |
|---|---|---|
| Row hover | photo `opacity 0→1` + wordmark `invert(.9)→invert(0)` + 6% tint, spring 400/40 | `background: var(--case-hover)` + chevron `translateX(4px)`, tween 0.2–0.25s ease |
| Media at rest | photo hidden, wordmark plate showing | image shown immediately, wordmark only as fallback when `image` absent |
| Reveal | spring, runtime appear effects | tween `0.5s easeOut`, stagger `0.06s` capped at index 4 |
| Detail stats | count up from 0 on scroll into view | static values rendered once |
| Detail sections | each block reveals on scroll | only `<header>` animates; stats, body, meta, related are static |
| Testimonial block | present, between stats and prose | not present |
| Related row content | year + title + summary, reuses row component | year + name + **category**, separate lighter markup |
| Route | `/project/:slug` | `/projects/:slug` |
| Breakpoints | `cursor:unset` below desktop; media becomes full-width 400px tall, order swaps above body | (check `Projects.css` media queries) |

Your row already has the better fallback story (typographic wordmark from `name` when no
image), and your data layer in `src/data/caseStudies.js` is richer than Armory's —
`challenge` / `solution` / `achievements` / `stats` / `stack` / `meta` per entry, with a
single source of truth shared by list and detail. Armory has no `stack` concept and no
`category` on the detail page.

---

## 5. What was implemented

Built against Armory's **Desktop white** variant rather than the black one, because
`--case-ink: rgb(6,6,6)` and `--case-ink-soft: rgb(26,26,26)` in `Projects.css` are already
that variant's exact colours — the section was authored against it. Matching the black variant
would have meant inverting a section that is deliberately light within a dark site.

| File | Change |
|---|---|
| `src/data/caseStudies.js` | `image` on all seven (hover layer, not resting); shared `PLACEHOLDER_GALLERY` applied via `withDefaults`; `pullQuote` + `closing` per entry; optional `testimonial` documented |
| `src/components/Projects/Projects.jsx` | Three-layer media cell; hover on the exact `spring 400/40/1`; chevron on the same spring; `useReducedMotion` guard; 25/50/75 gridlines |
| `src/components/Projects/CountUp.jsx` | **New** — stat count-up from zero on scroll-in, via MotionValue so per-frame updates skip React |
| `src/components/Projects/ProjectDetail.jsx` | Rebuilt to the full reference order: hero media, three interleaved galleries, pull-quote, closing, titled related section; per-section reveals; count-up stats |
| `src/components/Projects/Projects.css` | Media layer stack, scrim, grain, hero media, gallery geometry, pull-quote, related header |
| `src/components/PageTransition/PageTransition.{jsx,css}` | **New** — route veil + instant scroll reset, replacing `ScrollToTop` |
| `src/App.jsx` | `ScrollToTop` removed in favour of `PageTransition` |

### Gridlines

`.case-section` had a single rule at 25%. It now carries the same three-rule grid as
`.approach-gridlines` and `.scroll-reveal-grid` — `justify-content: space-evenly` over three
`0.1px` spans, landing on 25/50/75, hidden below 720px where the rows go single-column. The
one difference is colour: those sections sit on `--bg-body` and use `#353535`, which against
`#ececec` would read as near-black, so this uses `--case-line`. Weight is identical.

### Route transition

The old `ScrollToTop` called `window.scrollTo({ behavior: 'smooth' })` on pathname change.
Because react-router swaps routes synchronously, the new page painted at the *old* scroll
offset and only then slid upward — so clicking "More Projects" from mid-page showed the middle
of the next page travelling past. Fixed by doing two things in order: reset the scroll
**instantly** (there is nothing meaningful to animate between two documents), and cover the
swap with a veil that lifts away. `html { scroll-behavior: smooth }` in `App.css` would
otherwise override this, so the per-call `'instant'` is load-bearing.

The veil is keyed on `pathname` — a new key remounts it, replaying `initial → animate` on
every navigation. `pointer-events: none` throughout, because a 600 ms dead zone over the
header would be worse than no transition. Suppressed entirely under `prefers-reduced-motion`.

Two deliberate deviations from the reference:

1. **The row keeps its background tint on hover** (`#ececec` → `#e2e2e2`). Armory's white
   variant leaves the row transparent in both states, relying on the photo reveal alone — but
   Armory's rows sit on a dark page. On a light `#ececec` section the tint is carrying the
   hover affordance for the whole row, which is the actual click target, and below 720px the
   media cell is `display:none` so the reveal is not there to carry it.
2. **The chevron is kept.** Armory has no chevron; this one predates the port and is a useful
   affordance, so it was folded into the hover choreography rather than removed.

The plate is the existing typographic `.case-wordmark`, re-authored white and shown through
the invert filter — the reference's own mechanism, and it means no per-project logo asset is
needed. `image` is optional throughout: omit it and the row degrades to a plate that reveals
nothing, with no layout shift.

### Outstanding

- **Replace the placeholder imagery — 13 files.** `public/Images/case-placeholder/` holds
  seven row photos plus six gallery images, all lifted from the Armory template so the reveal
  and the gallery rhythm are visible while building. They are licensed to that template, not
  to us. Full-resolution originals are kept out of the bundle in `_armory-reference/`.
  Swapping is one edit for the gallery (`PLACEHOLDER_GALLERY`) and one line per row image.
- `public/Images/noise-tile.png` is likewise Armory's grain tile — trivially regenerable.
- **`pullQuote` and `closing` are drafted, not supplied.** Each only restates something the
  entry's own `solution` or `achievements` already asserts, so no new claim is introduced —
  but they are editorial and should be read before publishing.
- No testimonials are wired up. The block renders only when `testimonial` is present; left
  absent rather than filled with invented quotes attributed to real people.
- **No publish date.** The reference shows one above the hero; our data carries only `year`,
  so the `//YYYY` marker stands in. Add a `date` field if the exact form matters.
- Achievements render as a bulleted list; the reference uses plain paragraphs. Kept as a list
  deliberately — it is the same content, better marked up.
- Armory's tablet breakpoint swaps the media cell to the *right* of the copy
  (`order: 1` / body `order: 0`, body `padding-left: 40px`). Not ported.
