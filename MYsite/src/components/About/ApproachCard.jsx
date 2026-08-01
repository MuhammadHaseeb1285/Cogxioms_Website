import { motion } from 'framer-motion';
import useDrawOnView from '../../hooks/useDrawOnView';

/*
 * One approach card: dotted panel, isometric line art, title, mono blurb.
 *
 * The panel and its dot grid are plain CSS, so they paint with the card itself —
 * the art fades in over an already-filled panel rather than leaving a hole.
 *
 * The stroke-draw is driven entirely by CSS. Every path in the artwork carries
 * pathLength="1", which normalises its geometry, so a single `stroke-dasharray: 1`
 * rule draws paths of wildly different real lengths at the same rate. That
 * matters here: the art is injected with dangerouslySetInnerHTML, and React
 * replaces those children on re-render — so per-path values measured and written
 * from JS get silently wiped. Nothing is mutated inside the SVG.
 */
const ApproachCard = ({ title, text, art, artScale, index = 0 }) => {
  const { ref, className } = useDrawOnView({ threshold: 0.2 });

  return (
    <motion.article
      ref={ref}
      className={`approach-card ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
    >
      <div className="approach-visual">
        <span className="approach-visual-dots" aria-hidden="true" />
        <span className="approach-visual-sheen" aria-hidden="true" />
        <span
          className="approach-art"
          style={artScale ? { '--art-scale': artScale } : undefined}
          dangerouslySetInnerHTML={{ __html: art }}
        />
      </div>

      <div className="approach-body">
        <h3 className="approach-title">{title}</h3>
        <p className="approach-text">{text}</p>
      </div>
    </motion.article>
  );
};

export default ApproachCard;
