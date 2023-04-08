import { ArrowId, TwoArrow, TwoArrowId } from "../Element";
import { Vector3 } from "three";

export function serialiseTwoArrows(
  twoArrows: Record<TwoArrowId, TwoArrow>
): string {
  return Object.values(twoArrows)
    .map((a) =>
      [
        a.id,
        a.domainIds.join("-"),
        a.codomainIds.join("-"),
        a.guidePoint.x.toFixed(3),
        a.guidePoint.y.toFixed(3),
        a.guidePoint.z.toFixed(3),
      ].join("*")
    )
    .join("_");
}

export function deserialiseTwoArrows(
  serialised: string
): Record<TwoArrowId, TwoArrow> {
  const twoArrows: Record<TwoArrowId, TwoArrow> = {};
  try {
    serialised.split("_").forEach((str) => {
      const pieces = str.split("*");
      twoArrows[pieces[0] as TwoArrowId] = {
        id: pieces[0] as TwoArrowId,
        domainIds: pieces[1].split("-") as ArrowId[],
        codomainIds: pieces[2].split("-") as ArrowId[],
        guidePoint: new Vector3(
          parseFloat(pieces[3]),
          parseFloat(pieces[4]),
          parseFloat(pieces[5])
        ),
      };
    });
  } catch {
    // eslint-disable-next-line no-console
    console.warn("Error deserialising 2-arrows, defaulting to empty");
    return {};
  }
  return twoArrows;
}
