import React, { ReactNode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Lighting } from "./Lighting";
import { Colors } from "ui";
import { OrbitControls } from "@react-three/drei";
import { EnvironmentContextProvider } from "./useEnvironment";
import { ControlMode } from "./ControlMode";

export function Environment({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [currentlyDragging, setCurrentlyDragging] = useState(false);
  const [controlMode, setControlMode] = useState<ControlMode>("view");
  const [onBackgroundClick, setOnBackgroundClick] = useState<
    (event: MouseEvent) => void
  >(() => {});

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <EnvironmentContextProvider
        environment={{
          setCurrentlyDragging,
          setOnBackgroundClick,
          setControlMode,
          controlMode,
        }}
      >
        <Canvas
          style={{ background: Colors.BLACK.toString() }}
          camera={{ position: [0, 0, 10] }}
          onPointerMissed={onBackgroundClick}
          shadows
        >
          <gridHelper args={[20, 20]} />
          <Lighting />
          {children}
          {!currentlyDragging && controlMode == "view" && (
            <OrbitControls autoRotate={false} />
          )}
        </Canvas>
      </EnvironmentContextProvider>
    </div>
  );
}
