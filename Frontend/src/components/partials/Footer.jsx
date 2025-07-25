import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="text-[#f5f5dc] py-16 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
        Why are you still here?
      </h2>

      <p
        className="text-[#f5f5dc]/80 max-w-xl mx-auto text-lg mb-8"
        style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
      >
        Join the sound revolution with Boat 2.0 — experience audio like never before. It’s your move.
      </p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mb-8"
      >
        <Link
          to="/dashboard"
          className="inline-block px-6 py-3 rounded-full bg-[#f5f5dc] text-black font-semibold shadow-lg hover:shadow-[#f5f5dc]/40 hover:bg-opacity-90 transition-all duration-300"
          style={{
            fontFamily: "'Manrope', sans-serif",
            textShadow: '0 0 8px rgba(245, 245, 220, 0.5)',
          }}
        >
          🚀 Launch Dashboard
        </Link>
      </motion.div>

      <div className="text-sm text-[#f5f5dc]/60">
        © 2025 Boat 2.0 — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
