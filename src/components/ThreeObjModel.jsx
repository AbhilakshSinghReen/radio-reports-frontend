import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function ThreeObjModel({ meshData }) {
  const obj = useLoader(OBJLoader, meshData.url);

  return <primitive object={obj} />;
}
