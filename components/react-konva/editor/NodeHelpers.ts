import invariant from "tiny-invariant";
import { EditorState, NodeId } from "../interfaces";
import { ROOT_NODE_ID } from "../render";

export function NodeHelpers(state: EditorState, id: NodeId) {
  invariant(typeof id == "string", "Invalid Node ID");

  const node = state.nodes[id];

  const nodeHelpers = (id: NodeId) => NodeHelpers(state, id);

  return {
    isRoot() {
      return node.id === ROOT_NODE_ID;
    },
    isSelected() {
      return state.events.selected.has(id);
    },
    isHovered() {
      return state.events.hovered.has(id);
    },
    isDragged() {
      return state.events.dragged.has(id);
    },
    get() {
      return node;
    }
  };
}
