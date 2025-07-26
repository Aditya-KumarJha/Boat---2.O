import React, { useEffect, useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import {
  Waves,
  HeartPulse,
  UserRound,
  Sparkles,
  Music4,
  AudioLines,
  Signal,
  ArrowLeft,
} from "lucide-react";
import Lottie from "lottie-react";
import Loading from "../components/Loading";

const FloatingIcon = ({ Icon, className, style }) => (
  <div className={`absolute ${className}`} style={style}>
    <Icon className="text-[#f5f5dc]/80 w-[1.6rem] h-[1.6rem] animate-float" />
  </div>
);

const Login = () => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    fetch("/Wave Loop.json")
      .then((res) => res.json())
      .then(setAnimationData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0d9488] to-[#065f46] flex flex-col md:flex-row-reverse font-sans md:gap-[0.5rem]">
      
      <div className="w-full px-[6vw] pt-[22vh] pb-[3vh] flex items-center justify-center md:w-1/2 order-3 md:order-none">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full h-full",
              card: "w-full h-full max-w-[27rem]  bg-white border-none shadow-none rounded-none px-4 pt-10 pb-6 flex flex-col items-center",
              form: "w-full",
              formButtonPrimary:
                "bg-[#3e4ef5] hover:bg-[#2c3ce5] text-white text-[1rem] py-2 font-semibold w-full",
              formFieldInput:
                "text-[0.95rem] px-4 py-2 bg-white border border-gray-300 text-black placeholder-gray-400 rounded-md w-full",
              formFieldLabel: "text-black text-[0.95rem] mb-1",
              socialButtonsBlockButton:
                "border border-gray-300 text-black hover:bg-gray-100 py-2 text-[0.95rem] w-full",
              headerTitle:
                "text-[1.35rem] font-semibold text-[#3e4ef5] text-center w-full",
              headerSubtitle: "hidden",
              footerActionText: "text-gray-600 text-[0.83rem] text-center",
              footerActionLink:
                "text-[#3e4ef5] hover:underline text-[0.83rem]",
            },
          }}
        />
      </div>

      <div className="relative flex flex-col justify-between text-[#f5f5dc] px-[6vw] py-[5vh] overflow-hidden w-full md:w-1/2 order-2 md:order-none">
        
        <a href="/" className="absolute top-4 left-4 z-20">
          <ArrowLeft className="text-[#f5f5dc] hover:text-teal-300 w-6 h-6" />
        </a>

        <div className="z-10 flex items-center gap-[1rem]">
          <Sparkles className="w-[1.6rem] h-[1.6rem]" />
          <a href="/" className="text-[1.9rem] font-bold tracking-wide text-[#f5f5dc] no-underline" style={{ fontFamily: "Saira Condensed" }}>
            bo<span className="text-red-500">A</span>t 2.0
          </a>
        </div>

        <div className="absolute top-[2vh] left-[2vw] grid grid-cols-5 gap-[0.6rem] opacity-10 animate-pulse z-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <Waves
              key={`top-icon-${i}`}
              className="w-[1.1rem] h-[1.1rem]"
              strokeWidth={1.2}
            />
          ))}
        </div>

        <div className="absolute bottom-[2vh] right-[2vw] grid grid-cols-5 gap-[0.6rem] opacity-10 animate-pulse z-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <Waves
              key={`bottom-icon-${i}`}
              className="w-[1.1rem] h-[1.1rem]"
              strokeWidth={1.2}
            />
          ))}
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center relative z-10">
          <div className="relative w-[14rem] sm:w-[17rem] h-[14rem] sm:h-[17rem] mb-8">
            {animationData && (
              <Lottie animationData={animationData} loop autoplay />
            )}
            <div className="absolute inset-0 flex items-center justify-center mb-12">
              <div className="bg-white px-5 py-3 rounded-xl shadow-2xl w-[10rem] border border-gray-200">
                <Signal className="text-[#3e4ef5] w-12 h-12 mx-auto" />
                <p className="text-black text-[0.9rem] font-semibold mt-2">
                  Seamless Access
                </p>
              </div>
            </div>

            <FloatingIcon
              Icon={AudioLines}
              className="top-[-1.2rem] left-[12%]"
              style={{ animationDuration: "4s" }}
            />
            <FloatingIcon
              Icon={Music4}
              className="top-[1.2rem] right-[-1.4rem]"
              style={{ animationDuration: "5s" }}
            />
            <FloatingIcon
              Icon={HeartPulse}
              className="bottom-[-1.4rem] left-[28%]"
              style={{ animationDuration: "6s" }}
            />
            <FloatingIcon
              Icon={UserRound}
              className="bottom-[1.2rem] right-[-1.2rem]"
              style={{ animationDuration: "7s" }}
            />
            <FloatingIcon
              Icon={Music4}
              className="top-[6rem] left-[-1.4rem]"
              style={{ animationDuration: "5.5s" }}
            />
            <FloatingIcon
              Icon={AudioLines}
              className="bottom-[5rem] right-[-1.5rem]"
              style={{ animationDuration: "6.5s" }}
            />
            <FloatingIcon
              Icon={HeartPulse}
              className="top-[0rem] right-[35%]"
              style={{ animationDuration: "4.5s" }}
            />

            <div className="absolute -top-[1.4rem] left-1/2 -translate-x-1/2 animate-bounce">
              <div className="absolute inset-0 w-[4rem] h-[4rem] rounded-full bg-[#ffffff33] blur-xl animate-pulse" />
              <UserRound className="relative z-10 w-9 h-9 ring-2 ring-white bg-white text-[#3e4ef5] rounded-full" />
            </div>
          </div>

          <div className="max-w-[23rem] px-4">
            <h2 className="text-[1.45rem] font-bold mb-2">Dive Back In</h2>
            <p className="text-[#f5f5dc]/90 text-[1rem]">
              Log in to <strong>Boat 2.0</strong> and pick up where your sonic
              adventure left off.
            </p>
          </div>
        </div>

        <div className="z-10 mt-4">
          <p className="text-[0.85rem] italic text-[#f5f5dc]/70 leading-snug">
            "Your sound universe awaits. Let’s get you back in."
          </p>
          <div className="flex items-center gap-[0.8rem] mt-[0.6rem]">
            <UserRound className="w-[2.3rem] h-[2.3rem] rounded-full ring-2 ring-white bg-white text-[#3e4ef5]" />
            <div className="text-[0.9rem] leading-tight">
              <p className="font-semibold text-[#f5f5dc]">
                Returning BoAtheads
              </p>
              <p className="text-[#f5f5dc]/80 text-[0.8rem]">
                Welcome back to the wave
              </p>
            </div>
          </div>
        </div>
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

export default Login;
