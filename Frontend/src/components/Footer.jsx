import React from 'react';

const Footer = () => {
  return (
    <footer className="text-[#f5f5dc] py-16 px-6 text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
        Why are you still here?
      </h2>
      <p className="text-[#f5f5dc]/80 max-w-xl mx-auto text-lg mb-8" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
        Join the sound revolution with Boat 2.0 — experience audio like never before. It’s your move.
      </p>

      <div className="text-sm text-[#f5f5dc]/60">
        © 2025 Boat 2.0 — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
