import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiChevronsRight, FiLayers, FiActivity, FiTrendingUp, FiShield } from 'react-icons/fi';
import caseStudies, { getCaseStudy } from '../../data/caseStudies';
import { hatchGlyph } from '../Approach/icons';
import CaseRow from './CaseRow';
import CountUp from './CountUp';
import './Projects.css';

/*
 * Routed on slug rather than array index, so reordering the data cannot silently
 * repoint a shared link at a different project.
 *
 * Layout follows the reference case study (ARMORY-REFERENCE.md §3), and the two
 * things that define it are easy to lose:
 *
 *   1. The page is DARK. The light treatment belongs to the list section only.
 *   2. Everything below the stat row is a 75% / 25% split — content in the wide
 *      column, metadata in a rail beside it, one continuous hairline between.
 *      Not a centred article column.
 *
 * Galleries interleave through the prose at 2-up / 1-wide / 1-wide / 2-up, and
 * they fill the content column edge to edge while the text stays inset.
 */
const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

/* The reference gives each figure an outline glyph in a rounded tile. Our data
   carries no icon, so these stand in by position; set `icon` on a stat to
   override. */
const STAT_ICONS = [FiLayers, FiActivity, FiTrendingUp, FiShield];

/*
 * `rows` is an array of image arrays — one inner array per gallery row. A row of
 * one renders at the double-width ratio, a row of two or three splits into equal
 * cells. Rows inside a block sit flush against each other, with a single hairline
 * above the whole block, which is how the reference stacks a pair above a wide
 * single without a seam between them.
 */
const Gallery = ({ rows }) => {
  const usable = rows.filter((row) => row && row.length > 0);
  if (usable.length === 0) return null;

  return (
    <motion.div className="case-gallery-block" aria-hidden="true" {...reveal}>
      {usable.map((images) => (
        <div
          className={`case-gallery${images.length === 1 ? ' case-gallery-wide' : ''}`}
          key={images.join('|')}
        >
          {images.map((src) => (
            <div className="case-gallery-cell" key={src}>
              <img src={src} alt="" className="case-gallery-img" loading="lazy" />
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <section className="case-detail case-detail-missing">
        <h1>Case study not found</h1>
        <p>That project does not exist, or its link has changed.</p>
        <Link to="/projects" className="gradient-btn on-light">
          <FiArrowLeft className="gradient-icon" />
          <span>All projects</span>
        </Link>
      </section>
    );
  }

  const related = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);
  const g = study.gallery ?? [];

  return (
    <section className="case-detail">
      {/* Full-bleed photograph, grain over it, gradient dissolving the bottom
          edge into the page. The only centred block on the page. */}
      <div className="case-hero">
        {study.image && <img src={study.image} alt="" className="case-hero-img" />}
        <span className="case-hero-grain" aria-hidden="true" />
        <span className="case-hero-fade" aria-hidden="true" />

        <motion.div
          className="case-hero-inner"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Stands in for the reference's client logo. Ours are our own builds,
              so the discipline is the honest equivalent of a client mark. */}
          <span className="case-hero-mark">{study.category}</span>
          <h1 className="case-hero-title">{study.name}</h1>
          <p className="case-hero-lede">{study.summary}</p>
        </motion.div>
      </div>

      <Link to="/projects" className="case-back">
        <FiArrowLeft />
        <span>All projects</span>
      </Link>

      <motion.div className="case-stats" {...reveal}>
        {study.stats.map((stat, i) => {
          const Icon = stat.icon ?? STAT_ICONS[i % STAT_ICONS.length];
          return (
            <div className="case-stat" key={stat.label}>
              <span className="case-stat-icon" aria-hidden="true">
                <Icon />
              </span>
              <div>
                <CountUp className="case-stat-value" value={stat.value} />
                <span className="case-stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </motion.div>

      <div className="case-body-grid">
        <div className="case-body-main">
          <div className="case-inset">
            {/* Rendered only when real attribution exists — see the note in
                caseStudies.js. No placeholder quote stands in for a missing one. */}
            {study.testimonial && (
              <motion.figure className="case-quote" {...reveal}>
                <blockquote className="case-quote-text">
                  “{study.testimonial.quote}”
                </blockquote>
                <figcaption>
                  <span className="case-quote-name">{study.testimonial.name}</span>
                  {study.testimonial.role && (
                    <span className="case-quote-role">{study.testimonial.role}</span>
                  )}
                </figcaption>
              </motion.figure>
            )}

            <motion.p className="case-prose" {...reveal}>
              {study.challenge}
            </motion.p>
          </div>

          <Gallery rows={[g.slice(0, 2), g.slice(2, 3)]} />

          {/* Two columns of body copy, as the reference sets its solution
              passage. column-count balances one string across both. */}
          <div className="case-inset">
            <motion.p className="case-prose case-prose-split" {...reveal}>
              {study.solution}
            </motion.p>
          </div>

          <Gallery rows={[g.slice(3, 4)]} />

          <div className="case-inset">
            <motion.ul className="case-achievements" {...reveal}>
              {study.achievements.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Unattributed statement, distinct from the credited testimonial
                above — the reference sets both at the same size, which is what
                makes the page read as having two voices rather than one. */}
            {study.pullQuote && (
              <motion.p className="case-pull" {...reveal}>
                {study.pullQuote}
              </motion.p>
            )}

            {study.closing && (
              <motion.p className="case-prose" {...reveal}>
                {study.closing}
              </motion.p>
            )}

            <motion.section className="case-block" {...reveal}>
              <h2>Stack</h2>
              <div className="case-chips">
                {study.stack.map((tech) => (
                  <span className="case-chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>
          </div>

          <Gallery rows={[g.slice(4, 6)]} />
        </div>

        <aside className="case-rail">
          <dl className="case-meta">
            {Object.entries(study.meta).map(([key, value]) => (
              <div className="case-meta-item" key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section className="case-related">
        <div className="case-gridlines" aria-hidden="true">
          <span className="case-gridline" />
          <span className="case-gridline" />
          <span className="case-gridline" />
        </div>

        <motion.div className="case-related-head" {...reveal}>
          <span className="case-eyebrow">
            <span className="case-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
            Our Contributions
          </span>
          <h2 className="case-related-title">View more projects</h2>
          <p className="case-lede">
            Every build gets the same treatment: the operational problem it solved, the
            architecture chosen, and the decisions worth arguing about.
          </p>
        </motion.div>

        <div className="case-list">
          {related.map((item, index) => (
            <CaseRow key={item.slug} study={item} index={index} variant="dark" />
          ))}
        </div>

        <div className="case-related-cta">
          <Link to="/projects" className="gradient-btn on-light">
            <FiChevronsRight className="gradient-icon" />
            <span>All Projects</span>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default ProjectDetail;
