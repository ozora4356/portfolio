"use client";

import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import AboutModel from "../components/AboutModel";
import { Canvas, useThree } from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";

const VIEWPORT_BREAKPOINTS = {
  MOBILE: 10,
  TABLET: 15,
} as const;

const Scene = () => {
  const { viewport } = useThree();
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
          scale: 1,
          position: [0, 0, 0] as [number, number, number],
        };
    }
  }, [viewport.width]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 140, 760]}
      />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.2, 0.1]}
        azimuth={[-1, 0.75]}
        speed={1}
        zoom={1}
        snap
      >
        <AboutModel
          scale={modelProps.scale}
          position={modelProps.position}
          rotation={[-Math.PI, -1.1, 0]}
          />
      </PresentationControls>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={4}
      />
    </>
  );
};

const AboutExperience = () => {
  return (
    <Canvas>
      <Suspense fallback={<CanvasLoader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default AboutExperience;
