import React, { useEffect, useMemo, useState } from "react";
import { Colors } from "ui";
import { getSphereGeometry } from "./geometries/sphereGeometry";
import { Draggable } from "./Draggable";
import { Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";
import { useThree } from "@react-three/fiber";
import { Elements } from "logic";
import { SolidMaterial } from "./materials/SolidMaterial";
import { HighlightMaterial } from "./materials";

export function Content(): React.ReactElement {
  const [elements] = useState(new Elements());
  const [nodeRadius] = useState(0.1);
  const [highlightWidth] = useState(0.005);
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
      {elements.getNodes().map(({ position, selected }, index) => (
        <Draggable position={position} key={index}>
          <mesh
            geometry={getSphereGeometry(nodeRadius)}
            castShadow
            receiveShadow
          >
            <SolidMaterial color={Colors.GREY} />
          </mesh>
          {selected && (
            <mesh geometry={getSphereGeometry(nodeRadius + highlightWidth)}>
              <HighlightMaterial color={Colors.HIGHLIGHTS[0]} />
            </mesh>
          )}
        </Draggable>
      ))}
    </>
  );
}
