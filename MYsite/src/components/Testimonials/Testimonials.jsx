import { motion } from 'framer-motion';
import { hatchGlyph } from '../Approach/icons';
import './Testimonials.css';

/*
 * Four testimonials laid out as a single edge-to-edge row, matching the
 * reference: a narrow left rail carrying the client name set vertically, then
 * the mark, headline, a rule, and the rating and comment pinned to the bottom.
 *
 * This replaced a stacked auto-rotating carousel. The row shows all four at
 * once, which is the point — a carousel hides three quarters of its content and
 * makes the reader wait for it, and these are short enough to read side by side.
 *
 * Light surface on a dark site, same inversion the case-study list uses.
 */

/*
 * Trimmed to four, per the reference layout: a fifth column makes each one too
 * narrow for the comment to sit on sensible line lengths. Fields are split out
 * rather than held as one "- Name, Role, Company" string so the rail, the
 * attribution and the mark can each take the part they need.
 *
 * Quotes below are the client's own words, supplied verbatim.
 * `title` is a short pull drawn from each quote — not supplied, but taken only
 * from wording already in the sentence beneath it.
 *
 * !! CHECK THE PAIRINGS !! The four quotes arrived as a set, without saying who
 * said which. They are matched to the person whose role fits the subject —
 * operations talk to the COO, the build-quality quote to the sysadmin, and so on.
 * That is a guess. Swap any that belong to someone else.
 *
 * The quotes are left exactly as supplied. They already sit within a 7-character
 * spread, and trimming a named person's statement to tidy a layout changes what
 * they said — so the four blocks are levelled in CSS instead, via a min-height on
 * .tst-text. Keep replacements near 160 characters and they will stay even.
 *
 * `title` is ours and is kept short enough to hold one line at every width.
 */
const reviews = [
  {
    company: 'Drivion',
    person: 'Jose Maria',
    role: 'COO',
    title: 'Operations streamlined',
    text:
      'From AI automation to custom software development, Cogxioms provided innovative solutions that streamlined our operations and improved efficiency.',
    rating: 5,
  },
  {
    company: 'Autodesguaces Alicante',
    person: 'Salva',
    role: 'SA',
    title: 'Detail that holds up',
    text:
      'The team’s technical expertise and attention to detail were outstanding. They built a reliable, modern application that continues to support our business growth.',
    rating: 5,
  },
  {
    company: 'Bayhauling',
    person: 'Zhivko Kanazirski',
    role: 'CEO',
    title: 'Our vision, at scale',
    text:
      'Cogxioms transformed our vision into a scalable, high-performance platform. Their team delivered on time, communicated clearly, and exceeded our expectations.',
    rating: 5,
  },
  {
    /* Supplied as "Remuss => Ultimate Social => CEO". Worth confirming: the
       middle field is a person's name everywhere else, and "Ultimate Social"
       reads like a second company. */
    company: 'Ultimate Social',
    person: 'Remuss',
    role: 'CEO',
    title: 'More than a partner',
    text:
      'Professional and highly skilled. Cogxioms became more than a development partner — they became a trusted technology advisor for our business.',
    rating: 5,
  },
];

/* Abstract marks rather than real client logos — we do not have permission to
   set anyone's trademark, and a monogram would just repeat the rail text. */
const MARKS = [
  'M4 14.5 12 4l8 10.5-8 5.5-8-5.5z',
  'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zm4 13 4 4',
  'M20 12a8 8 0 1 1-3.2-6.4',
  'M12 3.5a8.5 8.5 0 1 0 0 17zM12 3.5a8.5 8.5 0 0 1 0 17',
];

const Stars = ({ count }) => (
  <span className="tst-stars" role="img" aria-label={`${count} out of 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className={i < count ? '' : 'is-empty'}>
        <path d="M12 2.5 15 9.2l7.3.7-5.5 4.9 1.6 7.2L12 18.3l-6.4 3.7 1.6-7.2L1.7 9.9 9 9.2z" />
      </svg>
    ))}
  </span>
);

const Testimonials = () => (
  <section className="tst-section">
    <div className="tst-gridlines" aria-hidden="true">
      <span className="tst-gridline" />
      <span className="tst-gridline" />
      <span className="tst-gridline" />
    </div>

    <div className="tst-head">
      <motion.div
        className="tst-head-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="tst-eyebrow">
          <span className="tst-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
          Testimonials
        </span>
        <h2 className="tst-heading">Trusted by the pioneers</h2>
        <p className="tst-lede">
          Don&rsquo;t just take our word for it — hear it straight from the people we built for.
        </p>
      </motion.div>
    </div>

    <div className="tst-row">
      {reviews.map((review, i) => (
        <motion.article
          className="tst-card"
          key={review.company}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
        >
          {/* Rail: client name rotated to read bottom-to-top, as in the
              reference, with the hatch mark anchored at the foot. */}
          <div className="tst-rail">
            <span className="tst-rail-name">{review.company}</span>
            <span
              className="tst-rail-glyph"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: hatchGlyph }}
            />
          </div>

          <div className="tst-body">
            <svg className="tst-mark" viewBox="0 0 24 24" aria-hidden="true">
              <path d={MARKS[i % MARKS.length]} />
            </svg>

            {/* Title and comment appear only once a real quote exists. Until
                then the card still stands up — mark, rating and attribution —
                rather than showing an empty label or invented words. */}
            {review.title && <h3 className="tst-title">{review.title}</h3>}
            <span className="tst-rule" aria-hidden="true" />

            <div className="tst-foot">
              <span className="tst-label">Rating</span>
              <Stars count={review.rating} />

              {review.text && (
                <>
                  <span className="tst-label">Comment</span>
                  <p className="tst-text">{review.text}</p>
                </>
              )}

              <p className="tst-author">
                {review.person}
                <span className="tst-role">
                  {review.role}, {review.company}
                </span>
              </p>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default Testimonials;
