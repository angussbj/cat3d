import React, { ReactElement } from "react";
import { getSphereGeometry } from "../geometries";
import { Elements, Node as NodeType } from "logic";
import { useSettings } from "../useSettings";
import { HighlightMaterial, SolidMaterial } from "../materials";
import { Colors } from "ui";
import { Draggable } from "../Draggable";
import { ClickEvent } from "../ClickEvent";

interface Props {
  node: NodeType;
  elements: Elements;
}

export function Node({
  node: { id, position },
  elements,
}: Props): ReactElement {
  const { nodeRadius, highlightWidth } = useSettings();

  return (
    <Draggable
      position={position}
      key={id}
      onClick={(event: ClickEvent): void => elements.onClick(id, event)}
    >
      <mesh geometry={getSphereGeometry(nodeRadius)}>
        <SolidMaterial color={Colors.GREY} />
      </mesh>
      {elements.selectionState(id) && (
        <mesh geometry={getSphereGeometry(nodeRadius + highlightWidth)}>
          <HighlightMaterial color={Colors.HIGHLIGHTS[0]} />
        </mesh>
      )}
    </Draggable>
  );
}
