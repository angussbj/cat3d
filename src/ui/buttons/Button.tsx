import React from "react";
import { BaseButton } from "./BaseButton";
import Color from "color";
import { Colors } from "../Colors";

interface Props {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  color?: Color;
}

export function Button({
  color = Colors.LIGHT.fade(0.2),
  ...rest
}: Props): React.ReactElement {
  return (
    <BaseButton
      backgroundColor={color || Colors.LIGHT.fade(0.2)}
      textColor={color.isLight() ? Colors.DARK : Colors.LIGHT}
      {...rest}
    />
  );
}
