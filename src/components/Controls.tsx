import React, { useCallback, useState } from "react";
import { useEnvironment } from "./useEnvironment";
import { Column, Row } from "ui";
import { ControlMode } from "./ControlMode";
import styled from "styled-components";
import { capitalize } from "@material-ui/core";

export function Controls({
  style,
}: {
  style?: React.CSSProperties;
}): React.ReactElement {
  const { controlMode, setControlMode } = useEnvironment();
  const [open, setOpen] = useState(false);

  const selectControlMode = useCallback(
    (mode: ControlMode) => (): void => {
      setOpen(false);
      setControlMode(mode);
    },
    []
  );

  return (
    <Column style={style}>
      <Row style={{ alignItems: "flex-start" }}>
        <Button onClick={(): void => setOpen((o) => !o)}>
          {capitalize(controlMode.replace("_", " "))}
        </Button>
        {open && (
          <Column>
            <Button onClick={selectControlMode("view")}>View</Button>
            <Button onClick={selectControlMode("create_object")}>
              Create object
            </Button>
          </Column>
        )}
      </Row>
    </Column>
  );
}

const Button = styled.button`
  margin: 4px;
`;
