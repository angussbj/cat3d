import { Vector3 } from "three";

type NodeId = `n${number}`;
type ArrowId = `1a${number}`;
type TwoArrowId = `2a${number}`;
type ThreeArrowId = `3a${number}`;

interface Node {
  id: NodeId;
  position: Vector3;
  label?: string;
}

interface Arrow {
  id: ArrowId;
  domainId: NodeId;
  codomainId: NodeId;
  guidePoints: Vector3[];
  label?: string;
}

interface TwoArrow {
  id: TwoArrowId;
  domainIds: ArrowId[];
  codomainIds: ArrowId[];
  guidePoint: Vector3;
  label?: string;
}

interface ThreeArrow {
  id: ThreeArrowId;
  domainIds: TwoArrowId[];
  codomainIds: TwoArrowId[];
  label?: string;
}

export class Elements {
  private nodes: Record<NodeId, Node>;
  private arrows: Record<ArrowId, Arrow>;
  private twoArrows: Record<TwoArrowId, TwoArrow>;
  private threeArrows: Record<ThreeArrowId, ThreeArrow>;
  private nodeIdCounter = 0;
  private arrowIdCounter = 0;
  private twoArrowIdCounter = 0;
  private threeArrowIdCounter = 0;

  constructor() {
    this.nodes = {};
    this.arrows = {};
    this.twoArrows = {};
    this.threeArrows = {};
  }

  addNode(position: Vector3): void {
    const id: NodeId = `n${this.nodeIdCounter}`;
    this.nodeIdCounter += 1;
    this.nodes[id] = { position, id };
  }

  getNodes(): Node[] {
    return Object.values(this.nodes);
  }
}
