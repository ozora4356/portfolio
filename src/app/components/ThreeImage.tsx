import { useRef } from "react";
import { useThreeImage } from "../hooks/useThreeImage";

interface ThreeImageProps {
  src: string;
  alt: string;
}

export const ThreeImage: React.FC<ThreeImageProps> = ({ src }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleMouseMove, handleMouseEnter, handleMouseLeave } = useThreeImage(
    {
      containerRef,
      src,
    }
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
