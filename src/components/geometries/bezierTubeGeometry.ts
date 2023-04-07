import { CubicBezierCurve3, QuadraticBezierCurve3, Vector3 } from "three";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries";

export function getBezierTubeGeometry(
  points: [Vector3, Vector3, Vector3] | [Vector3, Vector3, Vector3, Vector3],
  radius = 0.02,
  resolution = 24
): BufferGeometry {
  return new ParametricGeometries.TubeGeometry(
    points.length === 3
      ? new QuadraticBezierCurve3(...points)
      : new CubicBezierCurve3(...points),
    resolution,
    radius,
    resolution
  );
}
