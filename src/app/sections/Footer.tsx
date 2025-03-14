import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { InstancedMouseEffect } from "../lib/three/InstancedMouseEffect";

const FooterSection = styled.section`
  width: 100%;
  padding: 0;
  margin: 0 auto;
  position: relative;
  height: 80vh;
  overflow: hidden;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    height: 60vh;
  }
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  #canvas-wrapper {
    width: 100%;
    height: 100%;
  }
  canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
    pointer-events: auto;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  right: 80px;
  bottom: 40px;
  z-index: 1;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    right: 32px;
    bottom: 32px;
  }
  p {
    opacity: 0.6;
    font-size: 80px;
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    font-family: var(--main-site-font);
    @media screen and (max-width: 1024px) {
      font-size: 64px;
    }
    @media screen and (max-width: 767px) {
      font-size: 40px;
    }
  }
`;

const Footer = () => {
  const effectRef = useRef<InstancedMouseEffect | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const effect = new InstancedMouseEffect({
      speed: 1,
      frequency: 1,
      mouseSize: 0.75,
      rotationSpeed: 1,
      rotationAmount: 0,
      mouseScaling: 0.5,
      mouseIndent: window.innerWidth < 768 ? 0 : 1,
      // color: "#111",
      color:"rgb(31, 34, 51)",
      shape: "square",
    });

    effectRef.current = effect;

    const canvas = document.getElementById("canvas");
    canvas?.addEventListener("click", handleScrollToTop);

    return () => {
      if (effectRef.current?.rendering) {
        effectRef.current.rendering.dispose();
      }
      canvas?.removeEventListener("click", handleScrollToTop);
    };
  }, []);

  return (
    <FooterSection onClick={handleScrollToTop} id="footer">
      <CanvasWrapper>
        <div id="canvas-wrapper">
          <canvas id="canvas" />
        </div>
      </CanvasWrapper>
      <ContentWrapper>
        <p>Back to Top</p>
      </ContentWrapper>
    </FooterSection>
  );
};

export default Footer;
