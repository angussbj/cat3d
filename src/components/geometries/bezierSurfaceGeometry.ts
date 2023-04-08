import {
  BufferAttribute,
  BufferGeometry,
  CubicBezierCurve3,
  QuadraticBezierCurve3,
  Vector3,
} from "three";
import { BezierPoints } from "./BezierPoints";

export function getBezierSurfaceGeometry(
  domainArrowsPoints: BezierPoints[],
  codomainArrowsPoints: BezierPoints[],
  guidePoint: Vector3,
  resolution = 32
): BufferGeometry {
  const domainBeziers = domainArrowsPoints.map((points) =>
    points.length === 3
      ? new QuadraticBezierCurve3(...points)
      : new CubicBezierCurve3(...points)
  );
  const codomainBeziers = codomainArrowsPoints.map((points) =>
    points.length === 3
      ? new QuadraticBezierCurve3(...points)
      : new CubicBezierCurve3(...points)
  );
  const midBezier = new QuadraticBezierCurve3(
    domainArrowsPoints[0][0],
    guidePoint,
    domainArrowsPoints.slice(-1)[0].slice(-1)[0]
  );

  const vertices: Vector3[][] = [];

  const longResolution =
    resolution * Math.max(domainBeziers.length, codomainBeziers.length);
  // TODO: longwise end points - maybe doesn't matter?
  for (let i = 1; i < longResolution; i++) {
    const startBezierGranularity = longResolution / domainBeziers.length;
    const endBezierGranularity = longResolution / codomainBeziers.length;
    const startBezier = domainBeziers[Math.floor(i / startBezierGranularity)];
    const endBezier = codomainBeziers[Math.floor(i / endBezierGranularity)];
    const start = startBezier.getPoint(
      (i % Math.floor(startBezierGranularity)) / startBezierGranularity
    );
    const end = endBezier.getPoint(
      (i % Math.floor(endBezierGranularity)) / endBezierGranularity
    );
    const mid = midBezier.getPoint(i / longResolution);
    const shortBezier = new QuadraticBezierCurve3(start, mid, end);
    vertices.push([]);
    for (let j = 0; j <= resolution; j++) {
      const v = shortBezier.getPoint(j / resolution);
      vertices[i - 1].push(v);
    }
  }

  const normals: Vector3[] = [];
  for (let i = 1; i < longResolution; i++) {
    for (let j = 0; j <= resolution; j++) {
      const v = vertices[i - 1][j];
      const u = i > 1 ? vertices[i - 2][j] : vertices[i][j];
      const w = j > 0 ? vertices[i - 1][j - 1] : vertices[i - 1][j + 1];
      const n = v.clone().sub(u).cross(v.clone().sub(w)).normalize();
      n.multiplyScalar((i > 1 ? 1 : -1) * (j > 0 ? 1 : -1));
      normals.push(n);
    }
  }

  const indices: number[] = [];
  for (let i = 0; i < longResolution - 2; i++) {
    for (let j = 0; j < resolution; j++) {
      // indices
      const [a, b, c, d] = [
        j + i * (resolution + 1),
        j + 1 + i * (resolution + 1),
        j + (i + 1) * (resolution + 1),
        j + 1 + (i + 1) * (resolution + 1),
      ];
      indices.push(a, b, c); // top left triangle
      indices.push(d, c, b); // bottom right triangle
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute(
    "position",
    new BufferAttribute(
      new Float32Array(
        vertices.flatMap((vs) => vs).flatMap((v) => [v.x, v.y, v.z])
      ),
      3
    )
  );
  geometry.setAttribute(
    "normal",
    new BufferAttribute(
      new Float32Array(normals.flatMap((v) => [v.x, v.y, v.z])),
      3
    )
  );
  geometry.setIndex(indices);

  return geometry;
}
