import React from "react";
import Color from "color";

interface Props {
  color: Color;
}

export function TranslucentMaterial({ color }: Props): React.ReactElement {
  return (
    <meshStandardMaterial
      attach="material"
      color={color.toString()}
      opacity={0.3}
      transparent
    />
  );
}
