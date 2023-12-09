import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";

import ThreeObjModel from "./ThreeObjModel";

export default function ReportMeshesScene({ sceneData }) {
  const cubeRef = useRef();

  const [isInitializing, setIsInitializing] = useState(true);

  const [meshes, setMeshes] = useState([]);

  useFrame((state, delta) => {
    if (isInitializing) {
      state.camera.lookAt(0, 135, 0);
      state.camera.position.set(0, 200, 400);
      state.camera.near = 0.1;
      state.camera.far = 10_000;

      setIsInitializing(false);
    }

    // console.log(state.camera);

    // state.camera.position.lerp(vec.set(x, y, z), 0.01)
    // state.camera.updateProjectionMatrix()
    // cubeRef.current.rotation.y += delta;
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
      {/* <PerspectiveCamera
        makeDefault
        fov={75}
        position={[0, 200, 400]}
        // rotation={[x, y, z]}
        lookAt={[0, 135, 0]}
      /> */}
      <OrbitControls />
      <ambientLight args={[0x404040, 100]} />
      <gridHelper args={[2000, 50]} />

      {/* <mesh ref={cubeRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh> */}

      {/* {meshes.length > 0 ? <ThreeObjModel meshData={meshes[0]} /> : null} */}

      {meshes.map((meshData, index) => (
        <ThreeObjModel meshData={meshData} key={index} />
      ))}
    </>
  );
}
