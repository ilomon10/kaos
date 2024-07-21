import React from "react";
import { Shape, Layer } from "./element/types"; // Assume types are in a separate file
import ObjectComponent from "./ObjectComponent"; // Assume ObjectComponent is in a separate file
import { useElementContextState } from "./element/state";
import { Group, KonvaNodeEvents, Transformer } from "react-konva";
import Konva from "konva";
import { useKonvaContext } from "./hooks";

interface LayerComponentProps {
  layer: Layer;
}

const LayerComponent: React.FC<LayerComponentProps> = ({ layer }) => {
  const state = useElementContextState();
  const konvaCtx = useKonvaContext();

  const groupRef = React.useRef<Konva.Group>(null);

  const objectsRef = React.useRef<Map<string, Konva.Shape>>(new Map());

  const isSelected = konvaCtx.selected.layer.has(layer.id);

  const groupHandler: Partial<KonvaNodeEvents> = {
    onPointerClick(evt) {
      if (!groupRef.current) return;
      konvaCtx.helper.clearSelection();
      konvaCtx.helper.selectElement("layer", layer.id);
    },
    onDragEnd(evt) {
      evt.evt.preventDefault();
      if (!groupRef.current) return;
      konvaCtx.helper.clearSelection();
      konvaCtx.helper.selectElement("layer", layer.id);
    },
  };

  return (
    <Group
      ref={groupRef}
      id={layer.id}
      draggable={isSelected}
      onPointerClick={groupHandler.onPointerClick}
    >
      {layer.children.map((childId) => {
        if (childId in state.objects) {
          const obj = state.objects[childId];
          return (
            <ObjectComponent
              ref={(ref: Konva.Shape) => {
                objectsRef.current.set(childId, ref);
              }}
              key={childId}
              object={obj}
            />
          );
        }
        return null;
      })}
    </Group>
  );
};

export default LayerComponent;
