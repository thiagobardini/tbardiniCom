import React, { Suspense, useRef } from "react";
import { useSelector } from "react-redux";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, OrbitControls, Lightformer } from "@react-three/drei";
import { Model } from "./Model";
import HomeText from "../HomeText";
import { DarkCanvas } from "./DarkCanvas";
import { LightCanvas } from "./LightCanvas";

const CanvasComponent = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const ModelContainerLight = () => {
    const modelRef = useRef();

    useFrame(() => {
      modelRef.current.rotation.y += 0.001;
    });
    return (
      <group ref={modelRef}>
        <LightCanvas />
      </group>
    );
  };

  const ModelContainerDark = () => {
    const modelRef = useRef();
    const cameraRef = useRef();
    useFrame(({ camera }) => {
      modelRef.current.rotation.y += 0.001;
    });

    return (
      <>
        <perspectiveCamera
          ref={cameraRef}
          position={[0, 0, 5]} // Adjust camera start position as needed
        />
        <group ref={modelRef}>
          <DarkCanvas />
        </group>
      </>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "calc(100vh - 64px)",
      }}
    >
      {!darkMode ? (
        <Canvas>
          <pointLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <ModelContainerLight />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      ) : (
        <Canvas>
          <Suspense fallback={null}>
            <ModelContainerDark />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <HomeText />
      </div>
    </div>
  );
};

export default CanvasComponent;
