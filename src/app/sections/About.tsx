import styled from "@emotion/styled";
import React, { useRef, useEffect, useState } from "react";
import AboutExperience from "../components/AboutExperience";

const AboutSection = styled.section`
  position: relative;
`;

const AboutSectionWrapper = styled.div`
  max-width: 1464px;
  padding: 120px 32px;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    padding: 60px 32px 120px;
  }
  @media screen and (max-width: 767px) {
    padding: 60px 32px 120px;
  }
`;

const AboutSectionLayout = styled.div`
  display: flex;
  position: relative;
  align-items: stretch;
  justify-content: space-between;
  column-gap: 80px;
  @media screen and (max-width: 1200px) {
    column-gap: 40px;
  }
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const SubContainer = styled.div``;

const AboutExperienceContainer = styled.div`
  flex: 1;
  /* width: 100%; */
  height: 700px;
  @media screen and (max-width: 1200px) {
    height: 500px;
  }
  @media screen and (max-width: 767px) {
    height: 300px;
  }
`;

const AnimatedContainer = styled.div<{ isVisible: boolean }>`
  flex: 1;
  transform-origin: center top;
  transform: rotate3d(
    1,
    0,
    0,
    ${(props) => (props.isVisible ? "0deg" : "-90deg")}
  );
  transition: transform 2000ms cubic-bezier(0.19, 1, 0.22, 1);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition-property: transform, opacity;
`;

const Description = styled.div`
  color: white;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 40px;

  > p {
    margin-bottom: 1em;
  }
`;

const SubTitle = styled.h3`
  color: white;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin-bottom: 30px;
`;

const SkillItem = styled.li`
  color: white;
  padding: 6px 8px;
  font-size: 14px;
  border: 1px #666 solid;
  transition: all 0.5s ease;
`;

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutContainerRef = useRef<HTMLDivElement>(null);

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
        threshold: 1,
      }
    );

    if (aboutContainerRef.current) {
      observer.observe(aboutContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AboutSection id="about">
      <AboutSectionWrapper>
        <AboutSectionLayout>
          <AnimatedContainer
            ref={aboutContainerRef}
            isVisible={isVisible}
          >
            <SubContainer>
              <SubTitle>About</SubTitle>
              <Description>
                <p>
                  様々な企業のプロモーションやブランディングに伴うWebサイト制作・リニューアル、アプリケーション開発、LP制作・改修から運用・保守まで幅広く対応してきました。
                </p>
                <p>
                  WordPressテーマ開発を中心とした3年半の実務経験の中で、フロントエンド技術の変遷に合わせて自身のスキルセットを継続的に拡大。
                </p>
                <p>
                  初期はjQueryやgulp.jsを活用したサイト構築から始まり、その後VueやTailwindCSS、Viteなどのモダンフレームワークやビルドツールを実務に取り入れてきました。
                </p>
                <p>
                  プロセス全体をスムーズに進行できるように、担当範囲の業務に縛られることなく、ディレクターやデザイナーと密に連携し、各工程の背景情報を取りに行くことを心がけています。
                </p>
              </Description>
            </SubContainer>

            <SubContainer>
              <SubTitle>Skills</SubTitle>
              <SkillsList>
                <SkillItem>HTML</SkillItem>
                <SkillItem>CSS</SkillItem>
                <SkillItem>SCSS</SkillItem>
                <SkillItem>TailwindCSS</SkillItem>
                <SkillItem>JavaScript</SkillItem>
                <SkillItem>Vue.js</SkillItem>
                <SkillItem>GSAP</SkillItem>
                <SkillItem>PHP</SkillItem>
                <SkillItem>Vite</SkillItem>
                <SkillItem>WordPress</SkillItem>
                <SkillItem>Figma</SkillItem>
                <SkillItem>XD</SkillItem>
              </SkillsList>
            </SubContainer>
          </AnimatedContainer>
          <AboutExperienceContainer>
            <AboutExperience />
          </AboutExperienceContainer>
        </AboutSectionLayout>
      </AboutSectionWrapper>
    </AboutSection>
  );
}
