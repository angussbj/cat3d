import React, { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import MaterialUICheckbox from "@material-ui/core/Checkbox";
import { Colors } from "./Colors";
import { useHover } from "./useHover";

interface Props<T extends string> {
  object: { [key in T]: boolean };
  k: T;
  onChange: (newValue: boolean) => void;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export function Checkbox<T extends string>({
  object,
  k,
  onChange,
  style,
  ariaLabel,
}: Props<T>): React.ReactElement {
  const [renderHelper, setRenderHelper] = useState(false);
  const [ref, hovered] = useHover();
  const color = Colors.HIGHLIGHTS[0].fade(hovered ? 0.2 : 0).toString();

  return (
    <div style={style} ref={ref}>
      <div style={{ margin: -4 }}>
        <MaterialUICheckbox
          checked={object[k]}
          onChange={(event): void => {
            onChange(event.target.checked);
            setRenderHelper(!renderHelper);
          }}
          style={{
            color: color,
            backgroundColor: "transparent",
          }}
          icon={<ImCheckboxUnchecked size={11} color={color} />}
          checkedIcon={<ImCheckboxChecked size={11} color={color} />}
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
}
