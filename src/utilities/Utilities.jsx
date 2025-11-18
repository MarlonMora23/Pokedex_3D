import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

// Get colors and shapes for each type
const getTypeAttributes = (type) => {
  switch (type) {
    case "fire":
      return { color: "#ff5722", shape: "cone" };
    case "water":
      return { color: "#1e88e5", shape: "sphere" };
    case "grass":
      return { color: "#43a047", shape: "plane" };
    case "electric":
      return { color: "#fdd835", shape: "triangle" };
    case "ice":
      return { color: "#4dd0e1", shape: "box" };
    case "poison":
      return { color: "#8e24aa", shape: "sphere" };
    case "ground":
      return { color: "#c9914d", shape: "box" };
    case "flying":
      return { color: "#64b5f6", shape: "cone" };
    case "psychic":
      return { color: "#d81b60", shape: "sphere" };
    case "bug":
      return { color: "#7cb342", shape: "triangle" };
    case "rock":
      return { color: "#795548", shape: "box" };
    case "ghost":
      return { color: "#5e35b1", shape: "sphere" };
    case "dragon":
      return { color: "#3949ab", shape: "cone" };
    case "dark":
      return { color: "#424242", shape: "box" };
    case "steel":
      return { color: "#607d8b", shape: "box" };
    case "fairy":
      return { color: "#ec407a", shape: "sphere" };
    case "fighting":
      return { color: "#e53935", shape: "triangle" };
    case "normal":
      return { color: "#9e9e9e", shape: "sphere" };
    default:
      return { color: "#9e9e9e", shape: "sphere" };
  }
};

// 3D component for the symbol
function Symbol3D({ type }) {
  const ref = useRef();
  const { color, shape } = getTypeAttributes(type);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.rotation.x += 0.005;
    }
  });

  let geometry;
  switch (shape) {
    case "cone":
      geometry = <coneGeometry args={[0.5, 1, 16]} />;
      break;
    case "sphere":
      geometry = <sphereGeometry args={[0.5, 32, 32]} />;
      break;
    case "plane":
      geometry = <planeGeometry args={[1, 1]} />;
      break;
    case "triangle":
      geometry = <coneGeometry args={[0.5, 1, 3]} />;
      break;
    case "box":
      geometry = <boxGeometry args={[0.8, 0.8, 0.8]} />;
      break;
    default:
      geometry = <sphereGeometry args={[0.5, 32, 32]} />;
  }

  return (
    <mesh ref={ref}>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

// 3D Scene that renders the symbol
function PokemonScene({ type }) {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={0.8} />
      <pointLight position={[-2, -2, -5]} intensity={0.4} />
      <Symbol3D type={type} />
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight={600}
      >
        {type.toUpperCase()}
      </Text>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}

export default PokemonScene ;