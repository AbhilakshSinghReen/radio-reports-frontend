import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ThreeObjModel from "./ThreeObjModel";

export default function ReportMeshesScene({ sceneData }) {
  const cubeRef = useRef();
  const [meshes, setMeshes] = useState([]);

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
  });

  const setComponentStateFromSceneData = (sceneData) => {
    if (!sceneData || !sceneData.meshes) {
      return;
    }

    setMeshes(sceneData.meshes);
  };

  useEffect(() => {
    setComponentStateFromSceneData(sceneData);
  }, [sceneData]);

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"mediumpurple"} />
        {meshes.map((meshData, index) => (
          <ThreeObjModel meshData={meshData} key={index} />
        ))}
      </mesh>
    </>
  );
}
