import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";

interface Props {
  onLoaded?: () => void;
}

const CanvasLoader = ({ onLoaded }: Props) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      onLoaded?.();
    }
  }, [progress, onLoaded]);

  return (
    <Html
      as="div"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: 32,
          color: "#f1f1f1",
          fontWeight: 700,
          marginTop: 40,
        }}
      >
        {progress ? `${progress.toFixed(0)}%` : "Loading..."}
      </p>
    </Html>
  );
};

export default CanvasLoader;
