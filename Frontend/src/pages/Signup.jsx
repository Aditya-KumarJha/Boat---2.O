import React, { useEffect, useState } from "react";
import { SignUp } from "@clerk/clerk-react";
import {
  BarChart3,
  Circle,
  UserCircle2,
  Sparkles,
  Music3,
  Headphones,
  Mic2,
  AudioLines,
  LineChart,
  SlidersHorizontal,
} from "lucide-react";
import Lottie from "lottie-react";
import Loading from "../components/Loading";

const FloatingIcon = ({ Icon, className, style }) => (
  <div className={`absolute ${className}`} style={style}>
    <Icon className="text-white/80 w-[1.8rem] h-[1.8rem] sm:w-[2.2rem] sm:h-[2.2rem] animate-float" />
  </div>
);

const Signup = () => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/music-wave.json")
      .then((res) => res.json())
      .then(setAnimationData);

    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] flex flex-col md:grid md:grid-cols-2 font-sans">
      {/* LEFT PANEL */}
      <div className="relative flex flex-col px-[5vw] py-[2.5vh] text-[#f5f5dc] overflow-hidden">
        <div className="mb-[1.2vh] z-10 flex items-center gap-[0.9rem]">
          <Sparkles className="w-[1.8rem] h-[1.8rem]" />
          <h1 className="text-[2rem] font-bold tracking-wide">Boat 2.0</h1>
        </div>

        {[["top-[2vh] left-[2vw]"], ["bottom-[2vh] right-[2vw]"]].map(([position], idx) => (
          <div key={idx} className={`absolute ${position} grid grid-cols-4 gap-[0.6rem] z-0 opacity-20 animate-pulse`}>
            {Array.from({ length: 16 }).map((_, i) => (
              <Circle key={i} className="w-[1.1rem] h-[1.1rem]" strokeWidth={1.2} />
            ))}
          </div>
        ))}

        <div className="flex-grow flex flex-col items-center justify-center space-y-[1.8rem] z-10 relative">
          <div className="relative w-[16rem] h-[16rem]">
            <div className="absolute inset-0 flex items-center justify-center">
              {animationData && <Lottie animationData={animationData} loop autoplay />}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white px-6 py-3 rounded-xl shadow-2xl w-[11rem] border border-gray-200">
                <BarChart3 className="text-[#3e4ef5] w-12 h-12 mx-auto" />
                <p className="text-black text-[1rem] font-semibold mt-3 text-center">Listener Analytics</p>
              </div>
            </div>

            <FloatingIcon Icon={Music3} className="top-[1rem] right-[-1.2rem]" style={{ animationDuration: "5s" }} />
            <FloatingIcon Icon={Mic2} className="bottom-[-1rem] left-[25%]" style={{ animationDuration: "6s" }} />
            <FloatingIcon Icon={AudioLines} className="top-[25%] left-[-1.5rem]" style={{ animationDuration: "6.5s" }} />
            <FloatingIcon Icon={Headphones} className="top-[70%] left-[-1.5rem]" style={{ animationDuration: "4s" }} />
            <FloatingIcon Icon={SlidersHorizontal} className="top-[60%] right-[-1.8rem]" style={{ animationDuration: "5.5s" }} />
            <FloatingIcon Icon={LineChart} className="bottom-[1rem] right-[3rem]" style={{ animationDuration: "4.8s" }} />

            <div className="absolute -top-[1.2rem] left-1/2 -translate-x-1/2 animate-bounce">
              <div className="absolute inset-0 w-[4rem] h-[4rem] rounded-full bg-[#ffffff33] blur-xl animate-pulse z-0" />
              <UserCircle2 className="relative z-10 w-10 h-10 ring-2 ring-white bg-white text-[#3e4ef5] rounded-full" />
            </div>
          </div>

          <div className="text-center max-w-[23rem] px-[1rem]">
            <h2 className="text-[1.6rem] font-bold mb-[0.4rem]">Feel the Frequency</h2>
            <p className="text-[#f5f5dc]/90 text-[1rem] leading-snug">
              Join <strong>Boat 2.0</strong> for immersive soundscapes, rich audio journeys,
              and real-time interaction.
            </p>
          </div>
        </div>

        <div className="mt-[2rem] z-10">
          <p className="text-[0.85rem] italic text-[#f5f5dc]/70">"India’s #1 audio brand — redefining how the nation listens."</p>
          <div className="flex items-center gap-[0.75rem] mt-[0.6rem]">
            <UserCircle2 className="w-[2.4rem] h-[2.4rem] rounded-full ring-2 ring-white bg-white text-[#3e4ef5]" />
            <div className="text-[0.95rem] leading-tight">
              <p className="font-semibold text-[#f5f5dc]">Aman Gupta & Sameer Mehta</p>
              <p className="text-[#f5f5dc]/80 text-[0.75rem]">Founders of Boat</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - Clerk */}
      <div className="w-full pt-[6.5vh] px-[5vw] pb-[1.25rem] flex items-center justify-center">
        <SignUp
          path="/signup"
          routing="path"
          signInUrl="/login"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full h-full",
              card: "w-full h-full max-w-[27rem] bg-white border-none shadow-xl rounded-xl px-4 pt-10 pb-6 flex flex-col items-center",
              form: "w-full",
              formButtonPrimary: "bg-[#3e4ef5] hover:bg-[#2c3ce5] text-white text-[1rem] py-2 font-semibold w-full",
              formFieldInput: "text-[0.95rem] px-4 py-2 bg-white border border-gray-300 text-black placeholder-gray-400 rounded-md w-full",
              formFieldLabel: "text-black text-[0.95rem] mb-1",
              socialButtonsBlockButton: "border border-gray-300 text-black hover:bg-gray-100 py-2 text-[0.95rem] w-full",
              headerTitle: "text-[1.35rem] font-semibold text-[#3e4ef5] text-center w-full",
              headerSubtitle: "hidden",
              footerActionText: "text-gray-600 text-[0.83rem] text-center",
              footerActionLink: "text-[#3e4ef5] hover:underline text-[0.83rem]",
            },
          }}
        />
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 3.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
