import React from "react";
import { Shape } from "./element/types"; // Assume types are in a separate file
import { Circle, Image, KonvaNodeEvents, Rect, Text } from "react-konva";
import Konva from "konva";
import { useElementOperations } from "./element/hooks";
import { useKonvaContext } from "./hooks";

interface ObjectComponentProps {
  object: Shape<any>;
}

const ObjectComponent = React.forwardRef<any, ObjectComponentProps>(
  ({ object }, ref) => {
    const { updateObject } = useElementOperations();
    const konvaCtx = useKonvaContext();

    const objectRef = React.useRef<Konva.Group | null>(null);

    const isSelected = konvaCtx.selected.object.has(object.id);

    const objectHandler: Partial<KonvaNodeEvents> = {
      onPointerDblClick(evt) {
        evt.evt.preventDefault();
        if (!objectRef.current) return;
        konvaCtx.helper.clearSelection();
        konvaCtx.helper.selectElement("object", object.id);
      },
      onDragEnd(evt) {
        const obj = objectRef.current;
        if (!obj) return;
        const nt = {
          x: obj.x(),
          y: obj.y(),
        };
        updateObject(object.id, {
          ...object,
          transform: { ...object.transform, ...nt },
        });
      },
    };

    const handleRef = (r: any) => {
      objectRef.current = r;
      if (typeof ref === "function") {
        ref(r);
      } else if (ref) {
        ref.current = r;
      }
    };

    switch (object.type) {
      case "rect":
        return (
          <Rect
            id={object.id}
            ref={handleRef}
            {...object.config}
            draggable={isSelected}
            {...objectHandler}
          />
        );
      case "circle":
        return (
          <Circle
            id={object.id}
            ref={handleRef}
            {...object.config}
            draggable={isSelected}
            {...objectHandler}
          />
        );
      case "image":
        return (
          <Image
            id={object.id}
            ref={handleRef}
            {...(object.config as Konva.ImageConfig)}
            draggable={isSelected}
            {...objectHandler}
          />
        );
      case "text":
        return (
          <Text
            id={object.id}
            ref={handleRef}
            {...object.config}
            draggable={isSelected}
            {...objectHandler}
          />
        );
    }
  }
);

export default ObjectComponent;
