import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useThree } from "@react-three/fiber";
import { useDrag } from "react-use-gesture";
import { Group, Plane, Raycaster, Vector2, Vector3 } from "three";
import { useEnvironment } from "./useEnvironment";

type DraggableProps = {
  position?: Vector3;
  children?: ReactNode;
};

export const Draggable: React.FC<DraggableProps> = ({
  position = new Vector3(0, 0, 0),
  children,
}) => {
  const objectRef = useRef<Group>(null);
  const { setCurrentlyDragging } = useEnvironment();
  const { camera, size } = useThree();

  // Raycaster and plane used to project the mouse movements from the camera onto the plane
  const raycaster = useMemo(() => new Raycaster(), []);
  const planeRef = useRef(new Plane(new Vector3(0, 0, 1)));
  const mouseObjectOffset = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    if (objectRef.current) {
      objectRef.current.position.copy(position);
    }
  }, []);

  const screenToSpace = useCallback((x: number, y: number): Vector3 => {
    const screenCoords = new Vector2(
      (x / size.width) * 2 - 1,
      -(y / size.height) * 2 + 1
    );

    const intersection = new Vector3();
    raycaster.setFromCamera(screenCoords, camera);
    raycaster.ray.intersectPlane(planeRef.current, intersection);

    return intersection;
  }, []);

  const bind = useDrag(({ xy: [x, y], first, last, event }) => {
    event.stopPropagation();
    if (first) {
      setCurrentlyDragging(true);

      const cameraDirection = new Vector3();
      camera.getWorldDirection(cameraDirection);
      planeRef.current.setFromNormalAndCoplanarPoint(
        cameraDirection,
        objectRef.current?.position || new Vector3(0, 0, 0)
      );

      mouseObjectOffset.current =
        objectRef.current?.position.clone().sub(screenToSpace(x, y)) ||
        new Vector3(0, 0, 0);
    }

    if (objectRef.current) {
      objectRef.current.position.copy(
        screenToSpace(x, y).add(mouseObjectOffset.current)
      );
    }

    if (last) {
      setCurrentlyDragging(false);
      if (objectRef.current) position.copy(objectRef.current.position);
    }
  }) as () => {};

  return (
    <group {...bind()} ref={objectRef}>
      {children}
    </group>
  );
};
