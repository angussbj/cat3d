import React, { useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "ui";
import { Draggable } from "./Draggable";
import { Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";
import { useThree } from "@react-three/fiber";
import { Elements } from "logic";
import {
  HighlightMaterial,
  SolidMaterial,
  TranslucentMaterial,
} from "./materials";
import { ClickEvent } from "./ClickEvent";
import { getBezierTubeGeometry, getSphereGeometry } from "./geometries";

export function Content(): React.ReactElement {
  const { setOnBackgroundClick, render } = useEnvironment();
  const elements = useRef(new Elements(render)).current;
  const { camera, size } = useThree();

  useEffect(() => {
    document.addEventListener("keydown", elements.onKeyDown.bind(elements));

    // TODO: load state from url

    return (): void => {
      document.removeEventListener(
        "keydown",
        elements.onKeyDown.bind(elements)
      );
    };
  }, []);

  // TODO: add options section to control these variables
  const [nodeRadius] = useState(0.1);
  const [guidePointRadius] = useState(0.07);
  const [highlightWidth] = useState(0.005);
  const [arrowRadius] = useState(0.02);

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
      {elements.getNodes().map(({ position, id: nodeId }) => (
        <Draggable
          position={position}
          key={nodeId}
          onClick={(event: ClickEvent): void => elements.onClick(nodeId, event)}
        >
          <mesh
            geometry={getSphereGeometry(nodeRadius)}
            castShadow
            receiveShadow
          >
            <SolidMaterial color={Colors.GREY} />
          </mesh>
          {elements.isSelected(nodeId) && (
            <mesh geometry={getSphereGeometry(nodeRadius + highlightWidth)}>
              <HighlightMaterial color={Colors.HIGHLIGHTS[0]} />
            </mesh>
          )}
        </Draggable>
      ))}
      {elements.getArrows().map(({ id: arrowId, guidePoint }, index) => (
        <>
          <mesh
            key={arrowId}
            geometry={getBezierTubeGeometry(
              elements.getArrowPoints(arrowId),
              arrowRadius
            )}
            onClick={(event): void => elements.onClick(arrowId, event)}
            castShadow
            receiveShadow
          >
            <SolidMaterial color={Colors.GREY} />
          </mesh>
          {elements.isSelected(arrowId) && (
            <>
              <mesh
                key={arrowId + "highlight"}
                geometry={getBezierTubeGeometry(
                  elements.getArrowPoints(arrowId),
                  arrowRadius + highlightWidth
                )}
              >
                <HighlightMaterial color={Colors.HIGHLIGHTS[0]} />
              </mesh>
              <Draggable position={guidePoint} key={arrowId + "guidePoint"}>
                <mesh geometry={getSphereGeometry(guidePointRadius)}>
                  <TranslucentMaterial color={Colors.HIGHLIGHTS[0]} />
                </mesh>
              </Draggable>
            </>
          )}
        </>
      ))}
    </>
  );
}
