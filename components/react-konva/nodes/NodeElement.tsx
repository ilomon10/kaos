import React from "react";

import { NodeProvider } from "./NodeContext";

import { NodeId } from "../interfaces";
import { RenderNodeToElement } from "../render";

export type NodeElementProps = {
  id: NodeId;
  render?: React.ReactElement;
};

export const NodeElement = ({ id, render }: NodeElementProps) => {
  return (
    <NodeProvider id={id}>
      <RenderNodeToElement render={render} />
    </NodeProvider>
  );
};
