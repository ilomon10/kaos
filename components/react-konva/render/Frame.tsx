"use client";

import React from "react";
import { Layer, Stage, StageProps, Transformer } from "react-konva";
import { NodeElement } from "../nodes";
import { Nodes, SerializedNodes } from "../interfaces";
import { useInternalEditor } from "../editor/useInternalEditor";

type FrameProps = StageProps & {
  data: SerializedNodes;
};

export const ROOT_NODE_ID = "ROOT";

const RenderRootNode = () => {
  const { nodes } = useInternalEditor();

  const timestamp = nodes[ROOT_NODE_ID]?.__hydrationTimestamp;

  if (!timestamp) {
    return null;
  }
  return <NodeElement id={ROOT_NODE_ID} key={timestamp} />;
};

export const Frame: React.FC<FrameProps> = ({ data, ...stageProps }) => {
  const { context, deserialize } = useInternalEditor();

  const isLoaded = React.useRef(false);

  if (!isLoaded.current) {
    const initialData = data;

    if (initialData) {
      deserialize(initialData);
    }
    isLoaded.current = true;
  }

  return (
    <Stage {...stageProps}>
      <Layer>
        <RenderRootNode />
      </Layer>
      <Layer>
        <Transformer />
      </Layer>
    </Stage>
  );
};
