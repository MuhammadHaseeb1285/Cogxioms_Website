import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiX, FiMap, FiClock, FiLayers, FiShield, FiCpu, FiCloud,
  FiLifeBuoy, FiActivity, FiTag, FiFileText, FiChevronsRight,
  FiUsers, FiKey, FiDollarSign, FiRepeat, FiCheckSquare,
  FiTrendingUp, FiBookOpen, FiRefreshCw,
} from 'react-icons/fi';
import { hatchGlyph } from '../Approach/icons';
import './FAQ.css';

/*
 * FAQ as a split panel: the heading and CTA hold the left half, the category
 * tabs and accordion the right. It replaced a stacked list where the category
 * pills sat above the questions — that worked, but it left the whole left half
 * of the section empty and gave the questions nowhere to breathe.
 *
 * Light surface on a dark site, the same inversion the case-study list and
 * testimonials use.
 *
 * Each category needs at least a couple of entries or a tab opens onto a single
 * row and reads as broken. The additions below are drawn from what the case
 * studies in src/data/caseStudies.js actually demonstrate.
 */

const categories = ['Process', 'Pricing', 'Tech', 'Support'];

const faqs = [
  {
    category: 'Process',
    icon: FiMap,
    question: 'What does your project process look like?',
    answer:
      'We start with a discovery call to understand your goals, then move through strategy, development, and launch — with regular check-ins so you always know where things stand.',
  },
  {
    category: 'Process',
    icon: FiClock,
    question: 'How long does a typical project take?',
    answer:
      "It depends on scope, but most engagements run from a few weeks for a focused feature to a few months for a full platform build. We'll give you a concrete timeline after the discovery call.",
  },
  {
    category: 'Process',
    icon: FiLayers,
    question: 'How do you keep a build from drifting?',
    answer:
      'Short increments and working software at the end of each one. Every project ships behind tests that run in CI, so a change that breaks something earlier is caught before it reaches you rather than at handover.',
  },
  {
    category: 'Process',
    icon: FiUsers,
    question: 'Who will I actually be working with?',
    answer:
      'The people who build it. We are small enough that the person who designs your system is the person who writes it — there is no layer of account managers between you and the work.',
  },
  {
    category: 'Process',
    icon: FiKey,
    question: 'What do you need from us to start?',
    answer:
      'Access to the systems we are integrating with, and someone who can answer domain questions. Most delays on a project come from waiting on credentials, not from writing code.',
  },
  {
    category: 'Pricing',
    icon: FiTag,
    question: 'How is pricing structured?',
    answer:
      'We scope each project individually based on complexity and timeline, and share a clear estimate before any work begins. No hidden fees, no surprise invoices.',
  },
  {
    category: 'Pricing',
    icon: FiFileText,
    question: 'What happens if the scope changes?',
    answer:
      'We re-estimate the affected part and tell you before doing the work. Changes are normal on a real build; discovering them on the final invoice is not.',
  },
  {
    category: 'Pricing',
    icon: FiDollarSign,
    question: 'Do you work fixed-price or time-and-materials?',
    answer:
      'Both. A fixed price suits a well-defined build with a clear finish line; time-and-materials suits ongoing work where the scope is expected to move.',
  },
  {
    category: 'Pricing',
    icon: FiCheckSquare,
    question: 'What is included in the estimate?',
    answer:
      'Design, build, tests and deployment. Test coverage is not a line item you can decline — it is how the system keeps working after we hand it over.',
  },
  {
    category: 'Pricing',
    icon: FiClock,
    question: 'Is there a minimum engagement?',
    answer:
      'No formal minimum, but below roughly two weeks the discovery overhead starts to outweigh the work itself, and we will usually say so rather than take it on.',
  },
  {
    category: 'Tech',
    icon: FiCpu,
    question: 'What technologies do you work with?',
    answer:
      'Mostly .NET and PostgreSQL on the backend, React or Blazor on the front, with AI work running against hosted models. Cloud sits on Azure, AWS or Cloudflare depending on the project — chosen to fit your work, not the other way around.',
  },
  {
    category: 'Tech',
    icon: FiLayers,
    question: 'How do you structure a codebase?',
    answer:
      'Clean Architecture with CQRS on anything substantial — domain, application and infrastructure kept apart from the first commit rather than separated later, when separating them has become expensive.',
  },
  {
    category: 'Tech',
    icon: FiShield,
    question: 'How is sensitive data handled?',
    answer:
      'It stays inside its boundary. On our health-tech work, protected information sits in its own store and only anonymised values ever reach a model — the model never receives an identity.',
  },
  {
    category: 'Tech',
    icon: FiRepeat,
    question: 'Can you work with our existing codebase?',
    answer:
      'Yes — most of our work is integration. Marketplace syncs, ERP writes and data pipelines that sit alongside systems already running, rather than replacing them.',
  },
  {
    category: 'Tech',
    icon: FiTrendingUp,
    question: 'How do you handle scale?',
    answer:
      'By moving expensive work off the request path. On our analytics work, aggregations precompute on a schedule into snapshot tables, so a page load reads finished numbers instead of triggering the work itself.',
  },
  {
    category: 'Support',
    icon: FiLifeBuoy,
    question: 'Do you offer support after launch?',
    answer:
      'Yes — every engagement includes a support window after launch, and we offer ongoing maintenance plans for teams that want continued updates and monitoring.',
  },
  {
    category: 'Support',
    icon: FiActivity,
    question: 'What happens if something breaks at 2am?',
    answer:
      'Deployments ship with health checks and tracked migrations, so a failure surfaces as an alert rather than a phone call from a customer. Maintenance plans include an agreed response window.',
  },
  {
    category: 'Support',
    icon: FiCloud,
    question: 'Can we take the system in-house later?',
    answer:
      'Yes. Infrastructure is defined as code and the repository is yours, so another team can pick it up without reverse-engineering a deployment nobody wrote down.',
  },
  {
    category: 'Support',
    icon: FiBookOpen,
    question: 'Do you hand over documentation?',
    answer:
      'Architecture decisions, deployment steps and tracked migrations — kept in the repository next to the code rather than in a document that goes stale the week after handover.',
  },
  {
    category: 'Support',
    icon: FiRefreshCw,
    question: 'Can you take over a project someone else started?',
    answer:
      'Often, yes. We audit it first and tell you honestly whether continuing or rebuilding is the cheaper path — sometimes the answer is not the one that gets us more work.',
  },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('Process');
  const [openIndex, setOpenIndex] = useState(0);

  const visibleFaqs = faqs.filter((faq) => faq.category === activeCategory);

  const selectCategory = (category) => {
    setActiveCategory(category);
    /* Open the first row of the new tab, so switching never lands on a wall of
       closed questions with nothing to read. */
    setOpenIndex(0);
  };

  return (
    <section className="faq-section">
      <div className="faq-gridlines" aria-hidden="true">
        <span className="faq-gridline" />
        <span className="faq-gridline" />
        <span className="faq-gridline" />
      </div>

      <div className="faq-grid">
        {/* Heading pinned top, CTA pinned bottom — the gap between them is what
            balances the accordion's height on the right. */}
        <motion.div
          className="faq-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div>
            <span className="faq-eyebrow">
              <span className="faq-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
              FAQ
            </span>
            <h2 className="faq-heading">Common inquiries</h2>
          </div>

          <div className="faq-cta">
            <p className="faq-lede">
              Everything you need to know about scoping, building, and supporting a system with
              Cogxioms. Can&rsquo;t find an answer?
            </p>
            <Link to="/contact" className="faq-btn">
              <FiChevronsRight />
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>

        <div className="faq-right">
          <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                className={`faq-tab${activeCategory === category ? ' is-active' : ''}`}
                onClick={() => selectCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="faq-list">
            {visibleFaqs.map((faq, i) => {
              const Icon = faq.icon;
              const open = openIndex === i;
              return (
                <div className={`faq-item${open ? ' is-open' : ''}`} key={faq.question}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span className="faq-q-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span className="faq-q-text">{faq.question}</span>
                    <span className="faq-q-toggle" aria-hidden="true">
                      {open ? <FiX /> : <FiPlus />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        className="faq-a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.12, 0.23, 0.5, 1] }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
