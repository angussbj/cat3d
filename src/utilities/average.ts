import { Vector3 } from "three";

export function average(...vectors: Vector3[]): Vector3 {
  const result = new Vector3(0, 0, 0);
  vectors.forEach((v) => result.add(v));
  result.divideScalar(vectors.length);
  return result;
}
