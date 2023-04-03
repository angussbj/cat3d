import React from "react";
import { Colors } from "../Colors";
import Color from "color";
import { BaseButton } from "./BaseButton";

interface Props {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  color?: Color;
}

export function TextButton({
  color = Colors.ACCENT_BLUE,
  style,
  ...rest
}: Props): React.ReactElement {
  return (
    <BaseButton
      style={{
        minWidth: 16,
        maxWidth: 16,
        minHeight: 16,
        maxHeight: 16,
        padding: 0,
        ...style,
      }}
      textColor={color}
      textStyle={{ fontSize: 18 }}
      {...rest}
    />
  );
}
