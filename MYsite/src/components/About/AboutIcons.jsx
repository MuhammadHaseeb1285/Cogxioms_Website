import { motion, useReducedMotion } from 'framer-motion';

/*
 * Line-art icons that draw themselves when they scroll into view.
 *
 * Stroke-drawn rather than filled, to sit with the existing line art in
 * About/icons/lineArt.js and the hatch glyphs — a set of solid glyphs here would
 * read as a different icon family bolted on.
 *
 * framer-motion's pathLength does the work: it normalises every path to 0-1
 * regardless of actual length, so a short path and a long one finish together
 * instead of the long one lagging. Paths within one icon are staggered slightly
 * so an icon assembles rather than materialising at once.
 *
 * Under prefers-reduced-motion the paths render complete, with no draw.
 */

const DRAW_EASE = [0.12, 0.23, 0.5, 1];
/* Fast enough that the icon is complete almost as soon as it is on screen — a
   long draw means people scroll past a half-finished line. */
const DRAW_MS = 0.45;
/* Held complete between passes. Short enough to read as a live loop, long
   enough that four icons retracing at once is not flicker. */
const HOLD = 1.8;

/* Module-local: exporting it alongside the component breaks fast refresh, and
   nothing outside this file needs the path data. */
const ICONS = {
  /* --- Values --- */
  innovation: ['M13 2 4 14h7l-1 8 9-12h-7l1-8z'],
  quality: ['M12 2.5 4.5 6v6c0 4.8 3.2 8.1 7.5 9.5 4.3-1.4 7.5-4.7 7.5-9.5V6L12 2.5z'],
  passion: [
    'M12 20.4S3.6 15 3.6 9.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 8.4 2c0 5.8-8.4 11.2-8.4 11.2z',
  ],
  excellence: ['M12 3.2a5.9 5.9 0 1 0 0 11.8 5.9 5.9 0 0 0 0-11.8z', 'M8.4 14.2 7 21.5l5-2.4 5 2.4-1.4-7.3'],

  /* --- Process --- */
  discovery: ['M10.8 3.2a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 0 0 0-15.2z', 'M16.4 16.4 21 21'],
  strategy: ['M3.5 18.5h4a3.5 3.5 0 0 0 3.5-3.5V9a3.5 3.5 0 0 1 3.5-3.5h6', 'M17.5 2.5 21 5.5l-3.5 3'],
  development: ['M9 6 3.5 12 9 18', 'M15 6l5.5 6L15 18'],
  launch: [
    'M12 2.4c3.4 3 4.9 6.4 4.9 9.8l-4.9 4-4.9-4c0-3.4 1.5-6.8 4.9-9.8z',
    'M9.2 15.6 7 21.4l5-2.1 5 2.1-2.2-5.8',
  ],
};

/*
 * `delay` staggers the icon against the card it sits in, so a row of four does
 * not draw in unison.
 */
const DrawIcon = ({ name, delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  const paths = ICONS[name];
  if (!paths) return null;

  return (
    <svg className="abt-icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          /*
           * Per-property transitions on purpose. pathLength loops with
           * repeatType 'reverse', so the line draws in, holds, retracts and
           * redraws — a continuous trace rather than a single reveal. opacity
           * gets its own non-repeating transition; sharing one would fade the
           * whole icon out on every reverse leg.
           */
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  pathLength: {
                    duration: DRAW_MS,
                    delay: delay + i * 0.07,
                    ease: DRAW_EASE,
                    repeat: Infinity,
                    repeatDelay: HOLD,
                    repeatType: 'reverse',
                  },
                  opacity: { duration: 0.18, delay: delay + i * 0.07 },
                }
          }
        />
      ))}
    </svg>
  );
};

export default DrawIcon;
