import { useLocation } from 'react-router-dom';
import './About.css';
import { motion } from 'framer-motion';
import ApproachCard from './ApproachCard';
import approachCards from './approachData';
import AboutDetail from './AboutDetail';

const About = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // If on homepage, show basic info with "Learn More" link
  if (isHomePage) {
    return (
      <section className="about-section">
        {/* Same three-line grid as the scroll section, splitting the section into
            four equal quarters. Spans the full section width, so the card grid
            below is full-bleed too and each card fills exactly one quarter. */}
        <div className="approach-gridlines" aria-hidden="true">
          <span className="approach-gridline" />
          <span className="approach-gridline" />
          <span className="approach-gridline" />
        </div>
        <div className="about-container">
          <motion.div
            className="about-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow">Our Approach</span>
            <motion.h2
              className="about-title"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Transforming Ideas Into
              <span className="gradient-text"> Digital Reality</span>
            </motion.h2>
            
            <motion.p
              className="about-subtitle"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We are a passionate team of innovators, developers, and designers dedicated to creating cutting-edge solutions that drive business growth and digital transformation.
            </motion.p>
          </motion.div>

        </div>

        {/* Outside .about-container: must span the section to line up with the rules. */}
        <div className="approach-grid">
          {approachCards.map((card, index) => (
            <ApproachCard key={card.id} index={index} {...card} />
          ))}
        </div>

      </section>
    );
  }

  // The /about page lives in its own component — see AboutDetail.jsx. It was
  // rebuilt onto the site's grid system, and keeping ~200 lines of inline JSX
  // for it in here alongside the homepage variant made both harder to follow.
  return <AboutDetail />;
};

export default About;
