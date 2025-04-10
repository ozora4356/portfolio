import styled from "@emotion/styled";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
const WorksSection = styled.section`
  position: relative;
`;

const WorksSectionWrapper = styled.div`
  max-width: 1464px;
  padding: 120px 32px;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    padding: 120px 32px 60px;
  }
  @media screen and (max-width: 767px) {
    padding: 60px 32px;
  }
`;

const WorksSectionLayout = styled.div`
  display: flex;
  position: relative;
  align-items: start;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    row-gap: 64px;
  }
`;

const WorksSectionSticky = styled.div`
  position: sticky;
  top: 12%;
  margin-top: 64px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    top: 8%;
    margin-top: 0;
  }
  @media screen and (max-width: 767px) {
    position: relative;
  }
`;

const Title = styled.h2`
  font-family: var(--main-site-font);
  color: white;
  width: fit-content;
  line-height: 0.9;
  font-size: 80px;
  font-weight: 700;
  /* border-left: 4px solid var(--main-site-color); */
  padding: 16px 32px;
  padding: 16px 32px 16px 0;
  opacity: 0.9;
  @media screen and (max-width: 1024px) {
    font-size: 60px;
  }
  @media screen and (max-width: 767px) {
    font-size: 48px;
    padding: 8px 16px 8px 0;
  }
`;

const TitleText = styled.span<{ isVisible: boolean; delay?: number }>`
  display: inline-block;
  position: relative;
  overflow: hidden;
  clip-path: ${(props) =>
    props.isVisible
      ? "polygon(0 0, 200% 0, 0 200%);"
      : "polygon(0 0, 0 0, 0 0);"};
  transition: clip-path 1800ms cubic-bezier(0.19, 1, 0.22, 1);
`;

const WorkList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 80px;
  width: 100%;
  @media screen and (max-width: 767px) {
    gap: 40px;
  }
`;

const WorkItem = styled.li`
  color: #fff;
  width: 100%;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  transition: all ease 0.5s;
  border-radius: 16px;
  @media (any-hover: hover) {
    &:hover {
      outline-color: var(--main-site-color);
      box-shadow: 0px 0px 24px var(--main-site-color);
    }
  }
  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  @media screen and (max-width: 767px) {
    margin-top: 16px;
  }
  h3 {
    font-size: 20px;
    font-weight: 500;
  }
  p {
    color: #bdbdbd;
    font-size: 16px;
    font-weight: 400;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const LogoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
`;

const LogoItem = styled.li`
  display: grid;
  place-items: center;
  padding: 8px;
  background-color: #222;
  border-radius: 8px;
  img {
    width: 30px;
    height: 30px;
    @media screen and (max-width: 767px) {
      width: 24px;
      height: 24px;
    }
  }
`;

interface TechStackProps {
  techs: Array<{
    name: string;
    icon: string;
  }>;
}

const TechStack = ({ techs }: TechStackProps) => {
  return (
    <LogoList>
      {techs.map((tech) => (
        <LogoItem key={tech.name}>
          <Image
            src={tech.icon}
            alt={tech.name}
            width={32}
            height={32}
          />
        </LogoItem>
      ))}
    </LogoList>
  );
};

const techStacks = {
  vtuber: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "TailwindCSS", icon: "/icons/tailwindcss.svg" },
    { name: "Next.js", icon: "/icons/next.svg" },
  ],
  xCommand: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "TailwindCSS", icon: "/icons/tailwindcss.svg" },
    { name: "Next.js", icon: "/icons/next.svg" },
  ],
};

// プロジェクトデータを配列として定義
const projects = [
  {
    name: "Vtuber Lives App",
    description:
      "VTuberのリアルタイムで行われている配信やスケジュールを一覧で確認できるアプリケーションです。視聴者数やお気に入り登録したチャンネルが配信中かどうかを簡単に確認できます。",
    link: "https://v-live-pi.vercel.app/",
    image: "https://v-live-pi.vercel.app/og-image.png",
    techStack: techStacks.vtuber,
  },
  {
    name: "X Command App",
    description:
      "X（旧Twitter）の投稿を効率的に管理するためのコマンドラインツール。作成したコマンドでポストを検索できます。",
    link: "https://command-app.vercel.app/",
    image: "https://command-app.vercel.app/logo-white.png",
    techStack: techStacks.xCommand,
  },
  // 他のプロジェクトを追加可能
];

export default function Works() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <WorksSection id="works">
      <WorksSectionWrapper>
        <WorksSectionLayout>
          <WorksSectionSticky>
            <Title ref={titleRef}>
              <TitleText isVisible={isVisible}>Works</TitleText>
              <br />
              <TitleText isVisible={isVisible}>Created</TitleText>
              <br />
              <TitleText isVisible={isVisible}>React</TitleText>
            </Title>
          </WorksSectionSticky>
          <WorkList>
            {projects.map((project) => (
              <WorkItem key={project.name}>
                <Link
                  href={project.link}
                  target="_blank"
                >
                  <Thumbnail>
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Thumbnail>
                  <Description>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <TechStack techs={project.techStack} />
                  </Description>
                </Link>
              </WorkItem>
            ))}
          </WorkList>
        </WorksSectionLayout>
      </WorksSectionWrapper>
    </WorksSection>
  );
}
