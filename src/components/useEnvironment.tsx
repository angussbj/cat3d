import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import { ControlMode } from "./ControlMode";

type Environment = {
  setCurrentlyDragging: (enabled: boolean) => void;
  setControlMode: (mode: ControlMode) => void;
  controlMode: ControlMode;
};

const EnvironmentContext = createContext<Environment>({
  setCurrentlyDragging: () => {},
  setControlMode: () => {},
  controlMode: "view",
});

export function EnvironmentContextProvider({
  children,
  environment,
}: {
  environment: Environment;
  children: ReactNode;
}): ReactElement {
  return (
    <EnvironmentContext.Provider value={environment}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment(): Environment {
  return useContext(EnvironmentContext);
}
