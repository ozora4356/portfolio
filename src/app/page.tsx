"use client";

import styled from "@emotion/styled";
import Hero from "./sections/Hero";
import Works from "./sections/Works";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import About from "./sections/About";
import MouseTracker from "./components/MouseTracker";
import Footer from "./sections/Footer";

const Main = styled.main`
  background-color: #111111;
`;

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Main>
      <MouseTracker />
      <Hero />
      <Works />
      <About />
      <Footer />
    </Main>
  );
}
