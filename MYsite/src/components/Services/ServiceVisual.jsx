import { motion, useReducedMotion } from 'framer-motion';
import { FiCheck, FiSearch } from 'react-icons/fi';

/*
 * Animated stand-ins for the service panels, replacing the stock illustrations
 * that used to sit here. The reference composites a small dark UI card over a
 * drifting monochrome background, so that is the language — but built out
 * further: a dot grid, a spotlight, corner registration marks, a slow scan
 * sweep, and a satellite chip breaking the card's edge so the composition has
 * some depth instead of one rectangle floating in the middle.
 *
 * Everything is DOM and SVG. No canvas, no images, nothing beyond the
 * framer-motion already in the bundle, so these stay crisp at any width and cost
 * nothing to download — which matters, because the 17 MB JPEG that used to sit
 * in this panel was stalling first paint on its own.
 *
 * Loops are slow and low-contrast on purpose. This is ambient texture beside a
 * paragraph of copy, not something to watch; anything faster competes with the
 * text. Under prefers-reduced-motion every loop drops and each mockup renders in
 * its completed state, which is the honest resting version.
 */

const STAGGER = 0.14;

/* One shared cycle so four different mockups feel like one system. */
const cycle = (still, delay = 0, duration = 0.55) =>
  still
    ? { duration: 0 }
    : { duration, delay, ease: [0.12, 0.23, 0.5, 1], repeat: Infinity, repeatDelay: 2.5, repeatType: 'reverse' };

/* Corner registration marks and a centre tick — the technical-drawing cue the
   rest of the site uses via its hatch glyphs and hairline grid. */
const StageMarks = () => (
  <svg className="svc-stage-marks" viewBox="0 0 200 110" preserveAspectRatio="none" aria-hidden="true">
    <path d="M4 14V4h10M186 4h10v10M196 96v10h-10M14 106H4V96" vectorEffect="non-scaling-stroke" />
    <path d="M100 3v6M100 101v6M3 55h6M191 55h6" vectorEffect="non-scaling-stroke" />
  </svg>
);

const MockCard = ({ title, headRight, children, footer, satellite }) => (
  <div className="svc-stack">
    <div className="svc-mock">
      <div className="svc-mock-head">
        <span className="svc-mock-title">{title}</span>
        {headRight}
      </div>
      <div className="svc-mock-body">{children}</div>
      <div className="svc-mock-foot">
        <span className="svc-mock-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="svc-mock-foot-right">
          {footer}
          <FiSearch />
        </span>
      </div>
    </div>
    {satellite && <div className="svc-satellite">{satellite}</div>}
  </div>
);

/* --- AI Automation: an agent run completing step by step ------------------ */

const AI_STEPS = [
  { name: 'Ingest', ms: '12ms' },
  { name: 'Anonymise', ms: '08ms' },
  { name: 'Infer', ms: '340ms' },
  { name: 'Return', ms: '06ms' },
];

const AiVisual = ({ still }) => (
  <MockCard
    title="Agent run"
    headRight={<span className="svc-mock-tag">live</span>}
    footer={<span className="svc-mock-tag">4/4</span>}
    satellite={
      <span className="svc-sat-chip">
        <FiCheck />
        No PII sent
      </span>
    }
  >
    <ul className="svc-steps">
      {AI_STEPS.map((step, i) => (
        <li className="svc-step" key={step.name}>
          <motion.span
            className="svc-step-dot"
            initial={still ? false : { backgroundColor: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0)' }}
            animate={{ backgroundColor: '#ffffff', color: '#060606' }}
            transition={cycle(still, 0.3 + i * STAGGER, 0.3)}
          >
            <FiCheck />
          </motion.span>
          <span className="svc-step-label">{step.name}</span>
          <motion.span
            className="svc-step-rule"
            initial={still ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={cycle(still, 0.3 + i * STAGGER)}
          />
          <span className="svc-step-ms">{step.ms}</span>
        </li>
      ))}
    </ul>
  </MockCard>
);

/* --- Custom Software: the five test layers going green ------------------- */

const TEST_LAYERS = [
  { name: 'unit', pct: 100 },
  { name: 'integration', pct: 100 },
  { name: 'security', pct: 100 },
  { name: 'end-to-end', pct: 92 },
  { name: 'load', pct: 78 },
];

const SoftwareVisual = ({ still }) => (
  <MockCard
    title="Test layers"
    headRight={<span className="svc-mock-tag">ci</span>}
    footer={<span className="svc-mock-tag is-solid">PASS</span>}
    satellite={
      <span className="svc-sat-chip">
        <span className="svc-sat-commits" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.i
              key={i}
              initial={still ? false : { opacity: 0.2 }}
              animate={{ opacity: i % 3 === 0 ? 1 : 0.45 }}
              transition={cycle(still, i * 0.08, 0.4)}
            />
          ))}
        </span>
        117 commits
      </span>
    }
  >
    <ul className="svc-bars">
      {TEST_LAYERS.map((layer, i) => (
        <li className="svc-bar" key={layer.name}>
          <span className="svc-bar-name">{layer.name}</span>
          <span className="svc-bar-track">
            <motion.span
              className="svc-bar-fill"
              initial={still ? false : { width: '0%' }}
              animate={{ width: `${layer.pct}%` }}
              transition={cycle(still, 0.18 + i * STAGGER, 0.7)}
            />
          </span>
          <span className="svc-bar-pct">{layer.pct}</span>
        </li>
      ))}
    </ul>
  </MockCard>
);

