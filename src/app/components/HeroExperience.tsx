"use client";

import { PerspectiveCamera, Text } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import HeroModel from "../components/HeroModel";
import { Canvas, useThree } from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";

const VIEWPORT_BREAKPOINTS = {
  MOBILE: 10,
  TABLET: 15,
} as const;

const Scene = () => {
  const { viewport } = useThree();

  const textProps = useMemo(() => {
    const viewportSize =
      viewport.width < VIEWPORT_BREAKPOINTS.MOBILE
        ? "mobile"
        : viewport.width < VIEWPORT_BREAKPOINTS.TABLET
        ? "tablet"
        : "desktop";

    switch (viewportSize) {
      case "mobile":
        return {
          position: [0, 3.5, 0] as [number, number, number],
          fontSize: 0.4,
          rotation: [0, 0, 0] as [number, number, number],
        };

      case "tablet":
        return {
          position: [2, 2, 0] as [number, number, number],
          fontSize: 0.4,
          rotation: [0, -Math.PI / 24, 0] as [number, number, number],
        };

      case "desktop":
      default:
        return {
          position: [4, 2, 0] as [number, number, number],
          fontSize: 0.45,
          rotation: [0, -Math.PI / 12, 0] as [number, number, number],
        };
    }
  }, [viewport.width]);

  const modelProps = useMemo(() => {
    const viewportSize =
      viewport.width < VIEWPORT_BREAKPOINTS.MOBILE
        ? "mobile"
        : viewport.width < VIEWPORT_BREAKPOINTS.TABLET
        ? "tablet"
        : "desktop";

    switch (viewportSize) {
      case "mobile":
        return {
          scale: 1,
          position: [0, -2.5, 0] as [number, number, number],
        };

      case "tablet":
        return {
          scale: 1.2,
          position: [-2, -2, 0] as [number, number, number],
        };

      case "desktop":
      default:
        return {
          scale: 1.3,
          position: [-3, -2, 0] as [number, number, number],
        };
    }
  }, [viewport.width]);

  return (
    <>
      <Text
        font={"fonts/Poppins-Black.ttf"}
        color="white"
        {...textProps}
        textAlign="center"
      >
        Welcome to my portfolio{"\n"}
        Im a Web Developer
      </Text>
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 11]}
      />
      <HeroModel
        scale={modelProps.scale}
        position={modelProps.position}
        rotation={[0.05, -1.5, 0]}
      />
      <ambientLight intensity={1} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={3}
      />
    </>
  );
};

const HeroExperience = () => {
  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
