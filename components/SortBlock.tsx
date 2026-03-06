"use client";

import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

export default function SortBlock({ value, index, totalBlocks, isActive, maxValue, isSorting }: any) {
  const MAX_VISUAL_HEIGHT = 10;
  const safeMaxValue = Math.max(maxValue, 1); 
  
  const visualHeight = value === 0 ? 0.2 : (value / safeMaxValue) * MAX_VISUAL_HEIGHT;

  const posX = index - totalBlocks / 2 + 0.5;
  const posY = visualHeight / 2; 
  const posZ = isActive ? 1.5 : 0; 

  const hue = Math.floor((value / safeMaxValue) * 250);

  let blockColor = `hsl(${hue}, 80%, 60%)`;
  if (value === 0) {
    blockColor = `hsl(210, 20%, 65%)`;
  } else if (isActive) {
    blockColor = `hsl(0, 100%, 60%)`;
  }

  const springs = useSpring({
    position: [posX, posY, posZ] as [number, number, number], 
    color: blockColor,
    emissiveIntensity: isActive ? 0.6 : 0,
    config: { mass: 1, tension: 120, friction: 14 },
    immediate: !isSorting 
  });

  return (
    <animated.mesh position={springs.position as any}>
      <boxGeometry args={[0.8, visualHeight, 0.8]} />
      <animated.meshStandardMaterial 
        color={springs.color} 
        emissive="#ff0000" 
        emissiveIntensity={springs.emissiveIntensity} 
      />
      {value > 0 && (
        <Text 
          position={[0, visualHeight / 2 + 0.6, 0]} 
          fontSize={0.8} 
          color="white" 
          outlineWidth={0.05} 
          outlineColor="black"
        >
          {value} 
        </Text>
      )}
    </animated.mesh>
  );
}