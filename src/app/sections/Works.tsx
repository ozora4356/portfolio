import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";

const WorksSection = styled.section`
  position: relative;
  max-width: 1464px;
  padding: 128px 32px;
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
  top: 22%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  align-self: start;
  margin-top: 100px;
`;

const Title = styled.h2`
  color: white;
  width: fit-content;
  line-height: 0.8;
  font-size: 80px;
  font-weight: 700;
  border-left: 4px solid var(--main-site-color);
  padding-left: 24px;
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

export default function works() {
  return (
    <WorksSection id="works">
      <WorksSectionLayout>
        <WorksSectionSticky>
          <Title>
            WORKS
            <br />
            CREATED
            <br />
            REACT
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
                />
              </Thumbnail>
              <Description>
                <h3>Vtuber Lives App</h3>
                <p>Vtuber Lives App</p>
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
                />
              </Thumbnail>
              <Description>
                <h3>Mbti Compatibility App</h3>
                <p>Mbti Compatibility App</p>
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
                />
              </Thumbnail>
              <Description>
                <h3>X Command App</h3>
                <p>X Command App</p>
              </Description>
            </Link>
          </WorkItem>
        </WorkList>
      </WorksSectionLayout>
    </WorksSection>
  );
}
