import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import HeroModel from "../components/HeroModel";
import CanvasLoader from "../components/CanvasLoader";
import { Leva, useControls } from "leva";

export default function Hero() {
  const x = useControls({
    cameraPositionX: {
      value: 42,
      min: -100,
      max: 100,
    },
    cameraPositionY: {
      value: 0,
      min: -100,
      max: 100,
    },
    cameraPositionZ: {
      value: 40,
      min: -100,
      max: 100,
    },
    positionX: {
      value: 43,
      min: -100,
      max: 100,
    },
    positionY: {
      value: -8,
      min: -100,
      max: 100,
    },
    positionZ: {
      value: 4,
      min: -100,
      max: 100,
    },
    rotationX: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
    },
    rotationY: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
    },
    rotationZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
    },
    scale: {
      value: 3,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });
  
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col gap-3 mt-20">
        <p className="text-white text-center text-xl font-medium">
          Welcome to my portfolio
        </p>
        <h1 className="text-white text-center text-4xl font-medium">
          Im a Software Engineer
        </h1>
        <div className="w-full h-full absolute inset-0">
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
      </div>
    </section>
  );
}
