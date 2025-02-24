"use client";

import { Html } from "@react-three/drei";
import { ScaleLoader } from "react-spinners";

const CanvasLoader = () => {
  return (
    <Html
      center
      prepend
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScaleLoader color="#f1f1f1" width={4} />
    </Html>
  );
};

export default CanvasLoader;
