import React from "react";
import Color from "color";
import { BackSide } from "three";

interface Props {
  color: Color;
}

export function HighlightMaterial({ color }: Props): React.ReactElement {
  return (
    <meshStandardMaterial
      attach="material"
      emissive={color.toString()}
      emissiveIntensity={0.5}
      side={BackSide}
    />
  );
}
