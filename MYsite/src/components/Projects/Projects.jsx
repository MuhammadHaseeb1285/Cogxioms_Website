import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronsRight } from 'react-icons/fi';
import caseStudies from '../../data/caseStudies';
import { hatchGlyph } from '../Approach/icons';
import CaseRow from './CaseRow';
import './Projects.css';

/*
 * Case-study index. The homepage shows a trimmed set with a link through to the
 * full list; /projects shows everything. Both render CaseRow, which is the same
 * component the related block on a detail page uses.
 */
const HOMEPAGE_COUNT = 3;

const Projects = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const visible = isHomePage ? caseStudies.slice(0, HOMEPAGE_COUNT) : caseStudies;

  return (
    <section className="case-section">
      {/* Same device as .approach-gridlines and .scroll-reveal-grid: three rules
          at 25/50/75 via space-evenly, identical 0.1px weight. The row grid
          aligns to these quarters. */}
      <div className="case-gridlines" aria-hidden="true">
        <span className="case-gridline" />
        <span className="case-gridline" />
        <span className="case-gridline" />
      </div>

      <motion.div
        className="case-intro"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="case-eyebrow">
          <span className="case-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
          Our Contributions
        </span>
        <h2 className="case-heading">
          {isHomePage ? 'Systems built to hold up' : 'Every system we have shipped'}
        </h2>
        <p className="case-lede">
          Production software across integration, analytics and commerce — each one solving a
          specific operational problem, with the engineering decisions written down.
        </p>
      </motion.div>

      <div className="case-list">
        {visible.map((study, index) => (
          <CaseRow key={study.slug} study={study} index={index} variant="light" />
        ))}
      </div>

      {isHomePage && (
        <div className="case-footer">
          <Link to="/projects" className="gradient-btn on-light">
            <FiChevronsRight className="gradient-icon" />
            <span>More Projects</span>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Projects;
