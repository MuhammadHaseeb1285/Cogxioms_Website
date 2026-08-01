/*
 * Art for the "Built for the long term" panel.
 *
 * These sit on a light panel, so strokes use currentColor and inherit the panel's
 * ink colour rather than hard-coding white like the dark-card set in
 * ../About/icons/lineArt.js. Every path carries pathLength="1" so the shared CSS
 * stroke-draw works unchanged.
 */

const stroke =
  'pathLength="1" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';

const svg = (viewBox, body) =>
  `<svg role="presentation" viewBox="${viewBox}" style="width:100%;height:100%;overflow:visible;"><g>${body}</g></svg>`;

/*
 * The hatched glyph beside the eyebrow. Slash geometry lifted verbatim from the
 * three left-most slashes of the Framer source, so the angle and spacing match.
 */
export const hatchGlyph = `<svg role="presentation" viewBox="0 0 33.5 16.6" style="width:100%;height:100%;overflow:visible;"><g fill="currentColor"><path d="M 18.006 14.72 L 1.656 0 L 0 1.84 L 16.348 16.562 Z" /><path d="M 25.717 14.72 L 9.367 0 L 7.711 1.84 L 24.058 16.562 Z" /><path d="M 33.428 14.72 L 17.078 0 L 15.421 1.84 L 31.771 16.561 Z" /></g></svg>`;

/* Prime Logic — an isometric cube with a star struck on its top face. */
export const primeLogicArt = svg(
  '0 0 60 70',
  `
  <path ${stroke} d="M 30 6 L 54 20 L 30 34 L 6 20 Z" />
  <path ${stroke} d="M 6 20 L 6 48 L 30 62 L 30 34" />
  <path ${stroke} d="M 54 20 L 54 48 L 30 62" />
  <path ${stroke} d="M 30 12 L 33 18 L 40 20 L 33 22 L 30 28 L 27 22 L 20 20 L 27 18 Z" />
`
);

/* Total Clarity — a lens, wide open. */
export const totalClarityArt = svg(
  '0 0 74 57',
  `
  <path ${stroke} d="M 5 28.5 C 18 8, 56 8, 69 28.5 C 56 49, 18 49, 5 28.5 Z" />
  <path ${stroke} d="M 29 28.5 A 8 8 0 1 0 45 28.5 A 8 8 0 1 0 29 28.5 Z" />
  <path ${stroke} d="M 37 8 L 37 2 M 12 14 L 8 10 M 62 14 L 66 10" />
`
);

/* Fast Cycles — a bolt inside its cycle. */
export const fastCyclesArt = svg(
  '0 0 56 73',
  `
  <path ${stroke} d="M 28 8 A 26 26 0 1 0 28 60 A 26 26 0 1 0 28 8 Z" />
  <path ${stroke} d="M 32 18 L 18 36 L 27 36 L 24 50 L 38 32 L 29 32 Z" />
  <path ${stroke} d="M 28 64 L 28 70 M 28 2 L 28 8" />
`
);
