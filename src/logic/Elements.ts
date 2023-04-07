import { Vector3 } from "three";
import { keys } from "../utilities/keys";
import { ClickDetails } from "./ClickDetails";

type NodeId = `n${number}`;
type ArrowId = `1a${number}`;
type TwoArrowId = `2a${number}`;
type ThreeArrowId = `3a${number}`;
type ElementId = NodeId | ArrowId | TwoArrowId | ThreeArrowId;

function isNodeId(id: ElementId): id is NodeId {
  return id.startsWith("n");
}

function isArrowId(id: ElementId): id is ArrowId {
  return id.startsWith("1a");
}

interface Element {
  label?: string;
}

interface Node extends Element {
  id: NodeId;
  position: Vector3;
}

interface Arrow extends Element {
  id: ArrowId;
  domainId: NodeId;
  codomainId: NodeId;
  guidePoint: Vector3;
}

interface TwoArrow extends Element {
  id: TwoArrowId;
  domainIds: ArrowId[];
  codomainIds: ArrowId[];
  guidePoint: Vector3;
}

interface ThreeArrow extends Element {
  id: ThreeArrowId;
  domainIds: TwoArrowId[];
  codomainIds: TwoArrowId[];
}

export class Elements {
  private nodes: Record<NodeId, Node> = {};
  private arrows: Record<ArrowId, Arrow> = {};
  private twoArrows: Record<TwoArrowId, TwoArrow> = {};
  private threeArrows: Record<ThreeArrowId, ThreeArrow> = {};
  private nodeIdCounter = 0;
  private arrowIdCounter = 0;
  private twoArrowIdCounter = 0;
  private threeArrowIdCounter = 0;
  private selected: Record<ElementId, boolean> = {};

  constructor(private render: () => void) {}

  addNode(position: Vector3): void {
    const id: NodeId = `n${this.nodeIdCounter}`;
    this.nodeIdCounter += 1;
    this.nodes[id] = { position, id };
    this.selected = {};
    this.render();
  }

  addArrow(domainId: NodeId, codomainId: NodeId): void {
    const id: ArrowId = `1a${this.arrowIdCounter}`;
    this.arrowIdCounter += 1;
    this.arrows[id] = {
      domainId,
      codomainId,
      id,
      guidePoint: new Vector3()
        .copy(this.nodes[domainId].position)
        .add(this.nodes[codomainId].position)
        .multiplyScalar(0.5),
    };
  }

  getNodes(): Node[] {
    return Object.values(this.nodes);
  }

  getArrows(): Arrow[] {
    return Object.values(this.arrows);
  }

  getArrowPoints(id: ArrowId): [Vector3, Vector3, Vector3] {
    const { domainId, guidePoint, codomainId } = this.arrows[id];
    return [
      this.nodes[domainId].position,
      guidePoint,
      this.nodes[codomainId].position,
    ];
  }

  getSelectedNodeIds(): NodeId[] {
    return keys(this.selected)
      .filter(isNodeId)
      .filter((x) => this.selected[x]);
  }

  getSelectedArrowIds(): ArrowId[] {
    return keys(this.selected)
      .filter(isArrowId)
      .filter((x) => this.selected[x]);
  }

  onClick(id: ElementId, event: ClickDetails): void {
    if (isNodeId(id)) this.onNodeClick(id, event);
    else if (isArrowId(id)) this.onArrowClick(id, event);
    this.render();
    console.log(id);
  }

  onNodeClick(id: NodeId, event: ClickDetails): void {
    if (this.isSelected(id)) {
      if (event.shiftKey) {
        this.selected[id] = false;
      } else {
        this.selected = {};
      }
    } else if (event.shiftKey) {
      this.selected[id] = true;
    } else if (event.ctrlKey || event.metaKey) {
      this.getSelectedNodeIds().forEach((domainId) => {
        this.addArrow(domainId, id);
      });
      this.selected = {};
    } else {
      this.selected = { [id]: true };
    }
  }

  onArrowClick(id: ArrowId, event: ClickDetails): void {
    if (this.isSelected(id)) {
      if (event.shiftKey) {
        this.selected[id] = false;
      } else {
        this.selected = {};
      }
    } else if (event.shiftKey && !(event.ctrlKey || event.metaKey)) {
      // TODO: check that the selected arrows compose
      this.selected[id] = true;
    } else if (event.ctrlKey || event.metaKey) {
      // TODO: work out how to build a 2-arrow
      this.selected = {};
    } else {
      this.selected = { [id]: true };
    }
  }

  isSelected(id: ElementId): boolean {
    return !!this.selected[id];
  }
}
