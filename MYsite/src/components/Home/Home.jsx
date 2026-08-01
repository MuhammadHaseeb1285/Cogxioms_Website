// src/pages/Home.jsx
import Hero from '../Hero/Hero';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import About from '../About/About';
import Services from '../Services/Services';
import Stats from '../Stats/Stats';
import DemoVideo from '../DemoVideo/DemoVideo';
import Projects from '../Projects/Projects';
import WorkflowShowcase from '../WorkflowShowcase/WorkflowShowcase';
import Integrations from '../Integrations/Integrations';
import Testimonials from '../Testimonials/Testimonials';
import Team from '../Team/Team';
import FAQ from '../FAQ/FAQ';
import Contact from '../Contact/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <ScrollReveal />
      <About />
      <Services />
      <Stats />
      <DemoVideo />
      <Projects />
      <WorkflowShowcase />
      <Integrations />
      <Testimonials />
      <Team />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;
