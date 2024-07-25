import React from "react";
import { Node, NodeEventTypes, NodeId, Nodes, SerializedNode } from "./nodes";

export type Options = {
  onRender: React.ComponentType<{ render: React.ReactElement }>;
  resolver: Resolver;
};

export type Resolver = Record<string, string | React.ElementType>;

export type EditorEvents = Record<NodeEventTypes, Set<NodeId>>;

export type EditorState = {
  nodes: Nodes;
  events: EditorEvents;
  options: Options;
};

export type SerializedNodes = {
  ROOT_NODE_ID: string;
  nodes: Record<NodeId, SerializedNode>;
};

export type EditorAction =
  | { type: "SET_NODES"; payload: { nodes: Nodes } }
  | { type: "SET_EVENTS"; payload: { events: EditorEvents } }
  | { type: "SET_OPTIONS"; payload: { options: Options } }
  | {
      type: "SET_NODE_EVENT";
      payload: { event: NodeEventTypes; ids: NodeId[] };
    }
  | { type: "ADD_NODE_EVENT"; payload: { event: NodeEventTypes; id: NodeId } }
  | {
      type: "REMOVE_NODE_EVENT";
      payload: { event: NodeEventTypes; id: NodeId };
    }
  | { type: "REMOVE_NODE"; payload: { id: NodeId } }
  | { type: "PATCH_NODE"; payload: { node: Partial<Node>; id: NodeId } }
  | { type: "PATCH_OPTIONS"; payload: { options: Partial<Options> } };
