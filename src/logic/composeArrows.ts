import { Arrow, ArrowId, NodeId } from "./Element";

export function composeArrows(
  arrows: Arrow[]
): { domainId: NodeId; codomainId: NodeId; sequence: ArrowId[] } | false {
  if (arrows.length === 0) return false;

  const nodes: Record<NodeId, { in?: Arrow; out?: Arrow }> = {};
  arrows.forEach((arrow) => {
    const { domainId, codomainId } = arrow;
    if (nodes[domainId]) {
      if (!nodes[domainId].out) nodes[domainId].out = arrow;
      else return false;
    } else nodes[domainId] = { out: arrow };

    if (nodes[codomainId]) {
      if (!nodes[codomainId].in) nodes[codomainId].in = arrow;
      else return false;
    } else nodes[codomainId] = { in: arrow };
  });

  const firstArrow =
    Object.values(nodes).find((n) => n.out && !n.in)?.out ?? arrows[0];
  const domainId = firstArrow.domainId;
  let currentCodomainId = firstArrow.codomainId;
  let nextArrow = nodes[currentCodomainId].out;
  const sequence = [firstArrow.id];

  // TODO: think about an interface that would allow composition of an endomorphism with itself
  while (nextArrow && nextArrow !== firstArrow) {
    sequence.push(nextArrow.id);
    currentCodomainId = nextArrow.codomainId;
    nextArrow = nodes[currentCodomainId].out;
  }

  if (sequence.length !== arrows.length) return false;

  return {
    domainId,
    codomainId: currentCodomainId,
    sequence,
  };
}
