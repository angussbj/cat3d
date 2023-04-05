import { BufferAttribute, BufferGeometry, Vector3 } from "three";

const vertices = [];
const normals = [];
for (let j = -5; j <= 6; j++) {
  for (let i = 0; i <= 21; i++) {
    const position = new Vector3().setFromSphericalCoords(
      1,
      (j * Math.PI) / 10,
      -(i * Math.PI) / 10
    );
    vertices.push(position.x, position.y, position.z);
    normals.push(position.x, position.y, position.z);
  }
}

const indices = [];
for (let i = 0; i < 11; i++) {
  for (let j = 0; j < 21; j++) {
    const [a, b, c, d] = [
      i + j * (11 + 1),
      i + 1 + j * (11 + 1),
      i + (j + 1) * (11 + 1),
      i + 1 + (j + 1) * (11 + 1),
    ];
    indices.push(a, b, c); // top left triangle
    indices.push(d, c, b); // bottom right triangle
  }
}

const geometry = new BufferGeometry();
geometry.setAttribute(
  "position",
  new BufferAttribute(new Float32Array(vertices), 3)
);
geometry.setAttribute(
  "normal",
  new BufferAttribute(new Float32Array(normals), 3)
);
geometry.setIndex(indices);

export { geometry };
