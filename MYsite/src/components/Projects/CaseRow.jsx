import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { FiChevronsRight } from 'react-icons/fi';

/*
 * One row, used by both the list section and the related block on a detail page.
 * The reference builds these as a single component with paired light/dark
 * variants rather than two components, and keeping that here is what guarantees
 * a title can never be laid out one way on the homepage and another way at the
 * bottom of a case study.
 *
 * Colour comes entirely from the --case-* tokens on the surrounding surface, so
 * `variant` only has to decide the one thing tokens cannot express: the invert
 * filter on the wordmark plate.
 */

/*
 * Lifted verbatim from the Armory reference build (component `framer-kCOt4`):
 * spring, stiffness 400, damping 40, mass 1. Slightly underdamped on purpose —
 * the small overshoot is what stops the reveal reading as a linear crossfade.
 * See ARMORY-REFERENCE.md §2 before retuning these.
 */
const HOVER_SPRING = { type: 'spring', stiffness: 400, damping: 40, mass: 1 };

const photoMotion = { rest: { opacity: 0 }, hover: { opacity: 1 } };
const scrimMotion = { rest: { opacity: 0 }, hover: { opacity: 0.06 } };
const chevronMotion = { rest: { x: 0 }, hover: { x: 4 } };

/*
 * The plate art is white. On a light row it is shown through invert(0.9) so it
 * reads as near-black, then returns to white on hover exactly as the photograph
 * arrives beneath it. On a dark row it is already the right colour, so the
 * filter is pinned and only the photo and scrim move — which is precisely how
 * the reference's own black variant behaves.
 */
const markMotion = {
  light: {
    rest: { filter: 'invert(0.9)', WebkitFilter: 'invert(0.9)' },
    hover: { filter: 'invert(0)', WebkitFilter: 'invert(0)' },
  },
  dark: {
    rest: { filter: 'invert(0)', WebkitFilter: 'invert(0)' },
    hover: { filter: 'invert(0)', WebkitFilter: 'invert(0)' },
  },
};

const CaseRow = ({ study, index = 0, variant = 'light' }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="case-row-wrap"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.06, ease: 'easeOut' }}
    >
      <motion.div initial="rest" animate="rest" whileHover="hover" whileFocus="hover">
        <Link to={`/projects/${study.slug}`} className="case-row">
          <div className="case-media">
            <motion.span
              className="case-wordmark"
              variants={markMotion[variant]}
              transition={HOVER_SPRING}
            >
              {study.name}
            </motion.span>

            {study.image && (
              <motion.img
                src={study.image}
                alt=""
                className="case-media-img"
                loading="lazy"
                variants={photoMotion}
                transition={HOVER_SPRING}
              />
            )}

            {/* 6% scrim in the opposing ink, so the revealed photo never fights
                the row copy. */}
            <motion.span
              className="case-media-scrim"
              aria-hidden="true"
              variants={scrimMotion}
              transition={HOVER_SPRING}
            />

            {/* Tiled grain, held static above both layers. */}
            <span className="case-media-grain" aria-hidden="true" />
          </div>

          <div className="case-year">//{study.year}</div>

          <div className="case-body">
            <h3 className="case-title">{study.name}</h3>
            <p className="case-summary">{study.summary}</p>
          </div>

          <motion.span
            className="case-chevron"
            aria-hidden="true"
            variants={reduceMotion ? undefined : chevronMotion}
            transition={HOVER_SPRING}
          >
            <FiChevronsRight />
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default CaseRow;
