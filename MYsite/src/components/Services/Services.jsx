import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { FiCpu, FiCode, FiBarChart2, FiCloud, FiCheck } from 'react-icons/fi';
import { hatchGlyph } from '../Approach/icons';
import ServiceVisual from './ServiceVisual';
import './Services.css';

/*
 * Services, as a tab strip over a split panel — four equal tabs sitting on the
 * same 25/50/75 gridlines the rest of the page uses, and a 50/50 media/copy
 * panel beneath them. Selecting a tab swaps the panel; nothing scrolls.
 *
 * This replaced a six-item sidebar-and-accordion. Four is the count the layout
 * is built around: the tab strip divides the full width into quarters, so a
 * fifth service would either break the gridline alignment or force the labels
 * to wrap. Adding one means rethinking the strip, not just pushing an entry
 * onto the array.
 *
 * Copy is drawn from the work in src/data/caseStudies.js — every claim below
 * restates something an actual project already demonstrates, so the services
 * page and the case studies cannot drift apart.
 */
const services = [
  {
    key: 'ai',
    label: 'AI Automation',
    icon: FiCpu,
    headline:
      'AI that works inside your compliance boundary. Anonymised values are what reach the model; identities stay in a store the model never sees.',
    note: 'Protected health data isolated across three separate stores.',
    badge: 'PHI Isolation',
  },
  {
    key: 'software',
    label: 'Custom Software',
    icon: FiCode,
    headline:
      'Production systems built on Clean Architecture and CQRS, with domain, application and infrastructure kept apart from the first commit rather than separated later.',
    note: 'Five test layers — unit, integration, security, end-to-end and load — all running in CI.',
    badge: 'Clean Architecture',
  },
  {
    key: 'data',
    label: 'Data Intelligence',
    icon: FiBarChart2,
    headline:
      'Aggregations precomputed on a schedule into snapshot tables, so a page load reads finished numbers instead of triggering the expensive work itself.',
    note: 'Fifteen analytical queries across roughly 2,300 lines of SQL.',
    badge: 'Snapshot Cache',
  },
  {
    key: 'cloud',
    label: 'Cloud Systems',
    icon: FiCloud,
    headline:
      'Azure-native and container-first: Functions workers for background analysis, infrastructure defined in Bicep, and health checks that keep deployments predictable.',
    note: 'Five health checks and thirteen tracked migrations.',
    badge: 'Infra as Code',
  },
];

/* Slow enough to read the headline before it moves on. */
const AUTO_ADVANCE_MS = 5000;
/* How long a manual pick holds the rotation before it picks back up. Long
   enough that clicking a tab feels respected, short enough that the section
   does not simply stop forever after one click. */
const RESUME_AFTER_MS = 15000;

const Services = () => {
  const [active, setActive] = useState(0);
  const [pauseToken, setPauseToken] = useState(0);
  const sectionRef = useRef(null);
  /* 'some' — any part of the section on screen is enough. The section is taller
     than a lot of viewports, and a percentage threshold means the rotation can
     silently never start on shorter screens, which is a much worse failure than
     occasionally rotating while only the tab strip is visible. */
  const inView = useInView(sectionRef, { amount: 'some' });
  const reduceMotion = useReducedMotion();
  const current = services[active];

  /* A manual pick pauses the rotation rather than ending it — see
     RESUME_AFTER_MS. Hover does not pause: the panel is meant to keep moving. */
  const paused = pauseToken > 0;

  useEffect(() => {
    if (!paused) return undefined;
    const id = setTimeout(() => setPauseToken(0), RESUME_AFTER_MS);
    return () => clearTimeout(id);
  }, [paused, pauseToken]);

  /* Rotation runs whenever the section is on screen and nothing is holding it.
     prefers-reduced-motion stops it outright — unattended movement is exactly
     what that setting exists to suppress. */
  const autoplay = !reduceMotion && !paused && inView;

  useEffect(() => {
    if (!autoplay) return undefined;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % services.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [autoplay]);

  const pick = (i) => {
    setActive(i);
    setPauseToken((t) => t + 1);
  };

  /* Roving arrow-key selection across the strip, which is what a tablist is
     expected to do and what the pointer-only original could not. */
  const onKeyDown = (event) => {
    const last = services.length - 1;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      pick(active === last ? 0 : active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      pick(active === 0 ? last : active - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      pick(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      pick(last);
    }
  };

  return (
    <section className="svc-section" ref={sectionRef}>
      <div className="svc-gridlines" aria-hidden="true">
        <span className="svc-gridline" />
        <span className="svc-gridline" />
        <span className="svc-gridline" />
      </div>

      {/* Full-bleed band so the rules above and below the heading run the whole
          width — .svc-intro itself starts at the 25% line, so bordering it
          directly would only rule the right three quarters. */}
      <div className="svc-head">
        <motion.div
          className="svc-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="svc-eyebrow">
            <span className="svc-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
            What We Do
          </span>
          <h2 className="svc-heading">Built to run without you</h2>
          <p className="svc-lede">
            Four disciplines, applied to the same problem: systems that keep working once the
            people who built them have moved on to the next thing.
          </p>
        </motion.div>
      </div>

      <div className="svc-tabs" role="tablist" aria-label="Services" onKeyDown={onKeyDown}>
        {services.map((service, i) => {
          const Icon = service.icon;
          const isActive = i === active;
          return (
            <button
              key={service.key}
              type="button"
              role="tab"
              id={`svc-tab-${service.key}`}
              aria-selected={isActive}
              aria-controls={`svc-panel-${service.key}`}
              tabIndex={isActive ? 0 : -1}
              className={`svc-tab${isActive ? ' is-active' : ''}`}
              onClick={() => pick(i)}
            >
              {/* Same tiled grain as the case-study rows, at the reference's 0.13. */}
              <span className="svc-tab-grain" aria-hidden="true" />
              <Icon className="svc-tab-icon" aria-hidden="true" />
              <span className="svc-tab-label">{service.label}</span>

              {/* Countdown to the next auto-advance. Without it the panel just
                  changes on its own, which reads as a glitch rather than a
                  rotation — and it disappears the moment autoplay stops. */}
              {isActive && autoplay && (
                <motion.span
                  key={active}
                  className="svc-tab-progress"
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="svc-panel">
        {/*
         * NOT mode="wait". With it, the outgoing panel unmounts before the
         * incoming one mounts, so for ~0.2s this container has no content and
         * collapses to zero height. The page shortens, the browser corrects the
         * scroll position, and everything above — the tab strip you just clicked
         * — visibly jumps. Both panels now occupy the same grid cell instead
         * (see .svc-panel / .svc-panel-inner), so the height never drops.
         *
         * The exit is quick and the enter is held back slightly so the two
         * barely overlap; a long crossfade between two different mockups smears.
         */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current.key}
            id={`svc-panel-${current.key}`}
            role="tabpanel"
            aria-labelledby={`svc-tab-${current.key}`}
            className="svc-panel-inner"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, delay: 0.12, ease: [0.12, 0.23, 0.5, 1] },
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } }
            }
          >
            <ServiceVisual variant={current.key} />

            <div className="svc-copy">
              <p className="svc-headline">{current.headline}</p>

              <div className="svc-foot">
                <p className="svc-note">{current.note}</p>

                {/* Check disc, connector, pill — the reference's own end-cap for
                    the panel, and the one flash of inverted colour down here. */}
                <div className="svc-badge-row">
                  <span className="svc-badge-disc" aria-hidden="true">
                    <FiCheck />
                  </span>
                  <span className="svc-badge-link" aria-hidden="true" />
                  <span className="svc-badge">{current.badge}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
