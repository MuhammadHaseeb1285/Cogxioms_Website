/*
 * Line art authored to match the Framer-exported Secure Guard illustration
 * (see ./secureGuard.js). Shared recipe, so all four cards read as one set:
 *
 *   stroke        rgb(255, 255, 255)   at stroke-width 0.8
 *   solid fill    rgb(6, 6, 6)         — same as --bg-body
 *   lit fill      rgb(26, 26, 26)      — the raised/top faces
 *   projection    isometric, ry = rx / 2 on every ellipse
 *
 * Every path carries pathLength="1" so the CSS draw-in can use a single
 * stroke-dasharray value across paths of very different real lengths. See
 * ApproachCard for why this is done in markup rather than measured in JS.
 */

const geom = 'pathLength="1" stroke="rgb(255, 255, 255)" stroke-width="0.8"';
const open = `fill="transparent" ${geom}`;
const solid = `fill="rgb(6, 6, 6)" ${geom} stroke-linejoin="round"`;
const lit = `fill="rgb(26, 26, 26)" ${geom} stroke-linejoin="round"`;

const svg = (body) =>
  `<svg role="presentation" viewBox="0 0 170 150" style="width:100%;height:100%;overflow:visible;"><g fill="transparent">${body}</g></svg>`;

/* Mission-Driven — an isometric target on a raised plate, struck off-centre. */
export const missionDrivenArt = svg(`
  <path ${lit} d="M 15 100 L 15 109 L 85 144 L 155 109 L 155 100 L 85 135 Z" />
  <path ${solid} d="M 85 65 L 155 100 L 85 135 L 15 100 Z" />
  <path ${open} d="M 33 100 A 52 26 0 1 0 137 100 A 52 26 0 1 0 33 100 Z" />
  <path ${open} d="M 50 100 A 35 17.5 0 1 0 120 100 A 35 17.5 0 1 0 50 100 Z" />
  <path ${open} d="M 67 100 A 18 9 0 1 0 103 100 A 18 9 0 1 0 67 100 Z" />
  <path ${lit} d="M 79 100 A 6 3 0 1 0 91 100 A 6 3 0 1 0 79 100 Z" />
  <path ${open} d="M 33 100 L 25 100 M 137 100 L 145 100 M 85 74 L 85 68 M 85 126 L 85 132" />
  <path ${open} d="M 130 42 L 88 95" />
  <path ${open} d="M 88 95 L 91 84 M 88 95 L 99 92" />
`);

/* Growth Focused — isometric columns stepping up, with the trend line above. */
export const growthFocusedArt = svg(`
  <path ${lit} d="M 13 112 L 13 120 L 85 146 L 157 120 L 157 112 L 85 138 Z" />
  <path ${solid} d="M 85 86 L 157 112 L 85 138 L 13 112 Z" />
  <path ${solid} d="M 29 92 L 29 112 L 45 120 L 45 100 Z M 61 92 L 61 112 L 45 120 L 45 100 Z" />
  <path ${lit} d="M 29 92 L 45 84 L 61 92 L 45 100 Z" />
  <path ${solid} d="M 69 78 L 69 112 L 85 120 L 85 86 Z M 101 78 L 101 112 L 85 120 L 85 86 Z" />
  <path ${lit} d="M 69 78 L 85 70 L 101 78 L 85 86 Z" />
  <path ${solid} d="M 109 62 L 109 112 L 125 120 L 125 70 Z M 141 62 L 141 112 L 125 120 L 125 70 Z" />
  <path ${lit} d="M 109 62 L 125 54 L 141 62 L 125 70 Z" />
  <path ${open} d="M 45 70 L 85 56 L 125 40 L 152 30" />
  <path ${open} d="M 152 30 L 142 30 M 152 30 L 152 40" />
  <path ${lit} d="M 41 70 L 45 68 L 49 70 L 45 72 Z M 81 56 L 85 54 L 89 56 L 85 58 Z M 121 40 L 125 38 L 129 40 L 125 42 Z" />
`);

/* Client-Centric — one hub, satellites on a shared orbit, everything wired in. */
export const clientCentricArt = svg(`
  <path ${lit} d="M 15 104 L 15 112 L 85 138 L 155 112 L 155 104 L 85 130 Z" />
  <path ${solid} d="M 85 78 L 155 104 L 85 130 L 15 104 Z" />
  <path ${open} d="M 37 104 A 48 18 0 1 0 133 104 A 48 18 0 1 0 37 104 Z" />
  <path ${open} d="M 37 104 L 85 96 M 133 104 L 85 96 M 85 86 L 85 96 M 85 122 L 85 96" />
  <path ${lit} d="M 29 104 A 8 4 0 1 0 45 104 A 8 4 0 1 0 29 104 Z M 125 104 A 8 4 0 1 0 141 104 A 8 4 0 1 0 125 104 Z M 77 86 A 8 4 0 1 0 93 86 A 8 4 0 1 0 77 86 Z M 77 122 A 8 4 0 1 0 93 122 A 8 4 0 1 0 77 122 Z" />
  <path ${solid} d="M 65 86 L 65 100 A 20 10 0 0 0 105 100 L 105 86 Z" />
  <path ${lit} d="M 65 86 A 20 10 0 1 0 105 86 A 20 10 0 1 0 65 86 Z" />
  <path ${open} d="M 15 104 L 7 104 M 155 104 L 163 104" />
`);
