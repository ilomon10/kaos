"use client";

import Konva from "konva";
import React from "react";
import { EditorContext, EditorContextType } from "./EditorContext";
import invariant from "tiny-invariant";
import {
  EditorState,
  Node,
  NodeId,
  Nodes,
  SerializedNode,
  SerializedNodes,
  UserComponent,
} from "../interfaces";
import { ROOT_NODE_ID } from "../render";
import { EventHandlerContextType, useEventHandler } from "./EventContext";

export type useInternalEditorType = Omit<EditorState, "events"> & {
  connectors: EventHandlerContextType;
  deserialize: (data: SerializedNodes) => void;
  serialize: () => SerializedNodes;

  context: EditorContextType;
};

export function useInternalEditor(): useInternalEditorType {
  const connectors = useEventHandler();
  const store = React.useContext(EditorContext);
  invariant(store, "useInternalEditor must be within EditorProvider");

  const serialize: useInternalEditorType["serialize"] = () => {
    return {
      ROOT_NODE_ID: ROOT_NODE_ID,
      nodes: Object.keys(store.state.nodes).reduce((p, c) => {
        return {
          ...p,
          [c]: store.state.nodes[c].data,
        };
      }, {}),
    };
  };

  const deserialize: useInternalEditorType["deserialize"] = (data) => {
    const resolver = store.state.options.resolver;
    store.dispatch({
      type: "SET_NODES",
      payload: {
        nodes: {
          ...Object.keys(data.nodes).reduce((p, c) => {
            const d = data.nodes[c];
            const resolved = resolver[d.type] as UserComponent;
            return {
              ...p,
              [c]: {
                id: d.id,
                data: d,
                type: resolved,
                events: {},
                ref: null,
                related: resolved.konva?.related,

                __hydrationTimestamp: Date.now(),
              },
            };
          }, {}),
        },
      },
    });
  };

  return {
    connectors,

    serialize,
    deserialize,

    nodes: store.state.nodes,
    options: store.state.options,

    context: store,
  };
}
