import styled from "@emotion/styled";
import React from "react";
import { Canvas } from "@react-three/fiber";
import FixedSphere from "./FixedSphere";

const FixedExperienceWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 0;
`;

// 固定シェイプコンポーネント
const FixedExperience = () => {
  return (
    <FixedExperienceWrapper>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <FixedSphere/>
      </Canvas>
    </FixedExperienceWrapper>
  );
};

export default FixedExperience;
