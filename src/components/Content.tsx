import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "ui";
import { getSphereGeometry } from "./geometries/sphereGeometry";
import { Draggable } from "./Draggable";
import { Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";
import { useThree } from "@react-three/fiber";

export function Content(): React.ReactElement {
  // TODO: when dragging it doesn't update this position and that is bad
  const [objects, setObjects] = useState([new Vector3(0, 0, 0)]);
  const { setOnBackgroundClick } = useEnvironment();
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

        // TODO: this shouldn't need to create a new list every time
        setObjects((o) => [...o, intersection]);
      }),
    [setOnBackgroundClick]
  );

  return (
    <>
      {objects.map((position, index) => (
        <Draggable initialPosition={position} key={index}>
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
      ))}
    </>
  );
}
