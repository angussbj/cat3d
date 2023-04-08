import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

type Settings = {
  nodeRadius: number;
  guidePointRadius: number;
  highlightWidth: number;
  arrowRadius: number;
};

const SettingsContext = createContext<Settings>({
  nodeRadius: 0,
  guidePointRadius: 0,
  highlightWidth: 0,
  arrowRadius: 0,
});

export function SettingsContextProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [nodeRadius] = useState(0.1);
  const [guidePointRadius] = useState(0.07);
  const [highlightWidth] = useState(0.005);
  const [arrowRadius] = useState(0.02);

  return (
    <SettingsContext.Provider
      value={{
        nodeRadius,
        guidePointRadius,
        highlightWidth,
        arrowRadius,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): Settings {
  return useContext(SettingsContext);
}
