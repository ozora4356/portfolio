import styled from "@emotion/styled";

const AboutSection = styled.section`
  height: 100vh;
  max-width: 1280px; // 80rem -> 1280px
  padding: 128px 32px; // 8rem 2rem -> 128px 32px
  margin: 0 auto;
`;

const Title = styled.h1`
  color: white;
  font-size: 36px; // 2.25rem -> 36px
  font-weight: 700; // font-bold
`;

export default function About() {
  return (
    <AboutSection id="about">
      <Title>About</Title>
    </AboutSection>
  );
}
