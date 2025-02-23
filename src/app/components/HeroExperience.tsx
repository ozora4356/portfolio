"use client";

import { PerspectiveCamera, Text } from "@react-three/drei";
import { Suspense } from "react";
import HeroModel from "../components/HeroModel";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";

const HeroExperience = () => {
  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
      <Text
        font={"fonts/Poppins-Black.ttf"}
        color="white"
        position={[-3.8, 2, 0]}
        fontSize={0.5}
        rotation={[0, Math.PI / 7, 0]}
      >
        Welcome to my portfolio{"\n"}
        Im a Web Developer
      </Text>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 11]}
      />
      <HeroModel
        scale={1.3}
        position={[3.4, -2, 0]}
        rotation={[0.10, 0, 0]}
      />
      <ambientLight intensity={1} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={3}
      />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
