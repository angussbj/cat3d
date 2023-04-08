import React, { useEffect, useMemo, useRef } from "react";
import { Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";
import { useThree } from "@react-three/fiber";
import { Elements } from "logic";
import { Arrow, Node } from "./entities";
import { useToasts } from "react-toast-notifications";

export function Content(): React.ReactElement {
  const { setOnBackgroundClick, render } = useEnvironment();
  const { addToast } = useToasts();
  const elements = useRef(new Elements(render, addToast)).current;
  const { camera, size } = useThree();

  useEffect(() => {
    document.addEventListener("keydown", elements.onKeyDown.bind(elements));

    return (): void => {
      document.removeEventListener(
        "keydown",
        elements.onKeyDown.bind(elements)
      );
    };
  }, []);

  const raycaster = useMemo(() => new Raycaster(), []);
  const plane = useMemo(() => new Plane(new Vector3(0, 1, 0)), []);

  // TODO: fix click behaviour after resizing
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
      {elements.getNodes().map((node) => (
        <Node node={node} elements={elements} key={node.id} />
      ))}
      {elements.getArrows().map((arrow) => (
        <Arrow arrow={arrow} elements={elements} key={arrow.id} />
      ))}
    </>
  );
}
