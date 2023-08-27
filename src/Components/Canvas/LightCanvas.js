import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function LightCanvas(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/scene.glb");

  materials.Stone.roughness = 0.4; // Smaller value makes surface brighter
  materials.Crown.roughness = 2.9;

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3.5, 0]}
          scale={0.6}
        >
          <group name="Root">
            <group name="mentor_roman_retopo" position={[-0.266, 0.12, 1.326]}>
              <mesh
                name="mentor_roman_retopo_0"
                castShadow
                receiveShadow
                geometry={nodes.mentor_roman_retopo_0.geometry}
                material={materials.Stone}
              />
            </group>
            <group
              name="Empty"
              position={[0.161, -0.17, 4.808]}
              rotation={[-0.104, 0.099, 0.002]}
              scale={0.892}
            >
              <group name="nimbus002">
                <mesh
                  name="nimbus002_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.nimbus002_0.geometry}
                  material={materials.Crown}
                />
              </group>
              <group name="nimbus001">
                <mesh
                  name="nimbus001_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.nimbus001_0.geometry}
                  material={materials.Crown}
                />
              </group>
              <group name="nimbus003">
                <mesh
                  name="nimbus003_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.nimbus003_0.geometry}
                  material={materials.Crown}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/scene.glb");
