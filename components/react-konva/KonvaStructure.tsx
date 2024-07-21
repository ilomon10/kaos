import { Stage } from "react-konva";
import ArtboardComponent from "./Artboard/ArtboardComponent";
import { useElementContextState, useStageRefContext } from "./element/state";
import React from "react";
import Konva from "konva";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const Viewport: React.FC<ViewportProps> = ({ width, height }) => {
  const stageRefCtx = useStageRefContext();
  const state = useElementContextState();
  const stageRef = React.useRef<Konva.Stage | null>(null);

  const stageRect = {
    width: width || 100,
    height: height || 100,
  };

  return (
    <Stage
      ref={(ref) => {
        stageRef.current = ref;
        stageRefCtx.connect(ref);
      }}
      style={{
        backgroundColor: "#eee",
      }}
      width={width}
      height={height}
    >
      {Object.values(state.artboards).map((artboard) => {
        const w = artboard.width / 2;
        const h = artboard.height / 2;
        return (
          <ArtboardComponent
            key={artboard.id}
            artboard={{
              ...artboard,
              x: stageRect.width / 2 - w,
              y: stageRect.height / 2 - h,
            }}
          />
        );
      })}
    </Stage>
  );
};
