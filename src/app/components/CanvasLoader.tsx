import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="canvas-loader"/>
      <p style={{ fontSize: 14, color: "#f1f1f1", fontWeight: 700, marginTop: 40 }}>
        {progress ? `${progress.toFixed(0)}%` : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
