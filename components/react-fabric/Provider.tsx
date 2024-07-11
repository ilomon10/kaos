"use client";

import React, { useContext } from "react";
import * as fabric from "fabric";

interface LayerObject {
  id: string;
  object: FabricObject;
}

interface Artboard extends fabric.Group {
  id: string;
  title: string;
}

interface CanvasProviderContextValue {
  canvas: fabric.Canvas | null;

  _connect: (canvas: fabric.Canvas) => void;

  addArtboard: (
    id: string,
    options: Partial<{
      title: string;
      rectOptions: Partial<fabric.Rect>;
    }>
  ) => void;
}

const CanvasProviderContext = React.createContext<CanvasProviderContextValue>(
  {} as any
);

type FabricObject = fabric.Rect | fabric.Circle | Text | fabric.Group;

export const CanvasProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);
  const [layers, setLayers] = React.useState<LayerObject[]>([]);
  const [artboards, setArtboards] = React.useState<Artboard[]>([]);

  const connect = (canvas: fabric.Canvas) => {
    setCanvas(canvas);
  };

  const addArtboard: CanvasProviderContextValue["addArtboard"] = (
    id,
    { rectOptions, title }
  ) => {
    if (canvas) {
      const artboardRect = new fabric.Rect({
        ...rectOptions,
        fill: "white",
        shadow: new fabric.Shadow({
          offsetX: 1,
          offsetY: 1,
          color: "rgba(0,0,0, 0.25)",
          blur: 2,
        }),
        strokeWidth: 1,
        selectable: false,
      });

      // Create the title text
      const artboardTitle = new fabric.FabricText((title = `Artboard ${id}`), {
        left: rectOptions?.left || 0,
        top: (rectOptions?.top || 0) - 30, // Place the title above the rectangle
        fontSize: 20,
        fontFamily: "Arial",
        fill: "black",
        selectable: true, // Make the title text selectable
        editable: true, // Allow text editing
        originX: "center",
        originY: "bottom",
        textAlign: "center",
      });

      const artboard = new fabric.Group(
        [
          artboardRect,
          // artboardTitle
        ],
        {
          subTargetCheck: true,
          interactive: true,
        }
      ) as Artboard;

      canvas.add(artboard);
      setArtboards((prevArtboards) => [...prevArtboards, artboard]);
      setLayers((prevLayers) => [...prevLayers, { id, object: artboard }]);

      artboardTitle.on("mousedown", (event) => {
        if (event.target) {
          artboard.set({
            hasControls: true,
            selectable: true,
          });
          canvas.setActiveObject(artboard);
        }
      });

      canvas.requestRenderAll();
    }
  };

  return (
    <CanvasProviderContext.Provider
      value={{
        canvas,
        _connect: connect,

        addArtboard,
      }}
    >
      {children}
    </CanvasProviderContext.Provider>
  );
};

export const useCanvasContext = () => {
  const result = useContext(CanvasProviderContext);
  if (!result)
    throw new Error(
      "`useCanvasContext` must be wrapped by `CanvasProvider` before use."
    );
  return result;
};
