import { stat } from "fs";
import { EditorAction, EditorState } from "../interfaces";

export const reducer = (
  state: EditorState,
  action: EditorAction
): EditorState => {
  switch (action.type) {
    case "SET_NODES":
      return {
        ...state,
        nodes: action.payload.nodes,
      };

    case "SET_EVENTS":
      return {
        ...state,
        events: action.payload.events,
      };

    case "SET_OPTIONS":
      return {
        ...state,
        options: action.payload.options,
      };

    case "REMOVE_NODE":
      const { [action.payload.id]: removedNode, ...remainingNodes } =
        state.nodes;
      return {
        ...state,
        nodes: remainingNodes,
      };

    case "PATCH_NODE":
      const { id, node } = action.payload;
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [id]: {
            ...state.nodes[id],
            ...node,
            data: {
              ...state.nodes[id].data,
              ...node?.data,
            },
            events: {
              ...state.nodes[id].events,
              ...node?.events,
            },
            related: {
              ...state.nodes[id].related,
              ...node?.related,
            },
          },
        },
      };

    case "PATCH_OPTIONS":
      return {
        ...state,
        options: {
          ...state.options,
          ...action.payload,
        },
      };

    case "ADD_NODE_EVENT":
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.event]: new Set(
            state.events[action.payload.event]
          ).add(action.payload.id),
        },
      };

    case "SET_NODE_EVENT":
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.event]: new Set(action.payload.ids),
        },
      };

    case "REMOVE_NODE_EVENT":
      state.events[action.payload.event].delete(action.payload.id);
      return {
        ...state,
        events: {
          ...state.events,
        },
      };

    default:
      return state;
  }
};
