import styled from "@emotion/styled";
import React, { useRef, useEffect, useState } from "react";

const AboutSection = styled.section`
  position: relative;
`;

const AboutSectionWrapper = styled.div`
  max-width: 1464px;
  padding: 120px 32px 240px;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    padding: 60px 32px 140px;
  }
  @media screen and (max-width: 767px) {
    padding: 60px 32px 140px;
  }
`;

const AboutSectionLayout = styled.div`
  /* display: flex; */
  position: relative;
  align-items: stretch;
  justify-content: space-between;
  column-gap: 80px;
  z-index: 1;
  @media screen and (max-width: 1200px) {
    column-gap: 40px;
  }
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

const DescriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 80px;
  /* width: 50%; */
  z-index: 1;
  @media screen and (max-width: 767px) {
    width: 100%;
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

const SubContainer = styled.div<{ isVisible: boolean }>`
  clip-path: ${(props) =>
    props.isVisible
      ? "polygon(0 0, 200% 0, 0 200%);"
      : "polygon(0 0, 0 0, 0 0);"};
  transition: clip-path 1800ms cubic-bezier(0.19, 1, 0.22, 1);
`;

const Description = styled.div`
  color: white;
  font-size: 16px;
  line-height: 1.8;
  > p {
    &:nth-child(n + 2) {
      margin-top: 1em;
    }
  }
`;

const SubTitle = styled.h3`
  color: white;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 24px;
  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  padding: 0;
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
  const animationRef = useRef<HTMLDivElement>(null);

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
        threshold: 0,
      }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AboutSection id="about">
      <AboutSectionWrapper>
        <AboutSectionLayout>
          <DescriptionContainer>
            <SubContainer
              ref={animationRef}
              isVisible={isVisible}
            >
              <SubTitle>About</SubTitle>
              <Description>
                <p>
                  様々な企業のプロモーションやブランディングに伴うWebサイトの制作・リニューアル・改修・運用・保守、アプリケーション開発、LP制作まで幅広く対応してきました。
                </p>
                <p>
                  WordPressテーマ開発を中心とした3年半の実務経験の中で、フロントエンド技術の変遷に合わせて自身のスキルセットを継続的に拡大。
                </p>
                <p>
                  初期はjQueryやgulp.jsを活用したサイト構築から始まり、その後Vue.jsやTailwindCSS、Viteなどのモダンフレームワークやビルドツールを実務に取り入れてきました。
                </p>
                <p>
                  技術面では、技術的負債を残さない技術選定と既存システムへの深い理解に基づいたメンテナンス・改修を重視しています。
                </p>
                <p>
                  コミュニケーション面では、担当範囲に限定されず、ディレクターやデザイナーと密に連携し、各工程やクライアントの背景情報を積極的に把握することを重視しています。
                </p>
              </Description>
            </SubContainer>
            <SubContainer
              ref={animationRef}
              isVisible={isVisible}
            >
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
            <SubContainer
              ref={animationRef}
              isVisible={isVisible}
            >
              <SubTitle>HISTORY</SubTitle>
              <Description>
                <dl>
                  <dt>2021.07 - 2025.02</dt>
                  <dd>株式会社フライング・ハイ・ワークス</dd>
                </dl>
              </Description>
            </SubContainer>
          </DescriptionContainer>
        </AboutSectionLayout>
      </AboutSectionWrapper>
    </AboutSection>
  );
}
