import React from "react";
import Color from "color";
import { BackSide } from "three";

interface Props {
  color: Color;
}

export function HighlightMaterial({ color }: Props): React.ReactElement {
  return (
    <meshBasicMaterial
      attach="material"
      color={color.toString()}
      side={BackSide}
    />
  );
}
