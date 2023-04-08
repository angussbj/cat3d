import React, { ReactElement } from "react";
import { Elements, TwoArrow as TwoArrowType } from "logic";
import { TranslucentMaterial } from "../materials";
import { Colors } from "ui";
import { getBezierSurfaceGeometry } from "../geometries";

interface Props {
  twoArrow: TwoArrowType;
  elements: Elements;
}

export function TwoArrow({
  twoArrow: { id, domainIds, codomainIds, guidePoint },
  elements,
}: Props): ReactElement {
  return (
    <>
      <mesh
        key={id}
        geometry={getBezierSurfaceGeometry(
          domainIds.map(elements.getArrowPoints.bind(elements)),
          codomainIds.map(elements.getArrowPoints.bind(elements)),
          guidePoint
        )}
        onClick={(event): void => elements.onClick(id, event)}
      >
        <TranslucentMaterial color={Colors.HIGHLIGHTS[0]} twoSided />
      </mesh>
    </>
  );
}
