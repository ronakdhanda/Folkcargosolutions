import { useEffect } from 'react';
import './redesign.css';
import initRedesign from './lib/initRedesign';
import WebGLBackground from './components/redesign/WebGLBackground';
import Nav from './components/redesign/Nav';
import Hero from './components/redesign/Hero';
import Services from './components/redesign/Services';
import StatsStrip from './components/redesign/StatsStrip';
import About from './components/redesign/About';
import RouteDivider from './components/redesign/RouteDivider';
import Process from './components/redesign/Process';
import Faq from './components/redesign/Faq';
import Contact from './components/redesign/Contact';
import Footer from './components/redesign/Footer';
import WhatsAppFab from './components/redesign/WhatsAppFab';
import ServiceModal from './components/redesign/ServiceModal';

export default function RedesignPage() {
  // initRedesign() boots the whole Three.js scene, scroll choreography, and every small
  // interaction (modal, FAQ accordion, contact form, copy-to-clipboard, tilt-on-hover) — see
  // src/lib/initRedesign.js for why this stays one imperative bootstrap rather than being
  // split into many hooks. It runs once the section markup below has mounted, and its
  // returned cleanup function tears the scene/listeners/timers down on unmount.
  useEffect(() => {
    const cleanup = initRedesign();
    return cleanup;
  }, []);

  return (
    <>
      <WebGLBackground />
      <Nav />
      <main>
        <Hero />
        <Services />
        <StatsStrip />
        <About />
        <RouteDivider />
        <Process />
        <RouteDivider />
        <Faq />
        <RouteDivider />
        <Contact />
        <Footer />
      </main>
      <WhatsAppFab />
      <ServiceModal />
    </>
  );
}
