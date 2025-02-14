import React from "react";

const HackerRoom = (props) => {
  const { nodes, materials } = useGLTF("/hacker-room.glb");
  return (
  <group {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Room.geometry}
      material={materials.Room}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Room.geometry}
      material={materials.Room}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Room.geometry}
      material={materials.Room}
    />
    
  </group>
  )
};

useGLTF.preload(path:"/models/hacker-room.glb");

export default HackerRoom;

