import React from "react";
import { NodeContext } from "./NodeContext";
import invariant from "tiny-invariant";
import { useInternalEditor } from "../editor/useInternalEditor";
import Konva from "konva";
import { Node } from "../interfaces";

export function useInternalNode<S = null>(collect?: (node: Node) => S) {
  const context = React.useContext(NodeContext);
  invariant(context, "useInternalNode must be within NodeProvider");

  const { id, related } = context;

  const { nodes, connectors: editorConnectors } = useInternalEditor();

  const node = nodes[id];

  const connectors = React.useMemo(
    () => ({
      connect: (el: Node["ref"]) => editorConnectors.connect(el, id),
      select: (el: Node["ref"]) => editorConnectors.select(el, id),
    }),
    [editorConnectors, id]
  );

  return {
    ...node,
    id,
    related,
    inNodeContext: !!context,
    connectors,
  };
}
