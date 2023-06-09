import React, { FC } from "react";
import { Colors } from "ui";

export const Lighting: FC = () => {
  // general glow plus three slightly different-warmth lights around the equator
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[0, 0, 20]}
        color={Colors.LIGHTING.WARM.toString()}
        castShadow={true}
      />
      <directionalLight
        position={[17, 0, -10]}
        color={Colors.LIGHTING.COLD.toString()}
        castShadow={true}
      />
      <directionalLight
        position={[-17, 0, -10]}
        color={Colors.LIGHTING.NEUTRAL.toString()}
        castShadow={true}
      />
      <directionalLight
        position={[0, 20, 0]}
        color={Colors.LIGHTING.WARM.toString()}
        castShadow={true}
      />
      <directionalLight
        position={[0, -20, 0]}
        color={Colors.LIGHTING.COLD.toString()}
        castShadow={true}
      />
    </>
  );
};
