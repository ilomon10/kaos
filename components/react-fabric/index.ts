import React, { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, Rect, Circle, Text } from "fabric";

type FabricObject = Rect | Circle | Text;

interface LayerObject {
  id: string;
  object: FabricObject;
}

export function useFabric() {
  const [canvasRef, setCanvasRef] = React.useState<Canvas | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [layers, setLayers] = React.useState<LayerObject[]>([]);

  // Use useCallback to memoize the connect function
  const connect = useCallback((canvasElement: HTMLCanvasElement | null) => {
    if (canvasElement) {
      // Only initialize the canvas if it doesn't exist
      if (canvasRef) {
        canvasRef.dispose();
      }
      setCanvasRef(
        new Canvas(canvasElement, {
          width: canvasElement.width,
          height: canvasElement.height,
        })
      );
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      // Cleanup canvas on unmount
      if (canvasRef) {
        canvasRef.dispose();
        setCanvasRef(null);
        setIsReady(false);
      }
    };
  }, []);

  const addObject = (object: FabricObject, id: string) => {
    if (canvasRef) {
      canvasRef.add(object);
      setLayers((prevLayers) => [...prevLayers, { id, object }]);
      canvasRef.requestRenderAll();
    }
  };

  const addRect = (options: Partial<Rect>, id: string) => {
    const rect = new Rect(options);
    addObject(rect, id);
  };

  const addCircle = (options: Partial<Circle>, id: string) => {
    const circle = new Circle(options);
    addObject(circle, id);
  };

  const addText = (text: string, options: Partial<Text>, id: string) => {
    const textObj = new Text(text, options);
    addObject(textObj, id);
  };

  const removeObject = (id: string) => {
    if (canvasRef) {
      const layerIndex = layers.findIndex((layer) => layer.id === id);
      if (layerIndex !== -1) {
        canvasRef.remove(layers[layerIndex].object);
        setLayers((prevLayers) =>
          prevLayers.filter((layer) => layer.id !== id)
        );
        canvasRef.requestRenderAll();
      }
    }
  };

  const moveLayer = (id: string, newIndex: number) => {
    setLayers((prevLayers) => {
      const layerIndex = prevLayers.findIndex((layer) => layer.id === id);
      if (layerIndex !== -1 && newIndex >= 0 && newIndex < prevLayers.length) {
        const newLayers = [...prevLayers];
        const [removed] = newLayers.splice(layerIndex, 1);
        newLayers.splice(newIndex, 0, removed);

        if (canvasRef) {
          canvasRef.discardActiveObject();
          canvasRef.remove(...newLayers.map((layer) => layer.object));
          newLayers.forEach((layer) => {
            canvasRef!.add(layer.object);
          });
          canvasRef.requestRenderAll();
        }

        return newLayers;
      }
      return prevLayers;
    });
  };

  const clear = () => {
    if (canvasRef) {
      canvasRef.clear();
      setLayers([]);
    }
  };

  console.log(canvasRef, isReady);

  return {
    connect,
    canvas: isReady ? canvasRef : null,
    isReady,
    layers,
    addRect,
    addCircle,
    addText,
    removeObject,
    moveLayer,
    clear,
  };
}
