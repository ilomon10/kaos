"use client";

import React from "react";
import { Artboard } from "../element/types";
import { useElementContextState } from "../element/state";
import LayerComponent from "../LayerComponent";
import GroupComponent from "../GroupComponent";
import { Group, KonvaNodeEvents, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import { TransformContextProvider } from "./TransformContext";
import { KonvaEventObject } from "konva/lib/Node";
import { useKonvaContext } from "../hooks";

interface ArtboardElementProps {
  artboard: Artboard;
}

const ArtboardElement: React.FC<ArtboardElementProps> = ({ artboard }) => {
  const state = useElementContextState();
  const konvaCtx = useKonvaContext();

  const wrapperRef = React.useRef<Konva.Group | null>(null as any);
  const groupRef = React.useRef<Konva.Group | null>(null as any);
  const boardRef = React.useRef<Konva.Rect | null>(null as any);
  const titleRef = React.useRef<Konva.Text | null>(null as any);

  const isSelected = konvaCtx.selected.artboard.has(artboard.id);

  const titleHandler: KonvaNodeEvents = {
    onPointerClick(evt) {
      konvaCtx.helper.clearSelection();
      konvaCtx.helper.selectElement("artboard", artboard.id);
    },
  };

  return (
    <Group id={artboard.id} ref={wrapperRef} x={artboard.x} y={artboard.y}>
      <Text
        ref={titleRef}
        name="artboard-title"
        text={artboard.name}
        x={0}
        y={0}
        listening={true}
        fontSize={12}
        fill={isSelected ? "#228be3" : "#777"}
        offset={{
          x: 0,
          y: 14,
        }}
        {...titleHandler}
      />
      <Rect
        ref={boardRef}
        name="artboard-board"
        x={0}
        y={0}
        listening={false}
        width={artboard.width}
        height={artboard.height}
        fill="white"
        shadowOffsetX={1}
        shadowOffsetY={1}
        shadowBlur={2}
        shadowColor="#ddd"
      />
      <Group ref={groupRef} name="artboard-group">
        {artboard.children.map((childId) => {
          if (childId in state.layers)
            return (
              <LayerComponent key={childId} layer={state.layers[childId]} />
            );
          if (childId in state.groups)
            return (
              <GroupComponent key={childId} group={state.groups[childId]} />
            );
          return null;
        })}
      </Group>
    </Group>
  );
};

const ArtboardComponent: React.FC<ArtboardElementProps> = ({ artboard }) => {
  return (
    <Layer>
      <TransformContextProvider>
        <ArtboardElement artboard={artboard} />
      </TransformContextProvider>
    </Layer>
  );
};

export default ArtboardComponent;
