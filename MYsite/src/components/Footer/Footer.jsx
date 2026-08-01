import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiTwitter, FiFacebook, FiArrowRight, FiCheck } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { hatchGlyph } from '../Approach/icons';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from '../../lib/emailjs';
import './Footer.css';

/*
 * Footer in two bands, following the reference:
 *
 *   top     a signup block over a looping video, content starting on the 25%
 *           gridline — this is where the newsletter lives now, rather than as a
 *           section of its own further up the page
 *   bottom  wordmark left, then three link columns landing on 25/50/75
 *
 * The video is decoration, so it carries no meaning that the copy does not: it
 * is muted, loops, has no controls, and is marked aria-hidden. A poster frame
 * shows first, so the band never renders as an empty rectangle while the video
 * arrives, and `preload="metadata"` keeps it off the critical path.
 *
 * See public/videos/ — the source was 12 MB of 1920x1205 VP9 at 30fps, which is
 * absurd for a darkened background. It is re-encoded to 960x602 at 20fps: 259 KB
 * webm with a 335 KB H.264 fallback for older Safari. Only one of the two is ever
 * fetched. If you replace the clip, re-encode it the same way rather than
 * dropping the original in.
 */

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
];

/* "Case Studies" is gone — it pointed at /projects, the same place Projects
   does, so the footer listed one destination twice under two names. Projects
   moved into this column in its place. */
const companyLinks = [
  { to: '/team', label: 'Our Team' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/projects', label: 'Projects' },
];

const socials = [
  { href: 'https://www.facebook.com/share/1DRis6Q7c2/', label: 'Facebook', Icon: FiFacebook },
  { href: 'https://github.com/MuhammadHaseeb1285', label: 'GitHub', Icon: FiGithub },
  {
    href: 'https://www.linkedin.com/company/106883372/admin/dashboard/',
    label: 'LinkedIn',
    Icon: FiLinkedin,
  },
  { href: 'https://www.cogxioms.com/', label: 'Twitter', Icon: FiTwitter },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  /*
   * Sends through the same EmailJS service and template as the contact form.
   * The template needs name/subject/message as well as the address, so those
   * three ride along as hidden inputs — sendForm reads the DOM form, so they have
   * to be real fields rather than values passed in JS.
   *
   * Validity is the browser's job: type="email" + required means submit does not
   * fire at all until the address parses, so there is no hand-rolled regex here
   * to disagree with the field's own validation.
   */
  const subscribe = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, event.target);
      setStatus('sent');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Subscribe failed', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <footer className="ft">
      {/* --- Signup band --------------------------------------------------- */}
      <div className="ft-cta">
        <video
          className="ft-cta-video"
          src="/videos/footer-bg.webm"
          poster="/videos/footer-bg.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          {/* Older Safari has no VP9; it picks this up instead. */}
          <source src="/videos/footer-bg.webm" type="video/webm" />
          <source src="/videos/footer-bg.mp4" type="video/mp4" />
        </video>
        <span className="ft-cta-scrim" aria-hidden="true" />
        <span className="ft-cta-grain" aria-hidden="true" />

        <div className="ft-gridlines" aria-hidden="true">
          <span className="ft-gridline" />
          <span className="ft-gridline" />
          <span className="ft-gridline" />
        </div>

        <motion.div
          className="ft-cta-inner"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="ft-eyebrow">
            <span className="ft-hatch" dangerouslySetInnerHTML={{ __html: hatchGlyph }} />
            Get Started
          </span>
          <h2 className="ft-cta-heading">Get smarter about AI systems</h2>
          <p className="ft-cta-lede">
            Notes on automation, integration, and what we learned shipping real systems. No
            fluff, just what works.
          </p>

          <form className="ft-form" onSubmit={subscribe}>
            {/* The shared template expects these three alongside the address. */}
            <input type="hidden" name="name" value="Newsletter Subscriber" readOnly />
            <input type="hidden" name="subject" value="Newsletter Signup" readOnly />
            <input
              type="hidden"
              name="message"
              value="New newsletter subscriber request."
              readOnly
            />

            <input
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              disabled={status === 'sending'}
            />
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sent' ? (
                <FiCheck aria-hidden="true" />
              ) : (
                <FiArrowRight aria-hidden="true" />
              )}
              <span>
                {status === 'sending' ? 'Sending' : status === 'sent' ? 'Subscribed' : 'Subscribe'}
              </span>
            </button>
          </form>

          {/* aria-live so the outcome is announced, not just shown. */}
          <p className={`ft-form-note${status === 'error' ? ' is-error' : ''}`} aria-live="polite">
            {status === 'sent' && 'Thanks — you are on the list.'}
            {status === 'error' && 'That did not send. Please try again in a moment.'}
          </p>
        </motion.div>
      </div>

      {/* --- Link band ------------------------------------------------------ */}
      <div className="ft-main">
        <div className="ft-gridlines" aria-hidden="true">
          <span className="ft-gridline" />
          <span className="ft-gridline" />
          <span className="ft-gridline" />
        </div>

        <div className="ft-grid">
          <div className="ft-brand">
            <span className="ft-wordmark">Cogxioms</span>
            <p className="ft-brand-note">
              Production software across integration, analytics and commerce.
            </p>
          </div>

          <div className="ft-col">
            <h3 className="ft-col-title">Quick Links</h3>
            <ul className="ft-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h3 className="ft-col-title">Company</h3>
            <ul className="ft-links">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="ft-col">
            <h3 className="ft-col-title">Reach Us</h3>
            <ul className="ft-links">
              <li>
                <a href="https://www.cogxioms.com/" target="_blank" rel="noopener noreferrer">
                  www.cogxioms.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/9P4kFadkoCSqDR4o6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lahore, Pakistan
                </a>
              </li>
            </ul>

            <div className="ft-socials">
              {/* Referenced as a member expression rather than destructured —
                  this eslint config does not count JSX usage, so a destructured
                  `Icon` reads as an unused variable. */}
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ft-legal">
          <span>© 2026 Cogxioms. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
