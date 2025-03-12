import { useState, useEffect } from "react";

const BREAKPOINTS = {
  MOBILE: 768,
} as const;

interface MousePosition {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE);
    };

    // 初期チェック
    checkMobile();

    // リサイズ時のチェック
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  // スマホの場合は中央位置（0, 0）を返す
  return isMobile ? { x: 0, y: 0 } : mousePosition;
};
