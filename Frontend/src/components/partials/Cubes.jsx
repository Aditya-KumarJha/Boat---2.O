import React from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  MeshWobbleMaterial,
  ContactShadows,
  RoundedBox,
  Environment,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Cubes = () => {
  return (
    <div className="w-full h-full"> 
      <Canvas
        shadows
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [6, 6, 6], fov: 45 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.6} />

        <Environment preset="sunset" />

        <RoundedBox
          args={[4, 4, 4]}
          radius={0.3}
          smoothness={4}
          castShadow
          receiveShadow
        >
          <MeshWobbleMaterial
            color="#10b981"
            factor={0.4}
            speed={1.2}
            metalness={0.6}
            roughness={0.1}
          />
        </RoundedBox>

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.3}
          scale={10}
          blur={2.5}
          far={5}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
          target={[0, 0, 0]}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            intensity={1.2}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Cubes;
