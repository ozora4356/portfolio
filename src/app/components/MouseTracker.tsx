"use client";

import styled from "@emotion/styled";
import { useMousePosition } from "../hooks/useMousePosition";
import { motion } from "framer-motion";

const Cursor = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--main-site-color);
  pointer-events: none;
  z-index: 9999;
  opacity: 0.6;
`;

const MouseTracker = () => {
  const { x, y } = useMousePosition();

  return (
    <Cursor
      animate={{
        x: (x * window.innerWidth) / 2 + window.innerWidth / 2 - 10,
        y: (-y * window.innerHeight) / 2 + window.innerHeight / 2 - 10,
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
