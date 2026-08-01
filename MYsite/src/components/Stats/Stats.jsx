import { motion } from 'framer-motion';
import { FiLayers, FiSmile, FiClock, FiUsers } from 'react-icons/fi';
import { hatchGlyph } from '../Approach/icons';
import CountUp from '../Projects/CountUp';
import './Stats.css';

/*
 * Statistics, on the same system as every other band: a heading block starting
 * on the 25% gridline between full-bleed rules, then four equal quarters divided
 * by hairlines.
 *
 * Figures count up from zero on scroll-in, using the same CountUp the case-study
 * stat rows use, so a number behaves the same way wherever it appears.
 *
 * Class names are sts- prefixed. The old ones (.stats-section, .stats-grid,
 * .stat-tile) were generic enough to collide with any other stat block mounted
 * on the same page through global CSS.
 */

const stats = [
  { icon: FiLayers, number: '50+', label: 'Projects delivered' },
  { icon: FiSmile, number: '100%', label: 'Client satisfaction' },
  { icon: FiClock, number: '24/7', label: 'Support available' },
  { icon: FiUsers, number: '6+', label: 'Team specialties' },
];

const Stats = () => (
  <section className="sts-section">
    <div className="sts-gridlines" aria-hidden="true">
      <span className="sts-gridline" />
      <span className="sts-gridline" />
      <span className="sts-gridline" />
    </div>

    <div className="sts-head">
      <motion.div
        className="sts-head-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="sts-eyebrow">
          <span className="sts-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
          Statistics
        </span>
        <h2 className="sts-heading">Quantifiable impact, every project</h2>
      </motion.div>
    </div>

    <div className="sts-grid">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            className="sts-tile"
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
          >
            <span className="sts-tile-icon" aria-hidden="true">
              <Icon />
            </span>
            <div className="sts-tile-foot">
              <CountUp className="sts-tile-number" value={stat.number} />
              <span className="sts-tile-label">{stat.label}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default Stats;
