import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import ObjToPrimitive from "./ObjToPrimitive";
const mat = new THREE.MeshNormalMaterial();

function generateRandomHexColor() {
  // Generate a random integer between 0 and 16777215 (2^24 - 1)
  const randomColor = Math.floor(Math.random() * 16777215);

  // Convert the decimal to hex and pad with zeros if necessary
  const hexColor = randomColor.toString(16).padStart(6, "0");

  // Return the hex color string
  return `#${hexColor}`;
}

export default function ThreeObjModel({ meshData }) {
  //   const mat = new THREE.MeshNormalMaterial();
  let mat = new THREE.MeshStandardMaterial({
    color: generateRandomHexColor(),
    // roughness: 0.5,
    // metalness: 0.5,
  });
  mat = mat.convertSRGBToLinear();

  return (
    <mesh position={[-127, 0, -127]} rotation={[-1.5708, 0, 0]}>
      {ObjToPrimitive({ url: meshData.url, mat })}
    </mesh>
  );
}
