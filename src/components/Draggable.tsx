import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import { Group, Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";

type DraggableProps = {
  initialPosition?: Vector3;
  children?: ReactNode;
};

export const Draggable: React.FC<DraggableProps> = ({
  children,
  initialPosition = new Vector3(0, 0, 0),
}) => {
  const objectRef = useRef<Group>(null);
  const { setCameraControlsEnabled } = useEnvironment();
  const { camera, size } = useThree();

  // Raycaster and plane used to project the mouse movements from the camera onto the plane
  const raycaster = useMemo(() => new Raycaster(), []);
  const planeRef = useRef(new Plane(new Vector3(0, 0, 1)));

  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.position.copy(initialPosition);
    }
  }, []);

  const bind = useDrag(({ xy: [x, y], first, last }) => {
    if (first) {
      setCameraControlsEnabled(false);
      const cameraDirection = new Vector3();
      camera.getWorldDirection(cameraDirection);
      planeRef.current.setFromNormalAndCoplanarPoint(
        cameraDirection,
        objectRef.current?.position || new Vector3(0, 0, 0)
      );
    }
    if (last) setCameraControlsEnabled(true);

    if (objectRef.current) {
      const screenCoords = new Vector2(
        (x / size.width) * 2 - 1,
        -(y / size.height) * 2 + 1
      );

      raycaster.setFromCamera(screenCoords, camera);
      const intersection = new Vector3();
      raycaster.ray.intersectPlane(planeRef.current, intersection);

      objectRef.current.position.copy(intersection);
    }
  }) as () => {};

  return (
    <group {...bind()} ref={objectRef}>
      {children}
    </group>
  );
};
