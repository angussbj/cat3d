import { LatheGeometry, Vector2 } from "three";
import { BufferGeometry } from "three/src/core/BufferGeometry";

export function getSphereGeometry(
  radius = 0.05,
  resolution = 12
): BufferGeometry {
  const semicirclePoints = [];
  for (let i = 0; i <= resolution; i++) {
    semicirclePoints.push(
      new Vector2(
        radius * Math.sin((i * Math.PI) / resolution),
        radius * Math.cos((i * Math.PI) / resolution)
      )
    );
  }

  return new LatheGeometry(semicirclePoints, 2 * resolution);
}
