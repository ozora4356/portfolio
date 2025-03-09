import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const WorksSection = styled.section`
  position: relative;
`;

const WorksSectionWrapper = styled.div`
  max-width: 1464px;
  padding: 160px 32px;
  margin: 0 auto;
`;

const WorksSectionLayout = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: auto 50%;
  /* column-gap: 200px;  */
  align-items: center;
  justify-content: space-between;
`;

const WorksSectionSticky = styled.div`
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

// マスクアニメーション付きのテキストコンポーネント
const TitleText = styled.span<{ isVisible: boolean; delay?: number }>`
  display: inline-block;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #111;
    transform: translateY(${(props) => (props.isVisible ? "100%" : "0")});
    transition: transform 1000ms cubic-bezier(0.19, 1, 0.22, 1)
      ${(props) => props.delay || 0}ms;
  }
`;

const WorkList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 80px;
`;

const WorkItem = styled.li`
  display: flex;
  color: #fff;
  width: 100%;
  flex-direction: column;
  gap: 16px;
  @media (any-hover: hover) {
    &:hover {
      img {
        transform: translate(-6px, -6px);
      }
    }
  }
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background-color: var(--main-site-color);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  h3 {
    font-size: 20px;
    font-weight: 500;
  }
  p {
    color: #9a9d97;
    font-size: 16px;
    font-weight: 400;
  }
`;

export default function Works() {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // 一度表示されたら監視を停止
          }
        });
      },
      {
        threshold: 0.3, // 30%が表示されたらトリガー
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
              <TitleText
                isVisible={isVisible}
                delay={0}
              >
                WORKS
              </TitleText>
              <br />
              <TitleText
                isVisible={isVisible}
                delay={100}
              >
                CREATED
              </TitleText>
              <br />
              <TitleText
                isVisible={isVisible}
                delay={200}
              >
                REACT
              </TitleText>
            </Title>
          </WorksSectionSticky>
          <WorkList>
            <WorkItem>
              <Link
                href="https://v-live-pi.vercel.app/"
                target="_blank"
              >
                <Thumbnail>
                  <Image
                    src="https://v-live-pi.vercel.app/og-image.png"
                    alt="Vtuber Lives App"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Thumbnail>
                <Description>
                  <h3>Vtuber Lives App</h3>
                  <p>Vtuberのライブ配信情報を一覧で確認できるアプリ</p>
                </Description>
              </Link>
            </WorkItem>
            <WorkItem>
              <Link
                href="https://mbti-sage-eight.vercel.app/"
                target="_blank"
              >
                <Thumbnail>
                  <Image
                    src="https://mbti-sage-eight.vercel.app/ogp.png"
                    alt="Mbti Compatibility App"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Thumbnail>
                <Description>
                  <h3>Mbti Compatibility App</h3>
                  <p>React.js / Next.js / TypeScript / TailwindCSS / Vercel</p>
                </Description>
              </Link>
            </WorkItem>
            <WorkItem>
              <Link
                href="https://command-app.vercel.app/"
                target="_blank"
              >
                <Thumbnail>
                  <Image
                    src="https://command-app.vercel.app/logo-white.png"
                    alt="X Command App"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Thumbnail>
                <Description>
                  <h3>X Command App</h3>
                  <p>React.js / Next.js / TypeScript / TailwindCSS / Vercel</p>
                </Description>
              </Link>
            </WorkItem>
          </WorkList>
        </WorksSectionLayout>
      </WorksSectionWrapper>
    </WorksSection>
  );
}
