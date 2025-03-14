import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const HeroSection = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
  font-family: var(--main-site-font);
  margin-top: -100vh;
`;

const HeroSectionWrapper = styled.div`
  position: relative;
  max-width: 1464px;
  height: 100%;
  margin: 0 auto;
  padding-inline: 32px;
`;

const CatchPhrase = styled.h1`
  position: absolute;
  top: 26%;
  left: 32px;
  @media screen and (max-width: 767px) {
    top: initial;
    left: initial;
    inset: 0;
    margin: auto;
    height: fit-content;
  }
`;

const TextSpan = styled.p<{ isVisible: boolean; delay?: number }>`
  color: #fff;
  display: block;
  line-height: 1.05;
  font-size: 80px;
  opacity: 0.9;
  clip-path: ${(props) => (props.isVisible ? "polygon(0 0, 200% 0, 0 200%);" : "polygon(0 0, 0 0, 0 0);")};
  transition: clip-path 1800ms cubic-bezier(0.19, 1, 0.22, 1);
  transition-delay: 700ms;
  @media screen and (max-width: 767px) {
    text-align: center;
    font-size: 40px;
    opacity: 0.9;
  }
`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HeroSection
      id="hero"
      ref={sectionRef}
    >
      <HeroSectionWrapper>
        <CatchPhrase>
          <TextSpan isVisible={isVisible}>See Deeper, </TextSpan>
          <TextSpan isVisible={isVisible}>Create Better</TextSpan>
        </CatchPhrase>
      </HeroSectionWrapper>
    </HeroSection>
  );
}
