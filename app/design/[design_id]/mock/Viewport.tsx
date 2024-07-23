"use client";

import { useElementOperations } from "@/components/react-konva/element/hooks";
import { Viewport } from "@/components/react-konva/KonvaStructure";
import { Artboard, Shape, Layer } from "@/components/react-konva/element/types";
import { generateID } from "@/utils/common/generateID";
import { View } from "lucide-react";
import React from "react";
import useImage from "use-image";

interface ViewportProps {
  width?: number;
  height?: number;
}

export const Canvas: React.FC<ViewportProps> = ({
  width = 100,
  height = 100,
}) => {
  const onceRef = React.useRef(0);
  const {
    addArtboard,
    addLayer,
    addChildToArtboard,
    addObject,
    addChildToLayer,
  } = useElementOperations();

  const mockupImage = useImage(
    "https://ik.imagekit.io/c2rr9aewn/Kaos/610TzFZVkGL._AC_UY1000_.jpg"
  );

  React.useEffect(() => {
    if (onceRef.current > 0) return;

    const newArtboard: Artboard = {
      id: `artboard-${generateID()}`,
      name: "New Artboard",
      x: 100,
      y: 100,
      width: 300,
      height: 500,
      children: [],
    };
    addArtboard(newArtboard);

    const newLayer: Layer = {
      id: `layer-${generateID()}`,
      name: "New Layer",
      children: [],
    };
    addLayer(newLayer);

    addChildToArtboard(newArtboard.id, newLayer.id);

    const newObject2: Shape<"circle"> = {
      id: `circle-${generateID()}`,
      type: "circle",
      config: {
        x: 50,
        y: 10,
        width: 50,
        height: 50,
        fill: "blue",
      },
      data: {},
    };

    addChildToLayer(newLayer.id, newObject2.id);

    onceRef.current += 1;
  }, []);

  return <Viewport width={width} height={height} />;
};
