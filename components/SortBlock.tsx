"use client";

import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

// Tambahkan prop 'maxValue' untuk mengetahui angka terbesar di array saat ini
export default function SortBlock({ value, index, totalBlocks, isActive, maxValue }: any) {
  
  // --- TRIK NORMALISASI SKALA ---
  // Kita patok batas tinggi visual di layar maksimal 10.
  const MAX_VISUAL_HEIGHT = 10;
  
  // Rumus: (Nilai_Saat_Ini / Nilai_Terbesar) * Tinggi_Maksimal
  // Jadi berapapun angkanya (misal 500), tingginya nggak akan pernah lewat dari 10!
  const visualHeight = (value / maxValue) * MAX_VISUAL_HEIGHT;

  const posX = index - totalBlocks / 2 + 0.5;
  const posY = visualHeight / 2; 
  const posZ = isActive ? 1.5 : 0; 

  const springs = useSpring({
    position: [posX, posY, posZ] as [number, number, number], 
    color: isActive ? "#ff3333" : `hsl(${visualHeight * 25}, 80%, 60%)`,
    emissiveIntensity: isActive ? 0.6 : 0,
    config: { mass: 1, tension: 120, friction: 14 } 
  });

  return (
    <animated.mesh position={springs.position as any}>
      <boxGeometry args={[0.8, visualHeight, 0.8]} />
      
      <animated.meshStandardMaterial 
        color={springs.color} 
        emissive="#ff0000" 
        emissiveIntensity={springs.emissiveIntensity} 
      />
      
      <Text 
        position={[0, visualHeight / 2 + 0.6, 0]} 
        fontSize={0.8} 
        color="white" 
        outlineWidth={0.05} 
        outlineColor="black"
      >
        {value} 
      </Text>
    </animated.mesh>
  );
}