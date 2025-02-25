"use client";

import styled from "@emotion/styled";
import Hero from "./sections/Hero";
import Works from "./sections/Works";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const Main = styled.main`
  background-color: #111111;
`;

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({});

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
      <Hero />
      <Works />
    </Main>
  );
}
