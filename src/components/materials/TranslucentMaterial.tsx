import React from "react";
import Color from "color";
import { BackSide, DoubleSide } from "three";

interface Props {
  color: Color;
  twoSided?: boolean;
}

export function TranslucentMaterial({
  color,
  twoSided = false,
}: Props): React.ReactElement {
  return (
    <meshStandardMaterial
      attach="material"
      color={color.toString()}
      opacity={0.3}
      transparent
      side={twoSided ? DoubleSide : BackSide}
    />
  );
}