/* --- Data Intelligence: a snapshot query returning ------------------------ */

const BARS = [38, 62, 45, 80, 55, 92, 68, 74, 50];
/* Nine points across a 0-100 box, matching the bar heights so the trend line
   reads as the same dataset rather than decoration laid over it. */
const SPARK = BARS.map((h, i) => `${(i / (BARS.length - 1)) * 100},${100 - h}`).join(' ');

const DataVisual = ({ still }) => (
  <MockCard
    title="Snapshot"
    headRight={<span className="svc-mock-tag">hourly</span>}
    footer={<span className="svc-mock-tag">15 queries</span>}
    satellite={
      <span className="svc-sat-chip">
        p95 <strong>42ms</strong>
      </span>
    }
  >
    <div className="svc-chart" aria-hidden="true">
      <span className="svc-chart-grid" />
      <div className="svc-chart-bars">
        {BARS.map((h, i) => (
          <motion.span
            className="svc-chart-bar"
            key={i}
            style={{ height: `${h}%` }}
            initial={still ? false : { scaleY: 0.06, opacity: 0.4 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={cycle(still, i * 0.06, 0.5)}
          />
        ))}
      </div>
      <svg className="svc-chart-line" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.polyline
          points={SPARK}
          initial={still ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={cycle(still, 0.35, 1)}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
    <div className="svc-chart-foot">
      <span className="svc-mock-chip">2.3k SQL</span>
      <span className="svc-mock-chip">9 charts</span>
      <span className="svc-mock-chip is-solid">precomputed</span>
    </div>
  </MockCard>
);

/* --- Cloud Systems: regions reporting healthy ---------------------------- */

const REGIONS = ['eu-west', 'eu-cent', 'us-east', 'us-west'];

const CloudVisual = ({ still }) => (
  <MockCard
    title="Health checks"
    headRight={<span className="svc-mock-tag">bicep</span>}
    footer={<span className="svc-mock-tag">5/5</span>}
    satellite={
      <span className="svc-sat-chip">
        <motion.span
          className="svc-sat-ping"
          aria-hidden="true"
          initial={still ? false : { opacity: 0.3, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={still ? { duration: 0 } : { duration: 1.4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        13 migrations
      </span>
    }
  >
    <div className="svc-nodes">
      {REGIONS.map((region, i) => (
        <div className="svc-node" key={region}>
          <motion.span
            className="svc-node-pulse"
            initial={still ? false : { opacity: 0.22, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={still ? { duration: 0 } : { duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          <span className="svc-node-name">{region}</span>
          <span className="svc-node-ok">ok</span>
        </div>
      ))}
    </div>
    <div className="svc-meter">
      <span className="svc-meter-label">uptime</span>
      <span className="svc-meter-track">
        <motion.span
          className="svc-meter-fill"
          initial={still ? false : { width: '4%' }}
          animate={{ width: '99.9%' }}
          transition={cycle(still, 0.2, 1.1)}
        />
      </span>
      <span className="svc-meter-value">99.9%</span>
    </div>
  </MockCard>
);

const VISUALS = {
  ai: AiVisual,
  software: SoftwareVisual,
  data: DataVisual,
  cloud: CloudVisual,
};

const ServiceVisual = ({ variant }) => {
  const reduceMotion = useReducedMotion();
  const Visual = VISUALS[variant];
  if (!Visual) return null;

  return (
    <div className="svc-stage">
      {/* Same dot grid as .approach-visual-dots and .longterm-media-texture,
          at the same 11px pitch and masked so it fades out toward the edges
          rather than terminating as a swatch. */}
      <span className="svc-stage-dots" aria-hidden="true" />
      <span className={`svc-stage-glow${reduceMotion ? ' is-still' : ''}`} aria-hidden="true" />
      <StageMarks />
      <span className="svc-stage-grain" aria-hidden="true" />
      {!reduceMotion && <span className="svc-stage-scan" aria-hidden="true" />}
      <Visual still={reduceMotion} />
    </div>
  );
};

export default ServiceVisual;
