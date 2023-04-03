import React, { useEffect, useRef } from "react";
import "./TextField.css";

interface Props {
  value: string | number;
  onChange: (newVal: string) => void;
  style: React.CSSProperties;
  focusFirstRender?: boolean;
  onSubmit?: () => void;
  ariaLabel?: string;
}

export function TextField({
  value,
  onChange,
  style,
  focusFirstRender,
  onSubmit,
  ariaLabel,
}: Props): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focusFirstRender) inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      className="input"
      onChange={(e): void => {
        onChange(e.target.value);
      }}
      onKeyDown={(e): void => {
        if (e.key === "Enter") onSubmit?.();
      }}
      aria-label={ariaLabel}
      style={style}
    />
  );
}
