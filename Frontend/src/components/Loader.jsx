import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Stage, useGLTF, OrbitControls, Sparkles, Float, Environment, Text,
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Typewriter from 'typewriter-effect';
import Hero from './Hero';
import Loading from "../components/Loading";

const HeadphoneModel = () => {
  const groupRef = useRef();
  const { scene } = useGLTF('/Headset.glb');
  const [startTime] = useState(() => performance.now());
  const [opacity, setOpacity] = useState(1);

  useFrame((state) => {
    const elapsed = (performance.now() - startTime) / 1000;
    const y = -2.2;

    if (!groupRef.current) return;

    const { x, y: py } = state.pointer;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, py * 0.3, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -x * 0.3, 0.1);

    if (elapsed <= 2) {
      const t = THREE.MathUtils.smoothstep(elapsed / 2, 0, 1);
      groupRef.current.position.set(THREE.MathUtils.lerp(-6, 0, t), y, 0);
    } else if (elapsed > 2 && elapsed <= 9) {
      groupRef.current.position.set(0, y, 0);
      groupRef.current.rotation.y += 0.005;
    } else if (elapsed > 9 && elapsed <= 11) {
      const t = THREE.MathUtils.smoothstep((elapsed - 9) / 2, 0, 1);
      groupRef.current.position.set(THREE.MathUtils.lerp(0, 12, t), y, 0);
      setOpacity(THREE.MathUtils.lerp(1, 0, t));
    }

    groupRef.current.traverse((child) => {
      if (child.material) {
        child.material.transparent = true;
        child.material.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef} position={[-6, -2.2, 0]}>
      <primitive object={scene} scale={1.0} />
    </group>
  );
};

const SoundBars = ({ position = 'left' }) => {
  const bars = new Array(20).fill(0);
  return (
    <div
      className={`absolute top-1/2 ${position === 'left' ? 'left-4' : 'right-4'} z-20 flex flex-col gap-[3px] -translate-y-1/2`}
    >
      {bars.map((_, i) => (
        <div
          key={i}
          className="w-[3px] bg-white/40 animate-pulse"
          style={{
            height: `${Math.random() * 20 + 10}px`,
            animationDelay: `${i * 0.05}s`,
            animationDuration: `${Math.random() * 0.8 + 0.6}s`,
          }}
        />
      ))}
    </div>
  );
};

const Loader = ({ onLoaded }) => {
  const [showMainText, setShowMainText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [fadeOutText, setFadeOutText] = useState(false);
  const [loading, setLoading] = useState(true);

  const cursorRef = useRef(null);
  const whooshRef = useRef(null);
  const soundPlayedRef = useRef(false);

  const playWhoosh = useCallback(async () => {
    if (soundPlayedRef.current) return;
    try {
      whooshRef.current = new Audio('/whoosh.wav');
      whooshRef.current.volume = 0.9;
      await whooshRef.current.play();
      soundPlayedRef.current = true;
    } catch {}
  }, []);

  useEffect(() => {
    const handleUserClick = () => {
      setUserInteracted(true);
      if (typewriterStarted && !soundPlayedRef.current) playWhoosh();
    };
    window.addEventListener('click', handleUserClick);
    return () => window.removeEventListener('click', handleUserClick);
  }, [typewriterStarted, playWhoosh]);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMainText(true), 3000);
    const timer2 = setTimeout(() => setShowSubText(true), 5500);
    const fadeOutTimer = setTimeout(() => setFadeOutText(true), 11500);
    const heroTimer = setTimeout(() => setShowHero(true), 12500);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(fadeOutTimer);
      clearTimeout(heroTimer);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-gradient-to-br from-[#0d0d0d] via-[#1c1c1c] to-[#2e2e2e]">
      <div className="absolute left-0 top-1/4 w-[200px] h-[200px] bg-purple-500 opacity-20 blur-3xl rounded-full z-10" />
      <div className="absolute right-0 bottom-1/4 w-[200px] h-[200px] bg-cyan-400 opacity-20 blur-3xl rounded-full z-10" />
      <SoundBars position="left" />
      <SoundBars position="right" />

      <Canvas
        shadows
        camera={{ position: [4, 2, 5], fov: 45 }}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#88ccff" />
        <Sparkles count={80} scale={15} speed={1.2} size={3} color="#ffffff" />
        <fog attach="fog" args={['#0d0d0d', 8, 20]} />

        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.81, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial metalness={0.6} roughness={0.1} color="#111" />
        </mesh>

        <Stage environment={null} intensity={0.6} shadows={false}>
          <Float speed={2.4} rotationIntensity={0.4} floatIntensity={0.6}>
            <HeadphoneModel />
            <Text
              position={[0, 1.2, 0]}
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              Model X500
            </Text>
          </Float>
        </Stage>

        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.1} darkness={0.8} />
        </EffectComposer>

        <Environment preset="city" />
        <OrbitControls enablePan={false} enableZoom={false} enableRotate />
      </Canvas>

      {!showHero && showMainText && (
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white pointer-events-none px-[4vw] transition-opacity duration-1000 ${
            fadeOutText ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="min-h-[6vh] animate-fade-in-up">
            <h1
              className="text-[2.5rem] sm:text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-extrabold tracking-wide drop-shadow-xl mb-[1rem]"
              style={{ fontFamily: "'Saira Condensed', sans-serif" }}
            >
              <Typewriter
                options={{ autoStart: true, loop: false, delay: 50, cursor: '' }}
                onInit={(typewriter) => {
                  setTypewriterStarted(true);
                  if (userInteracted) playWhoosh();
                  typewriter
                  .typeString(`bo<span style="color: #ef4444;">A</span>t 2.0`)
                  .start();
                }}
              />
            </h1>
          </div>
          <p
            className={`text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] lg:text-[1.8rem] text-gray-300 transition-all duration-1000 ease-out tracking-wide ${
              showSubText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 300 }}
          >
            Engineered to Feel Every Note.
          </p>
        </div>
      )}

      {showHero && (
        <div className="absolute inset-0 z-30 animate-fade-in">
          <Hero onExplore={onLoaded} />
        </div>
      )}
    </div>
  );
};

export default Loader;
