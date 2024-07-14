import ArtboardComponent from "@/components/react-konva/ArtboardComponent";
import {
  KonvaProvider,
  useKonvaContext,
} from "@/components/react-konva/KonvaContext";
import LayerComponent from "@/components/react-konva/LayerComponent";
import { generateID } from "@/utils/common/generateID";
import Konva from "konva";
import React from "react";
import { Layer, Stage, Text, Transformer } from "react-konva";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const Viewport: React.FC<ViewportProps> = ({ width, height }) => {
  const trRef = React.useRef<Konva.Transformer>();
  const stageRef = React.useRef<Konva.Stage>();

  const {
    structure,
    selectedObjects,
    selectObject,
    deselectObject,
    addObject,
    addArtboard,
    attachNode,
    clearSelectionObject,
    updateObject,
  } = useKonvaContext();

  const onceRef = React.useRef(0);

  React.useEffect(() => {
    console.log("ONCE");
    if (onceRef.current > 0) return;

    const artboard = addArtboard({
      id: generateID(),
      name: "Coba",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      objects: [],
    });

    addObject<Konva.CircleConfig>(
      {
        id: generateID(),
        type: "circle",
        config: {
          fill: "red",
          stroke: "black",
          width: 100,
          height: 50,
          x: 16,
          y: 40,
        },
        data: {},
      },
      artboard.id
    );

    addObject<Konva.CircleConfig>(
      {
        id: generateID(),
        type: "circle",
        config: {
          fill: "blue",
          stroke: "black",
          width: 100,
          height: 50,
          x: 63,
          y: 58,
        },
        data: {},
      },
      artboard.id
    );

    onceRef.current += 1;
  }, []);

  React.useEffect(() => {
    console.log(selectedObjects, trRef);
    if (!trRef.current) return;
    if (selectedObjects.size > 0) {
      // we need to attach transformer manually
      const objects = Array.from(selectedObjects.values());
      trRef.current.setNodes(objects);
      // trRef.current.nodes(objects);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedObjects]);

  return (
    <Stage
      style={{
        backgroundColor: "#eee",
      }}
      ref={(ref) => (stageRef.current = ref as any)}
      width={width}
      height={height}
      onClick={(e) => {
        if (e.target === e.target.getStage()) {
          clearSelectionObject();
        } else {
          clearSelectionObject();
          selectObject(e.target);
        }
      }}
    >
      {structure.artboards.map((layer) => (
        <ArtboardComponent key={layer.id} artboard={layer}>
          {selectedObjects.size > 0 && (
            <Transformer
              ref={(ref) => (trRef.current = ref as any)}
              flipEnabled={false}
              ignoreStroke={true}
              boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </ArtboardComponent>
      ))}
    </Stage>
  );
};
