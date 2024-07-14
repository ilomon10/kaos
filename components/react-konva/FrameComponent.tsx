import React from "react";
import { Layer as KonvaLayer, KonvaNodeEvents } from "react-konva";
import { KonvaObject, Layer } from "./types"; // Assume types are in a separate file
import ObjectComponent from "./ObjectComponent"; // Assume ObjectComponent is in a separate file
import Konva from "konva";

interface FrameProps extends Omit<KonvaNodeEvents, "onClick"> {
  layer: Layer;
  onChange?: (id: string, object: KonvaObject["transform"]) => void;
  onDragEnd?: KonvaNodeEvents["onDragEnd"];
  onTransformEnd?: KonvaNodeEvents["onTransformEnd"];
  onClick: (e: Konva.KonvaEventObject<Event>, object: KonvaObject) => void;
}

const FrameComponent: React.FC<React.PropsWithChildren<FrameProps>> = (
  props
) => {
  const { layer, children, onChange, onClick, ...events } = props;
  const refObject = React.useRef();

  const handleClick = (
    e: Konva.KonvaEventObject<Event>,
    object: KonvaObject
  ) => {
    onClick(e, object);
  };
  const handleTransformEnd = (
    e: Konva.KonvaEventObject<Event>,
    object: KonvaObject
  ) => {
    const node = e.target;
    object.transform = {
      ...object.transform,
      x: node.x(),
      y: node.y(),
      width: node.width(),
      height: node.height(),
    };
    onChange?.(object.id, object.transform);
  };
  const handleDragEnd = (
    e: Konva.KonvaEventObject<MouseEvent>,
    object: KonvaObject
  ) => {
    object.transform = {
      ...object.transform,
      x: e.target.x(),
      y: e.target.y(),
    };
    onChange?.(object.id, object.transform);
  };

  return (
    <KonvaLayer>
      {layer.objects.map((item) => (
        <ObjectComponent
          ref={refObject}
          key={item.id}
          draggable={true}
          obj={item}
          {...events}
          onDragEnd={(e) => handleDragEnd(e, item as any)}
          onClick={(e) => handleClick(e, item as any)}
          onTap={(e) => handleClick(e, item as any)}
          onTransformEnd={(e) => handleTransformEnd(e, item as any)}
        />
      ))}
      {children}
    </KonvaLayer>
  );
};

export default LayerComponent;
