import React, { useRef, useEffect } from "react";
import {
  Layer,
  Rect,
  Circle,
  Image,
  Transformer,
  Group,
  KonvaNodeEvents,
  Text,
} from "react-konva";
import { useKonvaContext } from "./KonvaContext"; // Assume KonvaContext is in a separate file
import { Artboard, KonvaObject } from "./types";
import Konva from "konva";
import ObjectComponent from "./ObjectComponent";

interface ArtboardProps extends Omit<KonvaNodeEvents, "onClick"> {
  artboard: Artboard;
}

const ArtboardComponent: React.FC<React.PropsWithChildren<ArtboardProps>> = (
  props
) => {
  const {
    updateObject,
    selectedObjects,
    selectObject,
    clearSelectionObject,
    attachNode,
    deselectObject,
  } = useKonvaContext();
  console.log(selectedObjects);

  const { artboard, children, ...events } = props;
  const wrapperGroupRef = React.useRef(null);
  const groupRef = React.useRef(null);
  const rectRef = React.useRef(null);

  const handleClick = (
    e: Konva.KonvaEventObject<Event>,
    object: KonvaObject
  ) => {
    
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
    // onChange?.(object.id, object.transform);
  };

  const handleTitleClick: KonvaNodeEvents["onClick"] = (evt) => {
    selectObject(rectRef.current as any);
  };
  const objectHandler: KonvaNodeEvents = {};

  const artboardHandler: KonvaNodeEvents = {
    onClick(evt) {
      clearSelectionObject();
    },
    onTransformEnd(evt) {},
  };

  return (
    <Layer>
      <Group ref={wrapperGroupRef} x={artboard.x} y={artboard.y}>
        <Rect
          ref={rectRef}
          x={0}
          y={0}
          width={artboard.width}
          height={artboard.height}
          fill="white"
          shadowOffsetX={1}
          shadowOffsetY={1}
          shadowBlur={2}
          shadowColor="#ddd"
        />
        <Group ref={groupRef} x={0} y={0}>
          {artboard.objects.map((item) => {
            return (
              <ObjectComponent
                key={item.id}
                draggable={true}
                obj={item}
                {...events}
                onDragEnd={(e) => handleDragEnd(e, item as any)}
                onClick={(e) => handleClick(e, item as any)}
                onTap={(e) => handleClick(e, item as any)}
                onTransformEnd={(e) => handleTransformEnd(e, item as any)}
              />
            );
          })}
        </Group>
        <Rect
          // ref={rectRef}
          listening={false}
          x={0}
          y={0}
          width={artboard.width}
          height={artboard.height}
          fill="white"
          shadowOffsetX={1}
          shadowOffsetY={1}
          shadowBlur={2}
          shadowColor="#ddd"
          globalCompositeOperation="destination-in"
        />
        <Text
          text={artboard.name}
          x={0}
          y={0}
          fontSize={14}
          fill="black"
          // listening={false}
          onPointerDown={handleTitleClick}
          offset={{
            x: 0,
            y: 16,
          }}
        />
        {children}
      </Group>
    </Layer>
  );
};

export default ArtboardComponent;
