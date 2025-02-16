import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import { ThreeElements } from "@react-three/fiber";

// 型定義
type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export function HeroModel(props: ThreeElements["group"]) {
  const { nodes, materials } = useGLTF("/models/scene.gltf") as GLTFResult;

  return (
    <group {...props}>
      {/* モデルの各パーツを個別に制御 */}
      <mesh
        geometry={nodes.モデルのパーツ名.geometry}
        material={materials.マテリアル名}
        position={[0, 0, 0]}
        scale={1}
      />
    </group>
  );
}
