import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import LandingShowcase from '../components/LandingShowcase';
import { motion } from 'framer-motion';
import Stats from '../components/Stats';
import Contact from '../components/Contact';
import Highlights from '../components/Highlights';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const HomePage = () => {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    const lenis = window.lenis;
    if (lenis && contactRef.current) {
      lenis.scrollTo(contactRef.current);
    } else if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70, damping: 15 }}
      className="relative w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] text-[#f5f5dc]"
    >
      <Navbar onContactClick={scrollToContact} />
      <LandingShowcase />
      <Highlights />
      <Stats />
      <FAQ />
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </motion.div>
  );
};

export default HomePage;
