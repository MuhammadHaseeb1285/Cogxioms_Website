import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiOpenai, SiPerplexity, SiGooglegemini } from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';
import './ScrollReveal.css';

const text =
  "We connect your business to the AI models shaping the future — GPT-4, Claude, and custom-trained systems — turning raw data into decisions your team can act on immediately, with clarity that holds up under real production load.";

const subtitle = 'Built for reliability — from first prototype to production traffic.';

const words = text.split(' ');

const modelIcons = [
  { icon: <SiPerplexity />, label: 'Perplexity' },
  { icon: <SiGooglegemini />, label: 'Google Gemini' },
  { icon: <SiOpenai />, label: 'OpenAI' },
  { icon: <FiCpu />, label: 'Custom Models' },
];

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span className="scroll-reveal-word" style={{ opacity }}>
      {children}{' '}
    </motion.span>
  );
};

const ScrollReveal = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="scroll-reveal-section" ref={container}>
      <div className="scroll-reveal-sticky">
        <div className="scroll-reveal-grid" aria-hidden="true">
          <span className="scroll-reveal-gridline" />
          <span className="scroll-reveal-gridline" />
          <span className="scroll-reveal-gridline" />
        </div>
        <div className="scroll-reveal-container">
          <div className="scroll-reveal-icons">
            {modelIcons.map((item) => (
              <span className="scroll-reveal-icon" key={item.label} title={item.label}>
                {item.icon}
              </span>
            ))}
          </div>
          <p className="scroll-reveal-text">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
          <p className="scroll-reveal-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default ScrollReveal;
