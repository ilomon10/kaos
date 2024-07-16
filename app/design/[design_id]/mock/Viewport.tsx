"use client";

import { useElementOperations } from "@/components/react-konva/hooks";
import { Viewport } from "@/components/react-konva/KonvaStructure";
import { Artboard, KonvaObject, Layer } from "@/components/react-konva/types";
import { generateID } from "@/utils/common/generateID";
import { View } from "lucide-react";
import React from "react";

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

  React.useEffect(() => {
    console.log("ONCE");
    if (onceRef.current > 0) return;

    const newArtboard: Artboard = {
      id: `artboard-${generateID()}`,
      name: "New Artboard",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
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

    const newObject: KonvaObject<"rect"> = {
      id: `rect-${generateID()}`,
      type: "rect",
      config: {
        x: 10,
        y: 0,
        width: 50,
        height: 50,
        fill: "red",
      },
      data: {},
    };

    addObject(newObject);
    addChildToLayer(newLayer.id, newObject.id);

    // const artboard = addArtboard({
    //   id: generateID(),
    //   name: "Coba",
    //   x: 100,
    //   y: 100,
    //   width: 100,
    //   height: 100,
    //   objects: [],
    // });

    // addObject<Konva.CircleConfig>(
    //   {
    //     id: generateID(),
    //     type: "circle",
    //     config: {
    //       fill: "red",
    //       stroke: "black",
    //       width: 100,
    //       height: 50,
    //       x: 16,
    //       y: 40,
    //     },
    //     data: {},
    //   },
    //   artboard.id
    // );

    // addObject<Konva.CircleConfig>(
    //   {
    //     id: generateID(),
    //     type: "circle",
    //     config: {
    //       fill: "blue",
    //       stroke: "black",
    //       width: 100,
    //       height: 50,
    //       x: 63,
    //       y: 58,
    //     },
    //     data: {},
    //   },
    //   artboard.id
    // );

    onceRef.current += 1;
  }, []);

  return <Viewport width={width} height={height} />;
};
