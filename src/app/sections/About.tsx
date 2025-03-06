import styled from "@emotion/styled";
import React from "react";

const AboutSection = styled.section`
  position: relative;
`;

const AboutSectionWrapper = styled.div`
  max-width: 1464px;
  padding: 160px 32px;
  margin: 0 auto;
`;

const AboutSectionLayout = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: auto 50%;
  /* column-gap: 200px;  */
  align-items: center;
  justify-content: space-between;
`;

const AboutSectionSticky = styled.div`
  position: sticky;
  top: 12%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-self: start;
  margin-top: 100px;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SubContainer = styled.div``;

const Description = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  > p {
    &:nth-child(n+2) {
      margin-top: 1em;
    }
  }
`;

const SubTitle = styled.h3`
  color: #fff;
  font-size: 32px;
  font-weight: 600;
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
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
`;

export default function About() {
  return (
    <AboutSection id="about">
      <AboutSectionWrapper>
        <AboutSectionLayout>
          <AboutSectionSticky>
            <Title>
              About
              <br />
              Me
            </Title>
          </AboutSectionSticky>

          <ContentContainer>
            <SubContainer>
              <SubTitle>About</SubTitle>
              <Description>
                <p>様々な企業のプロモーションやブランディングに伴うWebサイト制作・リニューアル、アプリケーション開発、LP制作・改修から運用・保守まで幅広く対応してきました。</p>
                <p>WordPressテーマ開発を中心とした3年半の実務経験の中で、フロントエンド技術の変遷に合わせて自身のスキルセットを継続的に拡大。</p>
                <p>初期はjQueryやgulp.jsを活用したサイト構築から始まり、その後VueやTailwindCSS、Viteなどのモダンフレームワークやビルドツールを実務に取り入れてきました。</p>
                <p>プロセス全体をスムーズに進行できるように、担当範囲の業務に縛られることなく、ディレクターやデザイナーと密に連携し、各工程の背景情報を積極的に取りに行くことを心がけています。</p>
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
          </ContentContainer>
        </AboutSectionLayout>
      </AboutSectionWrapper>
    </AboutSection>
  );
}
