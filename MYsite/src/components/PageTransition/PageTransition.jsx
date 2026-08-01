import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './PageTransition.css';

/*
 * Route-change veil.
 *
 * This replaces the old ScrollToTop, which called window.scrollTo with
 * behavior:'smooth' on every pathname change. That was the visible bug behind
 * "clicking More Projects looks wrong": react-router swaps the route
 * synchronously, so the new page painted at whatever scroll offset you happened
 * to be at — halfway down, mid-section — and only then slid up to the top. You
 * watched the wrong part of the new page travel past.
 *
 * The fix is two things that have to happen in this order:
 *   1. Reset the scroll position *instantly*, not smoothly. There is nothing to
 *      animate between two different documents, and animating it is what
 *      produced the slide.
 *   2. Cover the swap with a panel that lifts away, so the frame where the new
 *      page appears at the top is hidden behind it.
 *
 * Keying the panel on pathname is what makes it replay: a new key remounts the
 * element, so initial -> animate runs again on every navigation. It also runs on
 * first load, which reads as a deliberate intro rather than a glitch.
 *
 * html { scroll-behavior: smooth } in App.css would otherwise win here, so the
 * per-call 'instant' is doing real work — do not drop it.
 */
const PageTransition = () => {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  if (reduceMotion) return null;

  return (
    <div className="page-veil-host" aria-hidden="true">
      <motion.div
        key={pathname}
        className="page-veil"
        initial={{ y: '0%' }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1], delay: 0.04 }}
      />
    </div>
  );
};

export default PageTransition;
