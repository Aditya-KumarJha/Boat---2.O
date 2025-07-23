import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const Hero = ({ onExplore }) => {
  const [soundwaveData, setSoundwaveData] = useState(null);

  useEffect(() => {
    fetch("/soundWave.json")
      .then((res) => res.json())
      .then((data) => setSoundwaveData(data))
      .catch((err) => console.error("Failed to load soundwave animation", err));
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center">
      <img
        src="/BG.avif"
        alt="Headphones Background"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-[center_47%] opacity-100 z-0 pointer-events-none"
      />

      <div className="absolute w-[60vw] sm:w-[50vw] md:w-[40vw] h-[60vw] sm:h-[50vw] md:h-[40vw] max-w-[600px] max-h-[600px] bg-[#8e44ad]/20 blur-[20vw] sm:blur-[15vw] md:blur-[13vw] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="absolute left-0 top-[20vh] sm:top-[25vh] w-[20vw] sm:w-[15vw] h-[20vw] sm:h-[15vw] bg-violet-600 opacity-20 blur-3xl rounded-full z-10" />
      <div className="absolute right-0 bottom-[20vh] sm:bottom-[25vh] w-[20vw] sm:w-[15vw] h-[20vw] sm:h-[15vw] bg-sky-500 opacity-20 blur-3xl rounded-full z-10" />

      {soundwaveData && (
        <>
          <div className="absolute left-[2vw] top-1/2 -translate-y-1/2 w-[10vw] sm:w-[8vw] md:w-[7vw] max-w-[110px] opacity-60 z-20">
            <Lottie animationData={soundwaveData} loop autoPlay />
          </div>
          <div className="absolute right-[2vw] top-1/2 -translate-y-1/2 w-[10vw] sm:w-[8vw] md:w-[7vw] max-w-[110px] opacity-60 z-20">
            <Lottie animationData={soundwaveData} loop autoPlay />
          </div>
        </>
      )}

      <div className="relative z-30 text-center px-4 sm:px-6 max-w-[90vw]">
        <motion.h1
          initial={{ opacity: 0, y: "3vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ fontFamily: "'Saira Condensed', sans-serif" }}
          className="text-[2rem] xs:text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-200 via-white to-sky-200 drop-shadow-[0_0.4rem_2rem_rgba(255,255,255,0.3)] leading-tight"
        >
          Feel Every Frequency
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: "1vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}
          className="mt-4 sm:mt-4 text-[0.9rem] xs:text-[1rem] sm:text-[1.2rem] md:text-[1.3rem] text-slate-200 max-w-[42rem] mx-auto leading-relaxed"
        >
          Engineered to{" "}
          <span className="text-indigo-300 font-semibold">
            discover premium headphones
          </span>
          , crafted for pure audio indulgence.
        </motion.p>

        <motion.button
          onClick={onExplore}
          whileHover={{
            scale: 1.08,
            backgroundColor: "rgba(255,255,255,0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mt-6 sm:mt-8 px-6 py-2.5 text-sm sm:text-base font-medium text-white border border-white/30 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-md"
        >
          Explore Now
        </motion.button>
      </div>

      <div
        className="fixed top-0 left-0 w-[1.2rem] h-[1.2rem] bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference transition-opacity duration-300 opacity-0"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
        id="cursor-follower"
      />
    </section>
  );
};

export default Hero;
