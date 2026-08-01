import { motion, useReducedMotion } from 'framer-motion';
import { hatchGlyph } from '../Approach/icons';
import './Team.css';

/*
 * The team, on the site's grid: a heading band, then four quarters — a caption
 * cell followed by the three people, each landing on the 25/50/75 lines.
 *
 * It replaced a three-card carousel with prev/next arrows. Three people do not
 * need paging; the carousel hid two thirds of the team behind a control and
 * introduced a fourth interaction pattern to a site that already has enough.
 *
 * The portrait uses the same treatment as the case-study rows — desaturated at
 * rest, resolving to full colour on hover under the same spring — so a face
 * behaves like every other image on the site.
 */

const HOVER_SPRING = { type: 'spring', stiffness: 400, damping: 40, mass: 1 };

/*
 * Cache-buster for the portraits.
 *
 * These live in public/, so Vite copies them through without a content hash —
 * the URL stays /Images/Haseeb.webp no matter what the file contains. Replace a
 * photo and every browser that has seen the old one keeps showing it, which is
 * exactly what happened on the last swap.
 *
 * Bump this whenever you replace a portrait and the new one appears immediately.
 */
const PHOTO_V = 2;
const photo = (file) => `${file}?v=${PHOTO_V}`;

/*
 * Display order is Haseeb, Mubasher, Hassan — set here rather than by sorting,
 * so it is the one place to change it.
 *
 * Roles map onto the four services, and skills are drawn from the stacks that
 * actually appear in src/data/caseStudies.js rather than a generic list, so a
 * visitor who reads a case study sees the same technologies named here.
 *
 * !! CONFIRM THESE !! The role titles and skill sets are my reading of who does
 * what, inferred from the services and the case-study stacks. Nobody told me how
 * these three actually divide the work — correct anything that is wrong.
 */
const teamMembers = [
  {
    id: 2,
    name: 'Haseeb Arif',
    role: 'Experience Architect',
    image: photo('/Images/Haseeb.webp'),
    bio: 'Turns the systems into something people can actually operate, from interface down to integration.',
    skills: ['React', 'Next.js', 'TypeScript', 'UX Strategy'],
  },
  {
    id: 3,
    name: 'Mian Mubasher',
    role: 'AI & Data Engineer',
    image: photo('/Images/MianMuhammad.webp'),
    bio: 'Works the data and model side, from snapshot pipelines to AI that stays inside a compliance boundary.',
    skills: ['Python', 'Claude API', 'Azure', 'SQL'],
  },
  {
    id: 1,
    name: 'Hassan Ali',
    role: 'Full-Stack Engineer',
    image: photo('/Images/Hassan.webp'),
    bio: 'Builds the backends our systems run on — Clean Architecture, CQRS, and the tests that keep them honest.',
    skills: ['.NET', 'Blazor', 'EF Core', 'PostgreSQL'],
  },
];

const photoMotion = { rest: { filter: 'grayscale(1)' }, hover: { filter: 'grayscale(0)' } };
const scrimMotion = { rest: { opacity: 0.18 }, hover: { opacity: 0 } };

const Member = ({ member, index, still }) => (
  <motion.article
    className="tm-cell"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
  >
    <motion.div
      className="tm-photo"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
    >
      <motion.img
        src={member.image}
        alt={member.name}
        className="tm-photo-img"
        loading="lazy"
        variants={still ? undefined : photoMotion}
        transition={HOVER_SPRING}
      />
      <motion.span
        className="tm-photo-scrim"
        aria-hidden="true"
        variants={still ? undefined : scrimMotion}
        transition={HOVER_SPRING}
      />
      <span className="tm-photo-grain" aria-hidden="true" />
      <span className="tm-photo-index" aria-hidden="true">
        //{String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>

    <div className="tm-body">
      <h3 className="tm-name">{member.name}</h3>
      <span className="tm-role">{member.role}</span>
      <p className="tm-bio">{member.bio}</p>
      <ul className="tm-skills">
        {member.skills.map((skill) => (
          <li className="tm-skill" key={skill}>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  </motion.article>
);

const Team = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="tm-section">
      <div className="tm-gridlines" aria-hidden="true">
        <span className="tm-gridline" />
        <span className="tm-gridline" />
        <span className="tm-gridline" />
      </div>

      <div className="tm-head">
        <motion.div
          className="tm-head-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="tm-eyebrow">
            <span className="tm-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
            Our Team
          </span>
          <h2 className="tm-heading">The people who build it</h2>
          <p className="tm-lede">
            Small enough that the person who designed your system is the person who writes it.
          </p>
        </motion.div>
      </div>

      {/* Caption cell first, then one member per remaining quarter. */}
      <div className="tm-row">
        {/* Label top, count bottom — the quarter is as tall as a portrait cell,
            so anchoring content to both ends makes the space read as composed
            rather than as a gap. Same device as the stat tiles. */}
        <div className="tm-caption">
          <span className="tm-caption-label">Engineering</span>
          <span className="tm-caption-foot">
            <span className="tm-caption-count">
              {String(teamMembers.length).padStart(2, '0')}
            </span>
            <span className="tm-caption-note">
              Designers and engineers, not account managers.
            </span>
          </span>
        </div>

        {teamMembers.map((member, i) => (
          <Member key={member.id} member={member} index={i} still={reduceMotion} />
        ))}
      </div>
    </section>
  );
};

export default Team;
