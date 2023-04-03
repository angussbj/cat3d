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
  ariaLabel?: string;
}

export function MiniButton({
  label,
  color = Colors.LIGHT.fade(0.2),
  style,
  ...rest
}: Props): React.ReactElement {
  return (
    <BaseButton
      label={<div style={{ marginBottom: 2.4 }}>{label}</div>}
      style={{
        minWidth: 16,
        maxWidth: 16,
        minHeight: 16,
        maxHeight: 16,
        padding: 0,
        ...style,
      }}
      borderColor={color}
      textColor={color}
      {...rest}
    />
  );
}
