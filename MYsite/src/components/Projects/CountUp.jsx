import { useEffect, useMemo, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useReducedMotion, animate } from 'framer-motion';

/*
 * Stat figures that run up from zero when they scroll into view.
 *
 * The reference build ships literal zeroes in its server-rendered markup and
 * animates to the target in JS, which is what makes the numbers land as the
 * section arrives rather than being already spent by the time you reach them.
 * We do the same: first paint is always the zero state.
 *
 * Values in caseStudies.js are strings, not numbers — '18k', '8.2k', '2.3k',
 * '200'. Only the numeric run is animated; any prefix and unit suffix are held
 * fixed either side of it, so '8.2k' counts through 8.2 and keeps its 'k'.
 * Anything that does not parse is rendered verbatim, which is the safe outcome
 * for a value like 'N/A' being added later.
 */
const parseStat = (raw) => {
  const match = String(raw).trim().match(/^(\D*?)(-?\d[\d,]*\.?\d*)(.*)$/);
  if (!match) return null;

  const numeric = Number(match[2].replace(/,/g, ''));
  if (!Number.isFinite(numeric)) return null;

  return {
    prefix: match[1],
    target: numeric,
    suffix: match[3],
    decimals: (match[2].split('.')[1] || '').length,
  };
};

const CountUp = ({ value, duration = 1.2, className }) => {
  /* Memoised so the object identity is stable across renders — the animation
     effect depends on it, and a fresh object every render would restart the
     count mid-flight. */
  const parsed = useMemo(() => parseStat(value), [value]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const count = useMotionValue(0);
  /* Formatting through a MotionValue keeps the per-frame updates off React —
     the text node is written directly, so four counters running at once do not
     trigger sixty re-renders a second between them. */
  const text = useTransform(count, (latest) =>
    parsed ? `${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}` : '',
  );

  useEffect(() => {
    if (!parsed || !inView) return undefined;

    if (reduceMotion) {
      count.set(parsed.target);
      return undefined;
    }

    /* cubic-bezier(.12,.23,.5,1) — the reference's own easing curve. */
    const controls = animate(count, parsed.target, {
      duration,
      ease: [0.12, 0.23, 0.5, 1],
    });

    return () => controls.stop();
  }, [inView, reduceMotion, parsed, count, duration]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
};

export default CountUp;
