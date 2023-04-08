import { Arrow, ArrowId, NodeId } from "../Element";
import { Vector3 } from "three";

export function serialiseArrows(arrows: Record<ArrowId, Arrow>): string {
  return Object.values(arrows)
    .map((a) =>
      [
        a.id,
        a.domainId,
        a.codomainId,
        a.guidePoint.x.toFixed(3),
        a.guidePoint.y.toFixed(3),
        a.guidePoint.z.toFixed(3),
      ].join("*")
    )
    .join("_");
}

export function deserialiseArrows(serialised: string): Record<ArrowId, Arrow> {
  const arrows: Record<ArrowId, Arrow> = {};
  try {
    serialised.split("_").forEach((str) => {
      const pieces = str.split("*");
      arrows[pieces[0] as ArrowId] = {
        id: pieces[0] as ArrowId,
        domainId: pieces[1] as NodeId,
        codomainId: pieces[2] as NodeId,
        guidePoint: new Vector3(
          parseFloat(pieces[3]),
          parseFloat(pieces[4]),
          parseFloat(pieces[5])
        ),
      };
    });
  } catch {
    console.warn("Error deserialising Arrows, defaulting to empty");
    return {};
  }
  return arrows;
}
