import React, { ReactElement } from "react";
import {
  getArrowheadGeometry,
  getBezierTubeGeometry,
  getSphereGeometry,
} from "../geometries";
import { Arrow as ArrowType, Elements } from "logic";
import { useSettings } from "../useSettings";
import {
  HighlightMaterial,
  SolidMaterial,
  TranslucentMaterial,
} from "../materials";
import { Colors } from "ui";
import { Draggable } from "../Draggable";

interface Props {
  arrow: ArrowType;
  elements: Elements;
}

export function Arrow({
  arrow: { id, guidePoint },
  elements,
}: Props): ReactElement {
  const { arrowRadius, highlightWidth, guidePointRadius, nodeRadius } =
    useSettings();
  const selectionState = elements.selectionState(id);
  const highlightColour = selectionState === "primary" ? 0 : 1;

  return (
    <>
      <mesh
        key={id}
        geometry={getBezierTubeGeometry(
          elements.getArrowPoints(id),
          arrowRadius
        )}
        onClick={(event): void => elements.onClick(id, event)}
      >
        <SolidMaterial color={Colors.GREY} />
      </mesh>
      <mesh
        key={id}
        geometry={getArrowheadGeometry(
          elements.getArrowPoints(id),
          0.07,
          0.14,
          nodeRadius / 3
        )}
        onClick={(event): void => elements.onClick(id, event)}
      >
        <SolidMaterial color={Colors.GREY} />
      </mesh>
      {selectionState && (
        <>
          <mesh
            key={id + "highlight"}
            geometry={getBezierTubeGeometry(
              elements.getArrowPoints(id),
              arrowRadius + highlightWidth
            )}
          >
            <HighlightMaterial color={Colors.HIGHLIGHTS[highlightColour]} />
          </mesh>
          <Draggable position={guidePoint} key={id + "guidePoint"}>
            <mesh geometry={getSphereGeometry(guidePointRadius)}>
              <TranslucentMaterial color={Colors.HIGHLIGHTS[highlightColour]} />
            </mesh>
          </Draggable>
        </>
      )}
    </>
  );
}
