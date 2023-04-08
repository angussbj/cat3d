import {
  ConeGeometry,
  CubicBezierCurve3,
  QuadraticBezierCurve3,
  Quaternion,
  Vector3,
} from "three";
import { BufferGeometry } from "three/src/core/BufferGeometry";

export function getArrowheadGeometry(
  points: [Vector3, Vector3, Vector3] | [Vector3, Vector3, Vector3, Vector3],
  radius = 0.05, // TODO: setting
  length = 0.1, // TODO: setting
  setback = 0,
  resolution = 36
): BufferGeometry {
  const bezier =
    points.length === 3
      ? new QuadraticBezierCurve3(...points)
      : new CubicBezierCurve3(...points);
  const tangent = bezier.getTangent(1);
  const endpoint = points.slice(-1)[0];
  const arrowheadStartPoint = endpoint
    .clone()
    .sub(tangent.clone().multiplyScalar(length));
  return new ConeGeometry(radius, length, resolution)
    .applyQuaternion(
      new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), tangent)
    )
    .translate(
      arrowheadStartPoint.x,
      arrowheadStartPoint.y,
      arrowheadStartPoint.z
    );
}
