import React, { ReactElement } from "react";
import { getBezierTubeGeometry, getSphereGeometry } from "../geometries";
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
  const { arrowRadius, highlightWidth, guidePointRadius } = useSettings();
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
        castShadow
        receiveShadow
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
