import { CameraControls, PerspectiveCamera, Text } from "@react-three/drei";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroModel from "../components/HeroModel";
import { Leva, useControls } from "leva";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "./CanvasLoader";

const HeroExperience = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
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
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    cameraPositionY: {
      value: 0,
      min: -10,
      max: 10,
      step: 1,
    },
    cameraPositionZ: {
      value: 11,
      min: -10,
      max: 100,
      step: 1,
    },
    positionX: {
      value: isMobile ? -8 : 3.4,
      min: -100,
      max: 100,
    },
    positionY: {
      value: isMobile ? -8 : -2.5,
      min: -100,
      max: 100,
    },
    positionZ: {
      value: 0,
      min: -100,
      max: 100,
    },
    rotationX: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.01,
    },
    rotationY: {
      value: 0,
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
      value: isMobile ? 4 : 1.3,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

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
        position={[x.cameraPositionX, x.cameraPositionY, x.cameraPositionZ]}
      />
      <HeroModel
        scale={x.scale}
        position={[x.positionX, x.positionY, x.positionZ]}
        rotation={[x.rotationX, x.rotationY, x.rotationZ]}
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
