"use client";

import { Frame, ROOT_NODE_ID } from "@/components/react-konva/render/Frame";
import { generateID } from "@/utils/common/generateID";
import React from "react";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const Viewport: React.FC<ViewportProps> = ({
  width = 100,
  height = 100,
}) => {
  return (
    <Frame
      width={width}
      height={height}
      style={{ backgroundColor: "#eee" }}
      data={{
        ROOT_NODE_ID: ROOT_NODE_ID,
        nodes: {
          [ROOT_NODE_ID]: {
            id: ROOT_NODE_ID,
            props: { value: "Ini Text" },
            type: "TextElement",
            name: "COBA Dang",
            nodes: [],
            transform: {
              x: 100,
              y: 100,
            },
          },
        },
      }}
    />
  );
};
