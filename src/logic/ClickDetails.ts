import { ModifierKey } from "react";

export interface ClickDetails {
  altKey: boolean;
  button: number;
  buttons: number;
  ctrlKey: boolean;
  getModifierState(key: ModifierKey): boolean;
  metaKey: boolean;
  shiftKey: boolean;
}
