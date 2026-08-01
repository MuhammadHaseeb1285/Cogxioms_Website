import { motion } from 'framer-motion';
import { hatchGlyph } from '../Approach/icons';
import DrawIcon from './AboutIcons';
import CountUp from '../Projects/CountUp';
import Testimonials from '../Testimonials/Testimonials';
import ApproachCard from './ApproachCard';
import approachCards from './approachData';
import './AboutDetail.css';

/*
 * The /about page, rebuilt to the same system as Services and the case studies.
 *
 * What it replaced was a different design language entirely: centred headings
 * with underline accents, floating bordered cards, gradient circle badges and a
 * boxed team panel — none of which appear anywhere else on the site. The rules
 * it now follows are the ones every other section already uses:
 *
 *   - 25/50/75 gridlines, with heading blocks starting on the 25% line
 *   - a mono eyebrow with the hatch glyph above every heading
 *   - full-bleed hairlines bracketing each heading band
 *   - edge-to-edge quarter grids with hairline dividers, not floating cards
 *   - one reveal: opacity/y, 0.55s easeOut, once
 *
 * Old class names are gone rather than restyled. They were generic enough
 * (.section-title, .stat-number, .value-card) to reach into other components
 * through global CSS wherever two of them mounted on the same page; the abt-
 * prefix closes that off.
 */

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut' },
};

const VALUES = [
  {
    icon: 'innovation',
    title: 'Innovation',
    body: 'We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.',
  },
  {
    icon: 'quality',
    title: 'Quality',
    body: 'Every project is crafted with attention to detail and commitment to excellence.',
  },
  {
    icon: 'passion',
    title: 'Passion',
    body: 'We are passionate about technology and dedicated to making a positive impact.',
  },
  {
    icon: 'excellence',
    title: 'Excellence',
    body: 'We strive for excellence in everything we do, from code quality to client relationships.',
  },
];

const PROCESS = [
  {
    icon: 'discovery',
    title: 'Discovery',
    body: 'We start by understanding your business goals, challenges, and vision for the project.',
  },
  {
    icon: 'strategy',
    title: 'Strategy',
    body: 'Our team develops a comprehensive strategy and technical roadmap for your solution.',
  },
  {
    icon: 'development',
    title: 'Development',
    body: 'We build your solution using modern technologies and best practices.',
  },
  {
    icon: 'launch',
    title: 'Launch',
    body: 'We deploy your solution and provide ongoing support to ensure success.',
  },
];

/* Four, not three — every other grid on this page divides into quarters on the
   25/50/75 gridlines, and a three-column row was the one block that did not line
   up with them.

   "Industries served" is counted from the distinct `meta.Industry` values in
   src/data/caseStudies.js: Retail & E-commerce, Automotive Parts, Fleet &
   Vehicle Trade, Healthcare AI, Market Intelligence, ERP Integration. It is the
   one figure here a visitor can check against the case studies page. */
const TEAM_STATS = [
  { value: '50+', label: 'Projects completed' },
  { value: '6', label: 'Industries served' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '24/7', label: 'Support available' },
];

const Gridlines = () => (
  <div className="abt-gridlines" aria-hidden="true">
    <span className="abt-gridline" />
    <span className="abt-gridline" />
    <span className="abt-gridline" />
  </div>
);

/* Heading band: full-bleed rules top and bottom, content starting on the 25%
   line so it sits above the second column of whatever grid follows. */
const BandHead = ({ eyebrow, title, lede }) => (
  <div className="abt-band">
    <motion.div className="abt-band-inner" {...reveal}>
      <span className="abt-eyebrow">
        <span className="abt-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
        {eyebrow}
      </span>
      <h2 className="abt-band-title">{title}</h2>
      {lede && <p className="abt-band-lede">{lede}</p>}
    </motion.div>
  </div>
);

const AboutDetail = () => (
  <section className="abt">
    <Gridlines />

    {/* --- Hero ---------------------------------------------------------- */}
    <div className="abt-band abt-band-hero">
      <motion.div
        className="abt-band-inner"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <span className="abt-eyebrow">
          <span className="abt-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
          About Cogxioms
        </span>
        <h1 className="abt-title">Systems that outlast the engagement</h1>
        <p className="abt-lede">
          We are a technology company building production software — integration, analytics
          and commerce systems that keep working long after the people who built them have
          moved on to the next thing.
        </p>
      </motion.div>
    </div>

    {/* --- Approach: already on the grid, kept as-is ---------------------- */}
    <BandHead
      eyebrow="Our Approach"
      title="How the work gets done"
      lede="Four principles that decide what we build and how we build it."
    />
    <div className="approach-grid">
      {approachCards.map((card, index) => (
        <ApproachCard key={card.id} index={index} {...card} />
      ))}
    </div>

    {/* --- Values --------------------------------------------------------- */}
    <BandHead
      eyebrow="Our Values"
      title="What we hold to"
      lede="Four commitments that show up in the code long before they show up in a pitch."
    />
    <div className="abt-quads">
      {VALUES.map((value, i) => (
        <motion.div className="abt-quad" key={value.title} {...reveal}>
          <span className="abt-quad-icon">
            <DrawIcon name={value.icon} delay={i * 0.05} />
          </span>
          <div className="abt-quad-body">
            <h3 className="abt-quad-title">{value.title}</h3>
            <p className="abt-quad-text">{value.body}</p>
          </div>
          <span className="abt-quad-index">//{String(i + 1).padStart(2, '0')}</span>
        </motion.div>
      ))}
    </div>

    {/* --- Process -------------------------------------------------------- */}
    <BandHead
      eyebrow="Our Process"
      title="Four steps, start to launch"
      lede="The same sequence on every engagement, so you always know which part we are in."
    />
    <div className="abt-quads">
      {PROCESS.map((step, i) => (
        <motion.div className="abt-quad" key={step.title} {...reveal}>
          <span className="abt-quad-icon">
            <DrawIcon name={step.icon} delay={i * 0.05} />
          </span>
          <div className="abt-quad-body">
            <h3 className="abt-quad-title">{step.title}</h3>
            <p className="abt-quad-text">{step.body}</p>
          </div>
          <span className="abt-quad-index">//{String(i + 1).padStart(2, '0')}</span>
        </motion.div>
      ))}
    </div>

    {/* --- Team ----------------------------------------------------------- */}
    <BandHead
      eyebrow="Our Team"
      title="Engineers, not resources"
      lede="Experienced developers, designers and strategists who combine technical depth with
        the judgement to know which problem is actually worth solving."
    />
    <motion.div className="abt-stats" {...reveal}>
      {TEAM_STATS.map((stat) => (
        <div className="abt-stat" key={stat.label}>
          {/* Same count-up as the case-study stat rows. */}
          <CountUp className="abt-stat-value" value={stat.value} />
          <span className="abt-stat-label">{stat.label}</span>
        </div>
      ))}
    </motion.div>

    <Testimonials />
  </section>
);

export default AboutDetail;
