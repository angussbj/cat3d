import React, { ReactNode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Lighting } from "./Lighting";
import { Colors } from "ui";
import { OrbitControls } from "@react-three/drei";
import { EnvironmentContextProvider } from "./useEnvironment";

export function Environment({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [cameraControlsEnabled, setCameraControlsEnabled] = useState(true);

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <EnvironmentContextProvider environment={{ setCameraControlsEnabled }}>
        <Canvas
          style={{ background: Colors.BLACK.toString() }}
          camera={{ position: [0, 0, 10] }}
          shadows
        >
          <Lighting />
          {children}
          {cameraControlsEnabled && <OrbitControls autoRotate={false} />}
        </Canvas>
      </EnvironmentContextProvider>
    </div>
  );
}
