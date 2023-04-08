import React from "react";
import { Content } from "components";
import { Environment } from "./components/Environment";
import { SettingsContextProvider } from "./components/useSettings";
import { ToastProvider } from "react-toast-notifications";

// TODO: Consider replacing the Toast component https://www.npmjs.com/package/react-toast-notifications
function App(): React.ReactElement {
  return (
    <SettingsContextProvider>
      <ToastProvider autoDismiss={true} placement={"bottom-left"}>
        <Environment>
          <Content />
        </Environment>
      </ToastProvider>
    </SettingsContextProvider>
  );
}

export default App;
