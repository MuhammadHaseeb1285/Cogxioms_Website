import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGithub, FaMicrosoft } from 'react-icons/fa';
import {
  SiTensorflow,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiFlutter,
  SiGraphql,
  SiAnthropic,
  SiOpenai,
  SiPytorch,
  SiPandas,
  SiDotnet,
  SiBlazor,
  SiNextdotjs,
  SiTypescript,
  SiVite,
  SiStripe,
  SiRedis,
  SiElasticsearch,
  SiCloudflare,
  SiKubernetes,
  SiTerraform,
  SiGithubactions,
  SiGooglecloud,
  SiApachekafka,
  SiSnowflake,
} from 'react-icons/si';
import { hatchGlyph } from '../Approach/icons';
import './Integrations.css';

/*
 * One flat grid of marks, four across.
 *
 * One flat grid of marks, eight across.
 *
 * The count is deliberately a multiple of eight — 32, so it fills four complete
 * rows with no ragged last line. Add or remove logos in eights, or the grid ends
 * mid-row. (It also divides cleanly at the 4-across and 2-across breakpoints.)
 *
 * Coverage is drawn from the stacks actually listed in
 * src/data/caseStudies.js — .NET, Blazor, PostgreSQL, Redis, Stripe, Next.js,
 * Docker, AWS, Cloudflare, Azure, Claude — so this section and the case studies
 * corroborate each other instead of making separate claims. Ordered loosely by
 * discipline (AI, application, data, infrastructure) so related marks sit near
 * each other without needing headings to say so.
 */
const integrations = [
  /* AI */
  { name: 'Claude', icon: <SiAnthropic /> },
  { name: 'OpenAI', icon: <SiOpenai /> },
  { name: 'TensorFlow', icon: <SiTensorflow /> },
  { name: 'PyTorch', icon: <SiPytorch /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'pandas', icon: <SiPandas /> },
  /* Application */
  { name: '.NET', icon: <SiDotnet /> },
  { name: 'Blazor', icon: <SiBlazor /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Vite', icon: <SiVite /> },
  { name: 'Flutter', icon: <SiFlutter /> },
  { name: 'Stripe', icon: <SiStripe /> },
  /* Data */
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Elasticsearch', icon: <SiElasticsearch /> },
  { name: 'GraphQL', icon: <SiGraphql /> },
  { name: 'Snowflake', icon: <SiSnowflake /> },
  { name: 'Apache Kafka', icon: <SiApachekafka /> },
  /* Infrastructure */
  /* react-icons carries no Azure glyph in this version — the Microsoft mark is
     the closest honest stand-in. */
  { name: 'Azure', icon: <FaMicrosoft /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Cloudflare', icon: <SiCloudflare /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Kubernetes', icon: <SiKubernetes /> },
  { name: 'Terraform', icon: <SiTerraform /> },
  { name: 'GitHub', icon: <FaGithub /> },
  { name: 'GitHub Actions', icon: <SiGithubactions /> },
  { name: 'Google Cloud', icon: <SiGooglecloud /> },
  { name: 'Firebase', icon: <SiFirebase /> },
];

const Integrations = () => (
  <section className="itg-section">
    <div className="itg-gridlines" aria-hidden="true">
      <span className="itg-gridline" />
      <span className="itg-gridline" />
      <span className="itg-gridline" />
    </div>

    <div className="itg-head">
      <motion.div
        className="itg-head-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="itg-eyebrow">
          <span className="itg-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
          Integrations
        </span>
        <h2 className="itg-heading">Cogxioms bridges your data and tools</h2>
        <p className="itg-lede">
          We build on the stacks your team already trusts — no rip-and-replace required.
        </p>
      </motion.div>
    </div>

    {/* Marks only — no captions, no pills, no group headings. Four across, so
        the cell edges land on the same 25/50/75 lines as the gridlines behind
        them. The name is kept for screen readers and as a tooltip, since a bare
        logo carries no accessible name. */}
    <motion.ul
      className="itg-cells"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ visible: { transition: { staggerChildren: 0.025 } } }}
    >
      {integrations.map((item) => (
        <motion.li
          className="itg-cell"
          key={item.name}
          title={item.name}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
          }}
        >
          <span className="itg-cell-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="itg-sr">{item.name}</span>
        </motion.li>
      ))}
    </motion.ul>
  </section>
);

export default Integrations;
