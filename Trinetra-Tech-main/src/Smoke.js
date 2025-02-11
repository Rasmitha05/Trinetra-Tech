import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Smoke = () => {
  const particlesRef = useRef();
  const particles = useRef([]);

  // Initial particle positions and other properties
  useEffect(() => {
    particles.current = Array.from({ length: 100 }).map(() => ({
      position: new THREE.Vector3(
        Math.random() * 4 - 2,
        Math.random() * 4,
        Math.random() * 4 - 2
      ),
      velocity: new THREE.Vector3(
        Math.random() * 0.2 - 0.1,
        Math.random() * 0.1 + 0.05, // Gentle upward velocity
        Math.random() * 0.2 - 0.1
      ),
      size: Math.random() * 0.3 + 0.1, // Random size for variation
      opacity: Math.random() * 0.5 + 0.2, // Random initial opacity
    }));
  }, []);

  // Animate particles on each frame
  useFrame(() => {
    particles.current.forEach((particle, index) => {
      // Move particle upwards and slightly spread out
      particle.position.add(particle.velocity);

      // Gradually reduce opacity to simulate fading
      particle.opacity -= 0.001;

      // Recycle particles when they go out of view
      if (particle.position.y > 4) {
        particle.position.y = -2; // Reset to bottom when off-screen
        particle.opacity = Math.random() * 0.5 + 0.2; // Reset opacity
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {particles.current.map((particle, i) => (
        <mesh
          key={i}
          position={particle.position}
          scale={[particle.size, particle.size, particle.size]}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            transparent
            opacity={particle.opacity}
            color="#cccccc"
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Smoke;
