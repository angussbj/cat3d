import { Vector3 } from "three";
import { keys } from "../utilities/keys";
import { ClickDetails } from "./ClickDetails";
import autoBind from "auto-bind";

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

function isTwoArrowId(id: ElementId): id is TwoArrowId {
  return id.startsWith("2a");
}

function isThreeArrowId(id: ElementId): id is ThreeArrowId {
  return id.startsWith("3a");
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

  constructor(private render: () => void) {
    const urlParams = new URLSearchParams(window.location.search);
    const serialisedNodes = urlParams.get("n");
    if (serialisedNodes) this.setNodesFromSerialisedNodes(serialisedNodes);
    const serialisedArrows = urlParams.get("a");
    if (serialisedArrows) this.setArrowsFromSerialisedArrows(serialisedArrows);
  }

  // TODO: make update run after dragging
  update(): void {
    const url = new URL(window.location.toString());
    url.searchParams.set("n", this.serialisedNodes());
    url.searchParams.set("a", this.serialisedArrows());
    window.history.pushState({}, "", url);
    this.render();
  }

  serialisedNodes(): string {
    return Object.values(this.nodes)
      .map((n) =>
        [
          n.id,
          n.position.x.toFixed(3),
          n.position.y.toFixed(3),
          n.position.z.toFixed(3),
        ].join("*")
      )
      .join("_");
  }

  setNodesFromSerialisedNodes(serialised: string): void {
    this.nodes = {};
    serialised.split("_").forEach((str) => {
      const pieces = str.split("*");
      this.nodes[pieces[0] as NodeId] = {
        id: pieces[0] as NodeId,
        position: new Vector3(
          parseFloat(pieces[1]),
          parseFloat(pieces[2]),
          parseFloat(pieces[3])
        ),
      };
    });
  }

  serialisedArrows(): string {
    return Object.values(this.arrows)
      .map((a) =>
        [
          a.id,
          a.domainId,
          a.codomainId,
          a.guidePoint.x.toFixed(3),
          a.guidePoint.y.toFixed(3),
          a.guidePoint.z.toFixed(3),
        ].join("*")
      )
      .join("_");
  }

  setArrowsFromSerialisedArrows(serialised: string): void {
    this.arrows = {};
    serialised.split("_").forEach((str) => {
      const pieces = str.split("*");
      this.arrows[pieces[0] as ArrowId] = {
        id: pieces[0] as ArrowId,
        domainId: pieces[1] as NodeId,
        codomainId: pieces[2] as NodeId,
        guidePoint: new Vector3(
          parseFloat(pieces[3]),
          parseFloat(pieces[4]),
          parseFloat(pieces[5])
        ),
      };
    });
  }

  addNode(position: Vector3): void {
    const id: NodeId = `n${this.nodeIdCounter}`;
    this.nodeIdCounter += 1;
    this.nodes[id] = { position, id };
    this.selected = {};
    this.update();
    autoBind(this);
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
    this.update();
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

  deleteNode(id: NodeId): void {
    delete this.nodes[id];
    keys(this.arrows).forEach((arrowId) => {
      const arrow = this.arrows[arrowId];
      if (arrow.codomainId === id || arrow.domainId === id) {
        delete this.arrows[arrowId];
      }
    });
  }

  deleteArrow(id: ArrowId): void {
    delete this.arrows[id];
    keys(this.twoArrows).forEach((twoArrowId) => {
      const twoArrow = this.twoArrows[twoArrowId];
      if (
        twoArrow.codomainIds.includes(id) ||
        twoArrow.domainIds.includes(id)
      ) {
        delete this.twoArrows[twoArrowId];
      }
    });
  }

  deleteTwoArrow(id: TwoArrowId): void {
    delete this.twoArrows[id];
    keys(this.threeArrows).forEach((threeArrowId) => {
      const threeArrow = this.threeArrows[threeArrowId];
      if (
        threeArrow.codomainIds.includes(id) ||
        threeArrow.domainIds.includes(id)
      ) {
        delete this.threeArrows[threeArrowId];
      }
    });
  }

  deleteThreeArrow(id: ThreeArrowId): void {
    delete this.threeArrows[id];
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      keys(this.selected).forEach((id) => {
        if (isNodeId(id)) this.deleteNode(id);
        if (isArrowId(id)) this.deleteArrow(id);
        if (isTwoArrowId(id)) this.deleteTwoArrow(id);
        if (isThreeArrowId(id)) this.deleteThreeArrow(id);
      });
      this.selected = {};
      this.update();
    }
  }
}
