import { Vector3 } from "three";
import { keys } from "../utilities/keys";
import { ClickDetails } from "./ClickDetails";
import autoBind from "auto-bind";
import {
  Arrow,
  ArrowId,
  ElementId,
  isArrowId,
  isNodeId,
  isThreeArrowId,
  isTwoArrowId,
  Node,
  NodeId,
  ThreeArrow,
  ThreeArrowId,
  TwoArrow,
  TwoArrowId,
} from "./Element";
import {
  deserialiseArrows,
  deserialiseNodes,
  serialiseArrows,
  serialiseNodes,
} from "./serialisation";

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
    if (serialisedNodes) this.nodes = deserialiseNodes(serialisedNodes);
    const serialisedArrows = urlParams.get("a");
    if (serialisedArrows) this.arrows = deserialiseArrows(serialisedArrows);
  }

  // TODO: make update run after dragging
  update(): void {
    const url = new URL(window.location.toString());
    url.searchParams.set("n", serialiseNodes(this.nodes));
    url.searchParams.set("a", serialiseArrows(this.arrows));
    window.history.pushState({}, "", url);
    this.render();
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
