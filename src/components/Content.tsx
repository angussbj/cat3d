import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "ui";
import { getSphereGeometry } from "./geometries/sphereGeometry";
import { Draggable } from "./Draggable";
import { Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";
import { useThree } from "@react-three/fiber";
import { Elements } from "logic";

export function Content(): React.ReactElement {
  // TODO: when dragging it doesn't update this position and that is bad
  const [elements] = useState(new Elements());
  const { setOnBackgroundClick, render } = useEnvironment();
  const { camera, size } = useThree();

  const raycaster = useMemo(() => new Raycaster(), []);
  const plane = useMemo(() => new Plane(new Vector3(0, 1, 0)), []);

  useEffect(
    () =>
      setOnBackgroundClick(() => (event: MouseEvent): void => {
        if (
          event.ctrlKey ||
          event.altKey ||
          event.metaKey ||
          event.shiftKey ||
          event.button > 1
        ) {
          return;
        }

        const screenCoords = new Vector2(
          (event.x / size.width) * 2 - 1,
          -(event.y / size.height) * 2 + 1
        );

        const intersection = new Vector3();
        raycaster.setFromCamera(screenCoords, camera);
        raycaster.ray.intersectPlane(plane, intersection);

        elements.addNode(intersection);
        render();
      }),
    [setOnBackgroundClick]
  );

  return (
    <>
      {elements.getNodes().map(({ position }, index) => (
        <Draggable initialPosition={position} key={index}>
          <mesh geometry={getSphereGeometry(1)} castShadow receiveShadow>
            <meshStandardMaterial
              attach="material"
              color={Colors.DARK.toString()}
              emissive={Colors.DARK.toString()}
              emissiveIntensity={0}
              roughness={0.5}
            />
          </mesh>
        </Draggable>
      ))}
    </>
  );
}
