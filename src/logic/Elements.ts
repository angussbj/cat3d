import { Vector3 } from "three";
import { average, keys } from "utilities";
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
import { SelectionState } from "./SelectionState";
import { AddToast } from "react-toast-notifications";
import { composeArrows } from "./composeArrows";
import {
  deserialiseTwoArrows,
  serialiseTwoArrows,
} from "./serialisation/serialiseTwoArrows";

export class Elements {
  private nodes: Record<NodeId, Node> = {};
  private arrows: Record<ArrowId, Arrow> = {};
  private twoArrows: Record<TwoArrowId, TwoArrow> = {};
  private threeArrows: Record<ThreeArrowId, ThreeArrow> = {};
  private nodeIdCounter = 0;
  private arrowIdCounter = 0;
  private twoArrowIdCounter = 0;
  private threeArrowIdCounter = 0;
  private selected: Record<ElementId, false | "primary" | "secondary"> = {};

  constructor(private render: () => void, private addToast: AddToast) {
    const urlParams = new URLSearchParams(window.location.search);

    const serialisedNodes = urlParams.get("n");
    if (serialisedNodes) this.nodes = deserialiseNodes(serialisedNodes);
    this.nodeIdCounter = keys(this.nodes).length;

    const serialisedArrows = urlParams.get("a");
    if (serialisedArrows) this.arrows = deserialiseArrows(serialisedArrows);
    this.arrowIdCounter = keys(this.arrows).length;

    const serialisedTwoArrows = urlParams.get("a2");
    if (serialisedTwoArrows)
      this.twoArrows = deserialiseTwoArrows(serialisedTwoArrows);
    this.twoArrowIdCounter = keys(this.twoArrows).length;
  }

  // TODO: make update run after dragging
  update(): void {
    const url = new URL(window.location.toString());
    url.searchParams.set("n", serialiseNodes(this.nodes));
    url.searchParams.set("a", serialiseArrows(this.arrows));
    url.searchParams.set("a2", serialiseTwoArrows(this.twoArrows));
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
      guidePoint: average(
        this.nodes[domainId].position,
        this.nodes[codomainId].position
      ),
    };
  }

  addTwoArrow(
    domainIds: ArrowId[],
    codomainIds: ArrowId[],
    guidePoint: Vector3
  ): void {
    const id: TwoArrowId = `2a${this.twoArrowIdCounter}`;
    this.twoArrowIdCounter += 1;
    this.twoArrows[id] = {
      domainIds,
      codomainIds,
      id,
      guidePoint,
    };
  }

  addTwoArrowFromSelectionIfPossible(): void {
    const domainArrows = this.getSelectedArrows("primary");
    const codomainArrows = this.getSelectedArrows("secondary");
    const domain = composeArrows(domainArrows);
    const codomain = composeArrows(codomainArrows);
    if (!domain || !codomain) return;
    if (
      domain.domainId !== codomain.domainId ||
      domain.codomainId !== codomain.codomainId
    ) {
      return;
    }
    this.addTwoArrow(
      domain.sequence,
      codomain.sequence,
      average(...[...domainArrows, ...codomainArrows].map((a) => a.guidePoint))
    );
    this.selected = {};
  }

  getNodes(): Node[] {
    return Object.values(this.nodes);
  }

  getArrows(): Arrow[] {
    return Object.values(this.arrows);
  }

  getTwoArrows(): TwoArrow[] {
    return Object.values(this.twoArrows);
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

  getSelectedArrowIds(selectionState?: SelectionState): ArrowId[] {
    return keys(this.selected)
      .filter(isArrowId)
      .filter((x) => this.selected[x] === selectionState ?? true);
  }

  getSelectedArrows(selectionState?: SelectionState): Arrow[] {
    return this.getSelectedArrowIds(selectionState).map(
      (id) => this.arrows[id]
    );
  }

  onClick(id: ElementId, event: ClickDetails): void {
    if (isNodeId(id)) this.onNodeClick(id, event);
    else if (isArrowId(id)) this.onArrowClick(id, event);
    this.update();
  }

  onNodeClick(id: NodeId, event: ClickDetails): void {
    if (this.selectionState(id)) {
      if (event.shiftKey) {
        this.selected[id] = false;
      } else {
        this.selected = {};
      }
    } else if (event.shiftKey) {
      this.selected[id] = "primary";
    } else if (event.ctrlKey || event.metaKey) {
      this.getSelectedNodeIds().forEach((domainId) => {
        this.addArrow(domainId, id);
      });
      this.selected = {};
    } else {
      this.selected = { [id]: "primary" };
    }
  }

  onArrowClick(id: ArrowId, event: ClickDetails): void {
    if (this.selectionState(id)) {
      if (event.shiftKey) {
        this.selected[id] = false;
      } else {
        this.selected = {};
      }
    } else if (event.shiftKey && !(event.ctrlKey || event.metaKey)) {
      this.trySelectArrow(id, "primary");
    } else if (event.shiftKey && (event.ctrlKey || event.metaKey)) {
      this.trySelectArrow(id, "secondary");
    } else if (event.ctrlKey || event.metaKey) {
      // TODO: behaviour of cmd+shift should be different from just cmd
      this.trySelectArrow(id, "secondary");
    } else {
      this.selected = { [id]: "primary" };
    }
  }

  trySelectArrow(id: ArrowId, selectionType: SelectionState): void {
    // TODO: how does unselecting work?
    const proposedComposition = this.getSelectedArrows(selectionType).concat(
      this.arrows[id]
    );
    if (composeArrows(proposedComposition)) this.selected[id] = selectionType;
    else
      this.addToast("Cannot compose that arrow with current selection", {
        appearance: "warning",
      });
    this.addTwoArrowFromSelectionIfPossible();
  }

  selectionState(id: ElementId): SelectionState {
    return this.selected[id] ?? false;
  }

  deleteNode(id: NodeId): void {
    keys(this.arrows).forEach((arrowId) => {
      const arrow = this.arrows[arrowId];
      if (arrow.codomainId === id || arrow.domainId === id) {
        this.deleteArrow(arrowId);
      }
    });
    delete this.nodes[id];
  }

  deleteArrow(id: ArrowId): void {
    keys(this.twoArrows).forEach((twoArrowId) => {
      const twoArrow = this.twoArrows[twoArrowId];
      if (
        twoArrow.codomainIds.includes(id) ||
        twoArrow.domainIds.includes(id)
      ) {
        this.deleteTwoArrow(twoArrowId);
      }
    });
    delete this.arrows[id];
  }

  deleteTwoArrow(id: TwoArrowId): void {
    keys(this.threeArrows).forEach((threeArrowId) => {
      const threeArrow = this.threeArrows[threeArrowId];
      if (
        threeArrow.codomainIds.includes(id) ||
        threeArrow.domainIds.includes(id)
      ) {
        this.deleteThreeArrow(threeArrowId);
      }
    });
    delete this.twoArrows[id];
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
