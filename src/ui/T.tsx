import React from "react";
import styled from "styled-components";
import { Colors } from "./Colors";
import Color from "color";

interface Props {
  size?: "small" | "tiny";
  color?: Color;
  children: React.ReactNode;
  unselectable?: boolean;
  monospace?: boolean;
  style?: React.CSSProperties;
}

export function T({
  size,
  color,
  unselectable,
  monospace,
  children,
  style,
}: Props): React.ReactElement {
  const finalStyle = {
    color: (color || Colors.LIGHT.fade(0.2)).toString(),
    fontSize:
      size === "tiny" ? 8 : size === "small" ? 11 : size === "big" ? 16 : 12,
    fontFamily: monospace ? "monospace" : undefined,
    ...style,
  };

  return unselectable ? (
    <UnselectableText style={finalStyle}>{children}</UnselectableText>
  ) : (
    <div style={finalStyle}>{children}</div>
  );
}

const UnselectableText = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
