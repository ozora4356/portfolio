import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// 型定義を追加
type GLTFResult = {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

// propsの型定義
interface ModelProps extends React.ComponentProps<"group"> {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

const AboutModel = (props: ModelProps) => {
  const { nodes, materials } = useGLTF(
    "/models/About/scene.gltf",
    true // Draco圧縮を有効化
  ) as unknown as GLTFResult;

  // メモ化されたモデル
  const memoizedModel = useMemo(
    () => (
      <group
        {...props}
        dispose={null}
      >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI, 0, 0]}>
            <group
              position={[0.802, -116.398, 15.897]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={100}
            >
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.notice_board_roof_tiles_lowo_0.geometry}
                material={materials.roof_tiles_lowo}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.notice_board_wooden_structure_0.geometry}
                material={materials.wooden_structure}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.notice_board_board_0.geometry}
                material={materials.board}
              />
            </group>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.notice_board001_notice_board_other_0.geometry}
              material={materials.notice_board_other}
              position={[0.802, -116.398, 15.897]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={100}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.campfire006_campfire_simple_0.geometry}
              material={materials.campfire_simple}
              position={[38.204, 151.369, 48.003]}
              rotation={[-0.142, -0.256, -1.599]}
              scale={75.657}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane022_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[-31.923, 91.315, 45.465]}
              rotation={[3.05, -0.943, 1.513]}
              scale={0.461}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane007_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[41.006, 63.066, 46.37]}
              rotation={[-2.915, -1.39, 1.488]}
              scale={0.443}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane010_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[35.088, -155.873, 20.378]}
              rotation={[-3.128, -1.49, 1.275]}
              scale={0.497}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane013_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[-74.947, -164.769, 35.381]}
              rotation={[-3.041, -0.847, 1.382]}
              scale={0.43}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane014_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[-56.536, 30.229, 33.517]}
              rotation={[-2.774, -1.148, 1.645]}
              scale={0.37}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane015_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[-63.844, -98.997, 37.056]}
              rotation={[2.68, -0.83, 1.404]}
              scale={0.374}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane016_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[25.288, -88.807, 30.983]}
              rotation={[3.127, -1.232, 1.996]}
              scale={0.391}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane017_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[82.122, 157.35, 57.259]}
              rotation={[2.892, -1.152, 1.509]}
              scale={0.4}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.patch_low_patch_low_0.geometry}
              material={materials.patch_low}
              position={[0.802, -5.253, 15.897]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={100}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Plane018_grass001_0.geometry}
              material={materials["grass.001"]}
              position={[128.256, 96.387, 37.853]}
              rotation={[0.077, -1.232, -1.927]}
              scale={0.509}
            />
          </group>
        </group>
      </group>
    ),
    [props]
  );

  return memoizedModel;
};

export default React.memo(AboutModel);

// プリロードの最適化
useGLTF.preload("/models/About/scene.gltf", true);
