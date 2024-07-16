import React from "react";
import { Layer } from "./types"; // Assume types are in a separate file
import ObjectComponent from "./ObjectComponent"; // Assume ObjectComponent is in a separate file
import { useKonvaContextState } from "./state";
import { Group, Transformer } from "react-konva";
import Konva from "konva";

interface LayerComponentProps {
  layer: Layer;
}

const LayerComponent: React.FC<LayerComponentProps> = ({ layer }) => {
  const state = useKonvaContextState();

  return (
    <Group>
      {layer.children.map((childId) => {
        if (childId in state.objects)
          return (
            <ObjectComponent key={childId} object={state.objects[childId]} />
          );
        return null;
      })}
    </Group>
  );
};

export default LayerComponent;
