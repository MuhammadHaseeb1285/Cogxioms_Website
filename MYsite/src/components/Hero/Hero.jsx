import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import './Hero.css';

const pillars = ['AI Automation', 'Custom Software', 'Data Intelligence', 'Cloud Systems'];

const trustedLogos = [
  { src: '/Images/logos/drivionize.png', alt: 'Drivionize' },
  { src: '/Images/logos/pucit.png', alt: 'Faculty of Computing & IT, University of the Punjab' },
];

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingTexts = [
    "Intelligent Solutions",
    "AI-Powered Systems",
    "Modern Technology",
    "Innovation & Growth"
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    const typeText = () => {
      const currentText = typingTexts[textIndex];

      if (isDeleting) {
        setCharIndex(prev => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      } else {
        setCharIndex(prev => prev + 1);
        if (charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    };

    const timer = setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, typingTexts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const currentText = typingTexts[textIndex];
  const displayText = currentText.substring(0, charIndex);

  return (
    <section className="hero" id="home">
      {/* webm first so Chrome/Firefox take the 648KB VP9 over the 823KB H.264;
          the poster holds the frame so the hero paints before either lands. */}
      <video
        className="hero-video-bg"
        poster="/videos/header-bg.jpg"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/header-bg.webm" type="video/webm" />
        <source src="/videos/header-bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-bg-overlay"></div>
      <div className="hero-container">
        <motion.div
          className="hero-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <ul className="hero-pillars">
            {pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
          <div className="hero-logos-marquee">
            <div className="hero-logos-track">
              {[0, 1].map((i) => (
                <div className="hero-logos-set" key={i} aria-hidden={i === 1}>
                  {trustedLogos.map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt} className="hero-logo" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-content content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={textVariants}>
            Empowering Businesses with{' '}
            <span className="typing-text">
              {displayText}
              <span className="cursor">|</span>
            </span>
          </motion.h1>
          <motion.p variants={textVariants}>
            We transform ideas into reality by leveraging AI, automation, and modern technology to drive innovation and growth.
          </motion.p>
          <motion.div className="buttons" variants={textVariants}>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link to="/contact" className="gradient-btn">
                <motion.span
                  className="gradient-icon"
                  initial={{ x: 0, y: 0 }}
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiArrowUpRight />
                </motion.span>
                Start Your Project
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
