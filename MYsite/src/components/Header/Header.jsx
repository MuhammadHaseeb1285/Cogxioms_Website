import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { FiX, FiArrowRight, FiArrowUpRight, FiFacebook, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaTools, FaFolderOpen, FaHandshake, FaInfoCircle, FaHome } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  /* Body scroll is locked while the menu is open. A fixed full-screen overlay
     that still scrolls the page underneath reads as a broken modal. */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  /* Today's date, recomputed each time the menu opens. A date only changes once
     a day, so a timer would burn ticks for nothing — but reading it on open means
     a tab left running overnight still shows the right day. */
  const today = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );

  // Escape closes it, as a dialog should.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Scroll to top when logo is clicked
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { name: 'Home', href: '/', icon: <FaHome className="navIcon" /> },
    { name: 'Services', href: '/services', icon: <FaTools className="navIcon" /> },
    { name: 'Projects', href: '/projects', icon: <FaFolderOpen className="navIcon" /> },
    { name: 'About', href: '/about', icon: <FaInfoCircle className="navIcon" /> },
    { name: 'Contact', href: '/contact', icon: <FaHandshake className="navIcon" /> },
  ];

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        {/* Scroll Progress Bar */}
        <motion.div 
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
        
        <div className="container">
          <motion.div
            className="logo"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <NavLink to="/" className="logoLink" onClick={handleLogoClick}>
              <div className="logo-container">
                <img src="/logo.png" alt="Cogxioms" className="logo-image" />
                <div className="logoPulse"></div>
              </div>
            </NavLink>
          </motion.div>

          <motion.nav 
            className="nav"
            variants={navVariants}
            initial="hidden"
            animate="visible"
          >
            <ul className="navList">
              {navItems.map((item) => (
                <motion.li 
                  key={item.name} 
                  className="navItem"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink 
                    to={item.href} 
                    className={({ isActive }) => `navLink${isActive ? ' active' : ''}`}
                  >
                    <span className="navIconWrapper">
                      {item.icon}
                    </span>
                    <span className="navText">{item.name}</span>
                    <motion.div 
                      className="navUnderline"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              className="ctaContainer"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <NavLink to="/contact" className="ctaButton">
                <span className="ctaText">Let's Talk</span>
                <FiArrowRight className="ctaArrow" />
                <div className="ctaPulse"></div>
                <div className="ctaGlow"></div>
              </NavLink>
            </motion.div>
          </motion.nav>

          <motion.button 
            className="mobileButton" 
            onClick={() => setIsOpen(true)} 
            aria-label="Open menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="hamburger-lines">
              <span></span>
              <span></span>
            </span>
          </motion.button>
        </div>
      </header>

      {/*
        Full-screen menu that drops from the top, replacing a panel that slid in
        from the right. Split in two, per the reference:

          left   brand, a statement line and the address, over a dark still
          right  the link columns on a light band, with a grayscale image below

        The panel animates on y rather than opacity so it reads as a sheet coming
        down over the page. Body scroll is locked while it is open — a fixed
        overlay that still scrolls the page behind it feels broken.
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* --- Left: brand --- */}
            <div className="menu-brand">
              <span className="menu-brand-media" aria-hidden="true" />
              <span className="menu-brand-grain" aria-hidden="true" />

              <div className="menu-brand-top">
                <span className="menu-logo">Cogxioms</span>
              </div>

              <div className="menu-brand-mid">
                <span className="menu-year">Cogxioms 2026</span>
                <h2 className="menu-statement">
                  Production software that keeps working after we hand it over.
                </h2>
              </div>

              <span className="menu-address">LAHORE, PAKISTAN</span>
            </div>

            {/* --- Right: links --- */}
            <div className="menu-side">
              <div className="menu-links">
                <button
                  type="button"
                  className="menu-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX />
                </button>

                <div className="menu-col">
                  <span className="menu-col-title">Quick Links</span>
                  <ul>
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <NavLink to={item.href} onClick={() => setIsOpen(false)}>
                          {item.name}
                          <FiArrowUpRight aria-hidden="true" />
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="menu-col">
                  <span className="menu-col-title">Other Links</span>
                  <ul>
                    <li>
                      <NavLink to="/team" onClick={() => setIsOpen(false)}>
                        Our Team
                        <FiArrowUpRight aria-hidden="true" />
                      </NavLink>
                    </li>
                    <li>
                      <a href="https://www.cogxioms.com/" target="_blank" rel="noopener noreferrer">
                        cogxioms.com
                        <FiArrowUpRight aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                        Book A Call
                        <FiArrowUpRight aria-hidden="true" />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="menu-foot">
                <span className="menu-foot-media" aria-hidden="true" />
                <div className="menu-foot-bar">
                  <span className="menu-date">{today}</span>
                  <span className="menu-socials">
                    <a
                      href="https://www.facebook.com/share/1DRis6Q7c2/"
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiFacebook />
                    </a>
                    <a
                      href="https://github.com/MuhammadHaseeb1285"
                      aria-label="GitHub"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiGithub />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/106883372/admin/dashboard/"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FiLinkedin />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
