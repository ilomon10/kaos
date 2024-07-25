"use client";

import React from "react";
import { EditorState, Options } from "../interfaces/editor";
import { NodeEventTypes, NodeId } from "../interfaces/nodes";
import { reducer } from "./reducer";

export const editorInitialState: EditorState = {
  nodes: {},
  events: {
    dragged: new Set<NodeId>(),
    selected: new Set<NodeId>(),
    hovered: new Set<NodeId>(),
  },
  options: {
    resolver: {},
    onRender: ({ render }) => render,
  },
};

export const useEditorStore = (options: Partial<Options>) => {
  const [state, dispatch] = React.useReducer(reducer, {
    ...editorInitialState,
    options: {
      ...editorInitialState.options,
      ...options,
    },
  });
  return {
    state: state,
    dispatch: dispatch,

    addNodeEvent(type: NodeEventTypes, id: NodeId) {
      dispatch({ type: "ADD_NODE_EVENT", payload: { event: type, id } });
    },
    setNodeEvent(type: NodeEventTypes, ids: NodeId[]) {
      dispatch({ type: "SET_NODE_EVENT", payload: { event: type, ids } });
    },
    getEvent(type: NodeEventTypes) {
      return Array.from(state.events[type]);
    },
  };
};
