import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export function Hidden({ children }: Props): React.ReactElement {
  return (
    <span
      style={{
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        height: 1,
        width: 1,
        margin: -1,
        padding: 0,
        border: 0,
        position: "absolute",
      }}
    >
      {children}
    </span>
  );
}
