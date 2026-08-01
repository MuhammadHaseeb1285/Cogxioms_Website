import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import useDrawOnView from '../../hooks/useDrawOnView';
import { hatchGlyph, primeLogicArt, totalClarityArt, fastCyclesArt } from './icons';
import './Approach.css';

const features = [
  {
    id: 'prime-logic',
    title: 'Prime Logic',
    text: 'We prioritize high-fidelity model alignment to ensure your agents deliver consistent results.',
    art: primeLogicArt,
  },
  {
    id: 'total-clarity',
    title: 'Total Clarity',
    text: 'Gain full observability into how your data is processed, indexed, and retrieved by your AI.',
    art: totalClarityArt,
  },
  {
    id: 'fast-cycles',
    title: 'Fast Cycles',
    text: 'Transition from prototype to production in weeks, not months, with our pre-built frameworks.',
    art: fastCyclesArt,
  },
];

const FeatureCell = ({ title, text, art, index }) => {
  const { ref, className } = useDrawOnView({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`longterm-cell ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <span className="longterm-icon" dangerouslySetInnerHTML={{ __html: art }} />
      <h3 className="longterm-cell-title">{title}</h3>
      <p className="longterm-cell-text">{text}</p>
    </motion.div>
  );
};

const Approach = () => {
  return (
    <section className="longterm-section">
      {/* Source was a 13 MB 1920x1205 VP9 at 9.7 Mbps. Re-encoded to 1280x804 H.264
          with the desaturation baked in — 506 KB, and no runtime filter needed. */}
      <div className="longterm-media">
        <video
          className="longterm-video"
          src="/videos/approach-eye.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <span className="longterm-media-texture" aria-hidden="true" />
      </div>

      <div className="longterm-panel">
        <span className="longterm-rule" aria-hidden="true" />

        <motion.div
          className="longterm-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="longterm-eyebrow">
            <span className="longterm-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
            Our Approach
          </span>
          <h2 className="longterm-heading">Built for the long term</h2>
          <p className="longterm-lede">
            We don&apos;t just ship code; we architect neural ecosystems. Our approach combines
            rigorous testing with rapid deployment cycles.
          </p>
        </motion.div>

        <div className="longterm-grid">
          {features.map((feature, index) => (
            <FeatureCell key={feature.id} index={index} {...feature} />
          ))}

          {/* The fourth cell the Framer layout leaves empty — the CTA lives here now. */}
          <div className="longterm-cell longterm-cell-cta">
            <Link to="/about" className="gradient-btn on-light">
              <FiArrowUpRight className="gradient-icon" />
              <span>Learn More About Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
