import React from "react";
import { Colors } from "ui";
import { getSphereGeometry } from "./geometries/sphereGeometry";
import { Draggable } from "./Draggable";

export function Content(): React.ReactElement {
  return (
    <Draggable>
      <mesh geometry={getSphereGeometry(1)} receiveShadow>
        <meshStandardMaterial
          attach="material"
          color={Colors.DARK.toString()}
          emissive={Colors.DARK.toString()}
          emissiveIntensity={0}
          roughness={0.5}
        />
      </mesh>
    </Draggable>
  );
}
