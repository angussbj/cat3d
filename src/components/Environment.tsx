import React, { ReactNode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Lighting } from "./Lighting";
import { Colors } from "ui";
import { OrbitControls } from "@react-three/drei";
import { EnvironmentContextProvider } from "./useEnvironment";
import { Controls } from "./Controls";
import { ControlMode } from "./ControlMode";

export function Environment({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [currentlyDragging, setCurrentlyDragging] = useState(true);
  const [controlMode, setControlMode] = useState<ControlMode>("view");

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <EnvironmentContextProvider
        environment={{ setCurrentlyDragging, setControlMode, controlMode }}
      >
        <Canvas
          style={{ background: Colors.BLACK.toString() }}
          camera={{ position: [0, 0, 10] }}
          shadows
        >
          <gridHelper args={[20, 20]} />
          <Lighting />
          {children}
          {currentlyDragging && <OrbitControls autoRotate={false} />}
        </Canvas>
        <Controls style={{ position: "absolute", top: 16, left: 16 }} />
      </EnvironmentContextProvider>
    </div>
  );
}
