import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useLayoutEffect, useState } from "react";
import HeroModel from "../components/HeroModel";
import CanvasLoader from "../components/CanvasLoader";
import { Leva, useControls } from "leva";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useControls({
    cameraPositionX: {
      value: isMobile ? 20 : 42,
      min: -100,
      max: 100,
    },
    cameraPositionY: {
      value: 0,
      min: -100,
      max: 100,
    },
    cameraPositionZ: {
      value: isMobile ? 60 : 40,
      min: -100,
      max: 100,
    },
    positionX: {
      value: isMobile ? 20 : 49,
      min: -100,
      max: 100,
    },
    positionY: {
      value: isMobile ? -8 : -6,
      min: -100,
      max: 100,
    },
    positionZ: {
      value: 4,
      min: -100,
      max: 100,
    },
    rotationX: {
      value: 0.08,
      min: -10,
      max: 10,
      step: 0.01,
    },
    rotationY: {
      value: -1.8,
      min: -10,
      max: 10,
      step: 0.01,
    },
    rotationZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.01,
    },
    scale: {
      value: isMobile ? 4 : 4,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="md:w-full mt-[16vh] md:mt-[30vh] max-w-7xl mx-4 md:mx-auto">
        <div className="w-fit mx-auto md:mx-0">
          <p className="text-white text-center md:text-2xl text-base font-medium">
            Welcome to my portfolio
          </p>
          <h1 className="text-white text-center md:text-5xl text-3xl font-medium mt-2">
            Im a Web Developer
          </h1>
        </div>
      </div>
      <div className="w-full h-[110vh] absolute inset-0">
        <Leva />
        <Canvas>
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera
              makeDefault
              position={[
                x.cameraPositionX,
                x.cameraPositionY,
                x.cameraPositionZ,
              ]}
            />
            <HeroModel
              scale={x.scale}
              position={[x.positionX, x.positionY, x.positionZ]}
              rotation={[x.rotationX, x.rotationY, x.rotationZ]}
            />
            <ambientLight intensity={1} />
            <directionalLight
              position={[10, 10, 10]}
              intensity={4}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
