import { Node, NodeId } from "../interfaces";
import { EditorContextType } from "./EditorContext";
import { EventHandlers } from "./EventHandlers";

export function DefaultEventHandler(store: EditorContextType) {
  const eventHandlers = EventHandlers(store);

  const handlers = {
    connect: (el: Node["ref"], id: NodeId) => {
      const node = store.state.nodes[id];
      if (el === node.ref) return;
      store.dispatch({
        type: "PATCH_NODE",
        payload: { id, node: { ref: el } },
      });
    },
    select: (el: Node["ref"], id: NodeId) => {
      console.log(el);
      if (!el) return;
      const unbindOnMouseDown = eventHandlers.addEventListener(
        el,
        "mousedown",
        (e) => {
          console.log("MOUSE DOWN");
          e.evt.stopPropagation();

          let newSelectedIds: NodeId[] = [];

          if (id) {
            if (!newSelectedIds.includes(id)) {
              newSelectedIds.push(id);
            }
          }

          store.setNodeEvent("selected", newSelectedIds);
        }
      );

      const unbindOnClick = eventHandlers.addEventListener(el, "click", (e) => {
        console.log("ON CLICK");
        e.evt.stopPropagation();

        let selectedIds = store.getEvent("selected");
        let newSelectedIds: NodeId[] = [];
        const isSelected = selectedIds.includes(id);
        if (isSelected) {
          newSelectedIds = selectedIds.filter((selectedId) => selectedId != id);
        } else {
          newSelectedIds.push(id);
        }

        store.setNodeEvent("selected", newSelectedIds);
      });

      return () => {
        unbindOnMouseDown();
        unbindOnClick();
      };
    },
  };

  return handlers;
}
