"use client";

import styled from "@emotion/styled";
import { useMousePosition } from "../hooks/useMousePosition";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Cursor = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--main-site-color);
  pointer-events: none;
  z-index: 9999;
  opacity: 0.6;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const MouseTracker = () => {
  const { x, y } = useMousePosition();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみwindowオブジェクトを参照
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    setIsMounted(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // マウントされるまでは何も表示しない
  if (!isMounted) return null;

  return (
    <Cursor
      animate={{
        x: (x * windowSize.width) / 2 + windowSize.width / 2 - 10,
        y: (-y * windowSize.height) / 2 + windowSize.height / 2 - 10,
      }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 150,
        mass: 0.1,
      }}
    />
  );
};

export default MouseTracker;
