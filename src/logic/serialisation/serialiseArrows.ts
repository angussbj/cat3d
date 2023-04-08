import { Node, NodeId } from "../Element";
import { Vector3 } from "three";

export function serialiseNodes(nodes: Record<NodeId, Node>): string {
  return Object.values(nodes)
    .map((n) =>
      [
        n.id,
        n.position.x.toFixed(3),
        n.position.y.toFixed(3),
        n.position.z.toFixed(3),
      ].join("*")
    )
    .join("_");
}

export function deserialiseNodes(serialised: string): Record<NodeId, Node> {
  const nodes: Record<NodeId, Node> = {};
  try {
    serialised.split("_").forEach((str) => {
      const pieces = str.split("*");
      nodes[pieces[0] as NodeId] = {
        id: pieces[0] as NodeId,
        position: new Vector3(
          parseFloat(pieces[1]),
          parseFloat(pieces[2]),
          parseFloat(pieces[3])
        ),
      };
    });
  } catch {
    // eslint-disable-next-line no-console
    console.warn("Error deserialising Nodes, defaulting to empty");
    return {};
  }
  return nodes;
}
