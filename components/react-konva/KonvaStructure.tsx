import { Stage } from "react-konva";
import ArtboardComponent from "./Artboard/ArtboardComponent";
import { useKonvaContextState } from "./state";
import React from "react";
import Konva from "konva";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const Viewport: React.FC<ViewportProps> = ({ width, height }) => {
  const state = useKonvaContextState();
  const stageRef = React.useRef<Konva.Stage | null>(null);
  return (
    <Stage
      ref={stageRef}
      style={{
        backgroundColor: "#eee",
      }}
      width={width}
      height={height}
    >
      {Object.values(state.artboards).map((artboard) => (
        <ArtboardComponent
          key={artboard.id}
          artboard={artboard}
        />
      ))}
    </Stage>
  );
};
