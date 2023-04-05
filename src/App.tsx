import React from "react";
import { Content } from "components";
import { Environment } from "./components/Environment";

function App(): React.ReactElement {
  return (
    <Environment>
      <Content />
    </Environment>
  );
}

export default App;
