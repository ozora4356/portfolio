"use client";

import styled from "@emotion/styled";
import Hero from "./sections/Hero";
import About from "./sections/About";

const Main = styled.main`
  background-color: #111111;
`;

const MainBackground = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(100% 100% at 100% 5%, rgba(150, 150, 150, .2) 0%, transparent 100%), #111;
`;

export default function Home() {
  return (
    <Main>
      <MainBackground />
      <Hero />
      <About />
    </Main>
  );
}
