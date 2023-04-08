import { Vector3 } from "three";

export type NodeId = `n${number}`;
export type ArrowId = `1a${number}`;
export type TwoArrowId = `2a${number}`;
export type ThreeArrowId = `3a${number}`;
export type ElementId = NodeId | ArrowId | TwoArrowId | ThreeArrowId;

export function isNodeId(id: ElementId): id is NodeId {
  return id.startsWith("n");
}

export function isArrowId(id: ElementId): id is ArrowId {
  return id.startsWith("1a");
}

export function isTwoArrowId(id: ElementId): id is TwoArrowId {
  return id.startsWith("2a");
}

export function isThreeArrowId(id: ElementId): id is ThreeArrowId {
  return id.startsWith("3a");
}

export interface Element {
  label?: string;
}

export interface Node extends Element {
  id: NodeId;
  position: Vector3;
}

export interface Arrow extends Element {
  id: ArrowId;
  domainId: NodeId;
  codomainId: NodeId;
  guidePoint: Vector3;
}

export interface TwoArrow extends Element {
  id: TwoArrowId;
  domainIds: ArrowId[];
  codomainIds: ArrowId[];
  guidePoint: Vector3;
}

export interface ThreeArrow extends Element {
  id: ThreeArrowId;
  domainIds: TwoArrowId[];
  codomainIds: TwoArrowId[];
}
