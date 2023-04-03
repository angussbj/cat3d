import React from "react";
import { Canvas } from "@react-three/fiber";
import { Lighting } from "./Lighting";
import { Colors } from "ui";
import { OrbitControls } from "@react-three/drei";
import { BufferAttribute, BufferGeometry, Vector3 } from "three";

const vertices = [];
const normals = [];
for (let j = -5; j <= 6; j++) {
  for (let i = 0; i <= 21; i++) {
    const position = new Vector3().setFromSphericalCoords(
      1,
      (j * Math.PI) / 10,
      -(i * Math.PI) / 10
    );
    vertices.push(position.x, position.y, position.z);
    normals.push(position.x, position.y, position.z);
  }
}

const indices = [];
for (let i = 0; i < 11; i++) {
  for (let j = 0; j < 21; j++) {
    const [a, b, c, d] = [
      i + j * (11 + 1),
      i + 1 + j * (11 + 1),
      i + (j + 1) * (11 + 1),
      i + 1 + (j + 1) * (11 + 1),
    ];
    indices.push(a, b, c); // top left triangle
    indices.push(d, c, b); // bottom right triangle
  }
}

const geometry = new BufferGeometry();
geometry.setAttribute(
  "position",
  new BufferAttribute(new Float32Array(vertices), 3)
);
geometry.setAttribute(
  "normal",
  new BufferAttribute(new Float32Array(normals), 3)
);
geometry.setIndex(indices);

export function Content(): React.ReactElement {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <Canvas
        style={{ background: Colors.BLACK.toString() }}
        camera={{ fov: 4, position: [0, 0, 10] }}
        shadows
      >
        <Lighting />
        <mesh geometry={geometry} receiveShadow>
          <meshStandardMaterial
            attach="material"
            color={Colors.GREY.toString()}
            emissive={Colors.GREY.toString()}
            emissiveIntensity={0}
            roughness={0.5}
          />
        </mesh>
        <OrbitControls autoRotate={true} />
      </Canvas>
    </div>
  );
}
