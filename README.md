# Cogxioms_Website

Marketing site for **Cogxioms** — a software house building integration, analytics
and commerce systems. Live at [cogxioms.com](https://www.cogxioms.com).

## Stack

| | |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | react-router-dom 7 |
| Motion | framer-motion 12 |
| Icons | react-icons 5 |
| Mail | @emailjs/browser |

## Running locally

```bash
cd MYsite
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the production build
```

## Layout

```
MYsite/
  public/
    Images/        photography and logos (WebP)
    videos/        background loops and the product film (webm + mp4 + poster)
    CNAME          custom domain for GitHub Pages — do not delete
  src/
    components/    one folder per section, each with its own CSS
    data/          case study content
    lib/           shared config (EmailJS)
render.yaml        Render static-site config with the SPA rewrite
```

## Design system

Sections sit on a shared four-quarter grid with vertical rules at 25%, 50% and
75%. Hover states are driven by framer-motion variants rather than CSS `:hover`,
under a common spring (`stiffness: 400, damping: 40, mass: 1`), so nested
elements can react to one parent gesture.

Type is fluid via `clamp()`. The root font size is held near-constant across
breakpoints — tapering it scales every rem-based value at once and was the
source of a batch of small-screen layout bugs.

## Assets

Photographs are WebP, capped at 1600px on the long edge. Video ships as VP9
`webm` with an H.264 `mp4` fallback and a poster still, so a visitor downloads
one file rather than both. The product film is `preload="none"` and only fetches
on click.

## Deployment

Static build, no server. `render.yaml` configures Render with a `rewrite` from
`/*` to `/index.html` — a redirect instead of a rewrite would break deep links
to routes like `/projects/relay`. For GitHub Pages the same is achieved with a
`404.html` copy of `index.html`; `public/CNAME` carries the custom domain.

## Notes

`MYsite/src/lib/emailjs.js` holds the EmailJS public key, service ID and
template ID. These are publishable by design — EmailJS expects them in client
code — and are not secrets.
