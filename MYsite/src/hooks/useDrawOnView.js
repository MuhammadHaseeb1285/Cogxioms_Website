import { useEffect, useRef, useState } from 'react';

/*
 * Drives the CSS stroke-draw used by the line-art illustrations.
 *
 * Returns a ref to attach to the element carrying the state classes, plus the
 * class string itself:
 *
 *   is-revealed  mount has happened, so the art can fade in
 *   is-armed     motion is allowed, so paths may start fully offset (invisible)
 *   is-drawing   the element has entered the viewport, so run the draw
 *
 * `is-armed` is what gates the hidden starting state. Without JS, or under
 * prefers-reduced-motion, it never lands and the art shows fully drawn rather
 * than invisible. The observer only governs the draw — the surrounding entrance
 * animation stays on framer-motion, so a draw can never start off-screen.
 */
const useDrawOnView = ({ threshold = 0.2 } = {}) => {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setRevealed(true);

    if (reduceMotion || !node || typeof IntersectionObserver === 'undefined') {
      setDraw(true);
      return undefined;
    }

    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setDraw(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  const className = [
    revealed ? 'is-revealed' : '',
    armed ? 'is-armed' : '',
    armed && draw ? 'is-drawing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return { ref, className, armed, revealed, draw };
};

export default useDrawOnView;
