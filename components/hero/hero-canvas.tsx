"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralParticles({ count = 800 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spherical distribution
      const radius = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    mouseRef.current.x += (pointer.x * 2 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y * 2 - mouseRef.current.y) * 0.05;

    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.001;
      arr[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i) * 0.001;
      arr[i3 + 2] += velocities[i3 + 2];

      // Mouse influence
      arr[i3] += mouseRef.current.x * 0.003;
      arr[i3 + 1] += mouseRef.current.y * 0.003;

      // Keep in bounds
      const dist = Math.sqrt(
        arr[i3] ** 2 + arr[i3 + 1] ** 2 + arr[i3 + 2] ** 2
      );
      if (dist > 8) {
        arr[i3] *= 0.99;
        arr[i3 + 1] *= 0.99;
        arr[i3 + 2] *= 0.99;
      }
    }

    posAttr.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.03;
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </points>
  );
}

function NeuralConnections() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const nodesCount = 40;

  const [nodePositions] = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < nodesCount; i++) {
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nodes.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        )
      );
    }
    return [nodes];
  }, []);

  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 3) {
          positions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, [nodePositions]);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    lineRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.1;
  });

  return (
    <lineSegments ref={lineRef} geometry={lineGeometry}>
      <lineBasicMaterial
        color="#7c3aed"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

function FloatingGrid() {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.x = -Math.PI / 2.5;
    gridRef.current.position.y = -3 + Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
  });

  return (
    <mesh ref={gridRef} position={[0, -3, 0]}>
      <planeGeometry args={[30, 30, 30, 30]} />
      <meshBasicMaterial
        color="#7c3aed"
        wireframe
        transparent
        opacity={0.04}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[5, 5, 5]} color="#7c3aed" intensity={0.5} />
        <pointLight position={[-5, -5, 3]} color="#06b6d4" intensity={0.3} />
        <NeuralParticles count={600} />
        <NeuralConnections />
        <FloatingGrid />
      </Canvas>
    </div>
  );
}
