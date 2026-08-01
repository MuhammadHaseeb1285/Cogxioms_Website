import { secureGuardArt } from './icons/secureGuard';
import { missionDrivenArt, growthFocusedArt, clientCentricArt } from './icons/lineArt';

/*
 * All four render on the homepage and on /about, four across.
 * Swapping an illustration is a one-line change to `art`.
 */
const approachCards = [
  {
    id: 'mission-driven',
    title: 'Mission-Driven',
    text: 'Empowering businesses with innovative technology solutions that create lasting impact.',
    art: missionDrivenArt,
  },
  {
    id: 'growth-focused',
    title: 'Growth Focused',
    text: 'Scalable and  Efficients solutions designed to grow with your business and adapt to changing needs.',
    art: growthFocusedArt,
  },
  {
    id: 'client-centric',
    title: 'Client-Centric',
    text: 'Your success is our priority. We work closely with you to deliver exactly what you need.',
    art: clientCentricArt,
  },
  {
    id: 'secure-guard',
    title: 'Secure Guard',
    text: 'We fortify your AI deployments with robust security protocols. Our team ensuresstrict data privacy standards.',
    art: secureGuardArt,
    // Framer's art has no internal padding, unlike the authored set.
    artScale: 0.82,
  },
];

export default approachCards;
