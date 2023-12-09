import { useMemo, useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

import { Mesh } from "three";

export default function ObjToPrimitive({ url, mat }) {
  const [obj, setObj] = useState();
  useMemo(() => new OBJLoader().load(url, setObj), [url]);
  if (obj) {
    obj.traverse((child) => {
      if (child instanceof Mesh) {
        child.material = mat;
      }
    });
    return <primitive object={obj} />;
  }
  return null;
}
