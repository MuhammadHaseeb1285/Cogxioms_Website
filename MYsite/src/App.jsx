import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageTransition from './components/PageTransition/PageTransition';
import './App.css';

// Lazy load all sections
const Hero = lazy(() => import('./components/Hero/Hero'));
const ScrollReveal = lazy(() => import('./components/ScrollReveal/ScrollReveal'));
const About = lazy(() => import('./components/About/About'));
const Approach = lazy(() => import('./components/Approach/Approach'));
const Services = lazy(() => import('./components/Services/Services'));
const Stats = lazy(() => import('./components/Stats/Stats'));
const DemoVideo = lazy(() => import('./components/DemoVideo/DemoVideo'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const WorkflowShowcase = lazy(() => import('./components/WorkflowShowcase/WorkflowShowcase'));
const Integrations = lazy(() => import('./components/Integrations/Integrations'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials'));
const Team = lazy(() => import('./components/Team/Team'));
const FAQ = lazy(() => import('./components/FAQ/FAQ'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const ProjectDetail = lazy(() => import('./components/Projects/ProjectDetail'));

// Loading Component
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '1.2rem',
    color: 'var(--text-secondary)',
    background: 'var(--bg-body)'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid var(--border-subtle)',
        borderTop: '3px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p>Loading amazing content...</p>
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal />
      <About />
      <Approach />
      <Services />
      <Stats />
      {/* Directly under Statistics: the figures claim breadth, the integration
          groups are the evidence for it. Separating them put an unrelated demo
          and the whole case-study list between the claim and its support. */}
      <Integrations />
      <DemoVideo />
      <Projects />
      <WorkflowShowcase />
      {/* Team before Testimonials: meet the people, then hear from their
          clients. Reversed, the quotes arrive before there is anyone to
          attribute the work to. */}
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <PageTransition />
        <Header />

        <main style={{ minHeight: '100vh' }}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
