import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";

type Environment = {
  setCurrentlyDragging: (enabled: boolean) => void;
};

const EnvironmentContext = createContext<Environment>({
  setCurrentlyDragging: () => {},
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
