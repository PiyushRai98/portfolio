"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { theme } from "@/lib/theme";

function NeuralParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 960;
    const array = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = 1.4 + Math.random() * 3.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.66;
      array[index * 3 + 2] = radius * Math.cos(phi) * 0.72;
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.055;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color={theme.accent.cyan}
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function AgentCore() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.25;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.32}>
        <mesh>
          <torusKnotGeometry args={[1.05, 0.012, 210, 12, 3, 7]} />
          <meshBasicMaterial color={theme.accent.sapphire} transparent opacity={0.82} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.92, 0.006, 12, 160]} />
          <meshBasicMaterial color={theme.accent.cyan} transparent opacity={0.55} />
        </mesh>
        <mesh rotation={[1.06, 0.58, 0.2]}>
          <torusGeometry args={[2.55, 0.004, 12, 160]} />
          <meshBasicMaterial color={theme.accent.sapphire} transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.3], fov: 48 }}
      dpr={[1, 1.65]}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[3, 3, 4]} intensity={2.4} color={theme.accent.cyan} />
      <pointLight position={[-5, -2, 2]} intensity={1.8} color={theme.accent.sapphire} />
      <mesh position={[0, 0, -2.4]}>
        <planeGeometry args={[12, 7]} />
        <meshBasicMaterial color={theme.surface.recessed} transparent opacity={0.28} />
      </mesh>
      <NeuralParticles />
      <AgentCore />
    </Canvas>
  );
}

const DynamicScene = dynamic(() => Promise.resolve(Scene), {
  ssr: false,
});

export function NeuralScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-75 [mask-image:radial-gradient(circle_at_62%_38%,black,transparent_68%)]">
        <DynamicScene />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_36%,rgb(var(--accent-cyan-rgb)_/_0.16),transparent_26rem),radial-gradient(circle_at_38%_58%,rgb(var(--accent-sapphire-rgb)_/_0.12),transparent_24rem)]" />
      <div className="absolute inset-0 bg-grid-lines bg-[size:76px_76px] opacity-[0.16] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]" />
    </div>
  );
}
