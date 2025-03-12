"use client";

import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import { Suspense, useMemo, useState, useEffect } from "react";
import AboutModel from "../components/AboutModel";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";

const BREAKPOINTS = {
  MOBILE: 768, // モバイル用ブレークポイント
  TABLET: 1024, // タブレット用ブレークポイント
} as const;

const Scene = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // 初期値の設定
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modelProps = useMemo(() => {
    const viewportSize =
      screenWidth < BREAKPOINTS.MOBILE
        ? "mobile"
        : screenWidth < BREAKPOINTS.TABLET
        ? "tablet"
        : "desktop";

    switch (viewportSize) {
      case "mobile":
        return {
          scale: 1.2,
          position: [-20, -60, 0] as [number, number, number],
        };

      case "tablet":
        return {
          scale: 0.9,
          position: [-40, 0, 0] as [number, number, number],
        };

      case "desktop":
      default:
        return {
          scale: 1,
          position: [-50, 0, 0] as [number, number, number],
        };
    }
  }, [screenWidth]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 140, 800]}
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
    <Canvas
      camera={{ position: [0, 140, 800], fov: 75 }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Scene />
      </Suspense>
    </Canvas>
  );
};

export default AboutExperience;
