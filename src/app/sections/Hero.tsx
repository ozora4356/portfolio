import styled from "@emotion/styled";
import HeroExperience from "../components/HeroExperience";
import ScrollNav from "../components/ScrollNav";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const HeroBackGround = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(100% 100% at 100% 5%, rgba(114, 164, 127, 0.2) 0%, transparent 100%), #111;
`;

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  font-family: ${poppins.style.fontFamily};
`;

const ExperienceContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  inset: 0;
`;

export default function Hero() {
  return (
    <HeroSection>
      <HeroBackGround />
      <ExperienceContainer>
        <HeroExperience />
        <ScrollNav />
      </ExperienceContainer>
    </HeroSection>
  );
}
