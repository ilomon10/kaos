import { KonvaEventListener, KonvaEventObject } from "konva/lib/Node";
import { AnyKonvaNodeComponent, EditorState, Node } from "../interfaces";
import { KonvaNodeEvents } from "react-konva";
import Konva from "konva";
import { EditorContextType } from "./EditorContext";
import { KonvaNodeEvent } from "konva/lib/types";
import { KonvaEvents } from "../interfaces/events";

export function EventHandlers(store: EditorContextType) {
  return {
    addEventListener<K extends KonvaEvents>(
      el: AnyKonvaNodeComponent,
      eventName: K,
      listener: (e: Konva.KonvaEventObject<Event>) => void
    ) {
      const bindListener = (e: Konva.KonvaEventObject<Event>) => {
        listener?.(e as any);
      };

      el.on(eventName, bindListener);

      return () => {
        el.off(eventName, bindListener);
      };
    },
  };
}
