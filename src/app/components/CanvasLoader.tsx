import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center className="flex items-center justify-center">
      <span className="canvas-loader"/>
      <p style={{ fontSize: 14, color: "#f1f1f1", fontWeight: 800, marginTop: 40 }}>
        {progress ? `${progress.toFixed(2)}%` : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
