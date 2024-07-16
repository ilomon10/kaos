import React from "react";
import { KonvaObject } from "./types"; // Assume types are in a separate file
import { Circle, Image, Rect, Text } from "react-konva";
import Konva from "konva";

interface ObjectComponentProps {
  object: KonvaObject<any>;
}

const ObjectComponent = React.forwardRef<any, ObjectComponentProps>(
  ({ object }, ref) => {
    switch (object.type) {
      case "rect":
        return (
          <Rect id={object.id} ref={ref} {...object.config} draggable={true} />
        );
      case "circle":
        return (
          <Circle
            id={object.id}
            ref={ref}
            {...object.config}
            draggable={true}
          />
        );
      case "image":
        return (
          <Image
            id={object.id}
            ref={ref}
            {...(object.config as Konva.ImageConfig)}
            draggable={true}
          />
        );
      case "text":
        return (
          <Text id={object.id} ref={ref} {...object.config} draggable={true} />
        );
    }
  }
);

export default ObjectComponent;
