import React from "react";

export function CenteredScreenContentContainer({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      style={{
        flexGrow: 1,
        padding: 32,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ flexGrow: 1, minHeight: 24 }} />
        {children}
        <div style={{ flexGrow: 1, minHeight: 40 }} />
      </div>
    </div>
  );
}
