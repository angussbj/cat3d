import React from "react";
import { Content } from "components";
import { Environment } from "./components/Environment";
import { SettingsContextProvider } from "./components/useSettings";

function App(): React.ReactElement {
  return (
    <SettingsContextProvider>
      <Environment>
        <Content />
      </Environment>
    </SettingsContextProvider>
  );
}

export default App;
