export interface ClickDetails {
  stopPropagation: () => void;
  altKey: boolean;
  button: number;
  buttons: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
}
