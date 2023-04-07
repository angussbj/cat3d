import React from "react";
import Color from "color";

interface Props {
  color: Color;
}

export function SolidMaterial({ color }: Props): React.ReactElement {
  return (
    <meshStandardMaterial
      attach="material"
      color={color.toString()}
      emissiveIntensity={0}
      roughness={0.5}
    />
  );
}
