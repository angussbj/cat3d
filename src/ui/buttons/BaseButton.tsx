import React from "react";
import { T } from "../T";
import Color from "color";
import { useHover } from "../useHover";

export interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  backgroundColor?: Color;
  textColor: Color;
  borderColor?: Color;
  ariaLabel?: string;
}

export function BaseButton({
  label,
  onClick,
  disabled,
  style,
  textStyle,
  backgroundColor,
  textColor,
  ariaLabel,
}: ButtonProps): React.ReactElement {
  const [ref, hovered] = useHover();
  const fade = disabled ? 0.4 : hovered ? 0.15 : 0;

  return (
    <button
      onClick={onClick}
      style={{
        minWidth: 60,
        paddingLeft: 12,
        paddingRight: 12,
        height: 32,
        borderRadius: 4,
        border: "none",
        cursor: disabled ? "default" : "pointer",
        backgroundColor:
          backgroundColor?.fade(fade).toString() || "transparent",
        ...style,
      }}
      ref={ref}
      aria-label={ariaLabel}
    >
      <T color={textColor.fade(fade)} style={textStyle}>
        {typeof label === "string" ? label.toUpperCase() : label}
      </T>
    </button>
  );
}
