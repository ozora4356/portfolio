import styled from "@emotion/styled";
import HeroExperience from "../components/HeroExperience";
import ScrollNav from "../components/ScrollNav";

const HeroSection = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
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
      <ExperienceContainer>
        <HeroExperience />
        <ScrollNav />
      </ExperienceContainer>
    </HeroSection>
  );
}
