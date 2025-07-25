import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/partials/Navbar';
import LandingShowcase from '../components/partials/LandingShowcase';
import { motion } from 'framer-motion';
import Stats from '../components/partials/Stats';
import Contact from '../components/partials/Contact';
import Highlights from '../components/partials/Highlights';
import FAQ from '../components/partials/FAQ';
import Footer from '../components/partials/Footer';
import Loading from "../components/Loading";

const HomePage = () => {
  const contactRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const scrollToContact = () => {
    const lenis = window.lenis;
    if (lenis && contactRef.current) {
      lenis.scrollTo(contactRef.current);
    } else if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

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
