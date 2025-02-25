import styled from "@emotion/styled";
import React from "react";

const AboutSection = styled.section`
  position: relative;
  max-width: 1464px;
  padding: 160px 32px;
  margin: 0 auto;
`;

const AboutSectionLayout = styled.div`
  position: relative;
  /* display: grid;
  grid-template-columns: auto 50%;
  align-items: center;
  justify-content: space-between; */
`;


const Title = styled.h2`
  color: white;
  width: fit-content;
  line-height: 0.9;
  font-size: 80px;
  font-weight: 700;
  border-left: 4px solid var(--main-site-color);
  padding: 16px 32px;
  `;
  const Description = styled.p`
    color: white;
    font-size: 20px;
    font-weight: 500;
    margin-top: 80px;
  `;

const About = () => {
  return (
    <AboutSection>
      <AboutSectionLayout>
        <Title>
          WHAT
          <br />
          I DO
        </Title>
        <Description>
          株式会社フライングハイワークスで<br/>Webサイトの新規制作やリニューアル、LP制作、改修、運用、保守を担当。<br/>
          その他、自社サイトリニューアル、自社サイトのSEO対策などにも携わりました。
        </Description>
      </AboutSectionLayout>
    </AboutSection>
  );
};

export default About;
