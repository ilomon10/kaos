"use client";

import React from "react";
import { Artboard } from "../types";
import { useKonvaContextState } from "../state";
import LayerComponent from "../LayerComponent";
import GroupComponent from "../GroupComponent";
import {
  Group,
  KonvaNodeComponent,
  KonvaNodeEvents,
  Layer,
  Rect,
  Text,
  Transformer,
} from "react-konva";
import { useElementOperations } from "../hooks";
import Konva from "konva";
import { useDisclosure } from "@mantine/hooks";
import { KonvaEventListener } from "konva/lib/Node";
import {
  TransformContextProvider,
  useTransformContext,
} from "./TransformContext";

interface ArtboardElementProps {
  artboard: Artboard;
}

const ArtboardElement: React.FC<ArtboardElementProps> = ({ artboard }) => {
  const state = useKonvaContextState();

  const transformerContext = useTransformContext();

  const { updateArtboard } = useElementOperations();
  const wrapperRef = React.useRef<Konva.Group | null>(null as any);
  const groupRef = React.useRef<Konva.Group | null>(null as any);
  const boardRef = React.useRef<Konva.Rect | null>(null as any);
  const titleRef = React.useRef<Konva.Text | null>(null as any);

  const [focused, { open: focus, close: unfocus }] = useDisclosure(false);

  const artboardHandler: KonvaNodeEvents = {
    onDragEnd(evt) {
      const newPos = {
        x: evt.target.x(),
        y: evt.target.y(),
      };
      updateArtboard(artboard.id, { ...newPos });
    },
  };

  const titleHandler: KonvaNodeEvents = {
    onPointerDown(evt) {
      focus();
    },
    onDragMove(evt) {
      if (!titleRef.current || !wrapperRef.current) return;

      const title = titleRef.current;
      const wrapper = wrapperRef.current;

      const newTransform = {
        x: title.x() + wrapper.x(),
        y: title.y() + wrapper.y(),
      };

      wrapper.x(newTransform.x);
      wrapper.y(newTransform.y);

      title.x(0);
      title.y(0);
    },

    onDragEnd(evt) {
      if (!wrapperRef.current) return;
      const wrapper = wrapperRef.current;

      const newTransform = {
        x: wrapper.x(),
        y: wrapper.y(),
      };

      updateArtboard(artboard.id, { ...newTransform });
    },
  };

  const boardHandler: KonvaNodeEvents = {
    onTransform(evt) {
      if (!groupRef.current || !boardRef.current || !wrapperRef.current) return;

      const group = groupRef.current;
      const board = boardRef.current;
      const wrapper = wrapperRef.current;

      const newTransform = {
        x: board.x() + wrapper.x(),
        y: board.y() + wrapper.y(),
        width: board.width(),
        height: board.height(),
        rotation: board.rotation(),
      };

      // wrapper.rotation(newTransform.rotation);
      wrapper.x(newTransform.x);
      wrapper.y(newTransform.y);

      // board.rotation(0);
      board.x(0);
      board.y(0);
    },
    onTransformEnd(evt) {
      if (!boardRef.current || !wrapperRef.current) return;
      const board = boardRef.current;
      const wrapper = wrapperRef.current;

      const newTransform = {
        x: wrapper.x(),
        y: wrapper.y(),
        width: board.width(),
        height: board.height(),
      };

      updateArtboard(artboard.id, { ...newTransform });
    },
  };

  React.useEffect(() => {
    const title = titleRef.current as Konva.Text;
    const board = boardRef.current as Konva.Rect;
    const wrapper = wrapperRef.current as Konva.Group;
    const stage = title.getStage();

    const tr = stage?.findOne(
      `#${transformerContext.transformerId}`
    ) as Konva.Transformer;

    const onPointerDown: KonvaNodeEvents["onPointerDown"] = (evt) => {
      // console.log(evt.target === stage, evt.target === boardRef.current);
      const trChildren = tr?.children || [];
      if ([title, board, ...trChildren].indexOf(evt.target as any) > -1) return;
      unfocus();
    };

    stage?.on("pointerdown", onPointerDown);
    return () => {
      stage?.off("pointerdown", onPointerDown);
    };
  }, []);

  React.useEffect(() => {
    if (!boardRef.current) return;
    if (focused) {
      transformerContext.addElement({
        id: artboard.id,
        element: artboard,
        object: boardRef.current,
      });
    } else {
      transformerContext.removeElement(artboard.id);
    }
  }, [focused]);

  return (
    <Group id={artboard.id} ref={wrapperRef} x={artboard.x} y={artboard.y}>
      <Text
        ref={titleRef}
        name="artboard-title"
        text={artboard.name}
        x={0}
        y={0}
        fontSize={14}
        fill="black"
        draggable={true}
        onDragMove={titleHandler.onDragMove}
        onDragEnd={titleHandler.onDragEnd}
        onPointerDown={titleHandler.onPointerDown}
        offset={{
          x: 0,
          y: 16,
        }}
      />
      <Rect
        ref={boardRef}
        name="artboard-board"
        onTransform={boardHandler.onTransform}
        onTransformEnd={boardHandler.onTransformEnd}
        listening={focused}
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
