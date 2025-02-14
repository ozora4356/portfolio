import React from "react";
import { Html } from "@react-three/drei";

const CanvasLoader = () => {
  return (
    <Html as="div" center className="flex items-center justify-center">
      <span className="canvas-loader"/>
      <p style={{ fontSize: 14, color: "#F1F5F9", fontWeight: 800, marginTop: 40 }}></p>
    </Html>
  );
};

export default CanvasLoader;
