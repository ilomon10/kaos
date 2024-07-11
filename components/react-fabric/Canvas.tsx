"use client";

import { CanvasOptions, Canvas as FabricCanvas, Point } from "fabric";
import React from "react";
import { useCanvasContext } from "./Provider";

type CanvasProps = {
  responsive?: boolean;
  onReady: (canvas: FabricCanvas) => void;

  fabricCanvasProps?: Partial<CanvasOptions>;
};

export const Canvas: React.FC<
  React.PropsWithChildren<CanvasProps & React.HTMLAttributes<HTMLCanvasElement>>
> = ({
  children,
  responsive = false,
  onReady,
  fabricCanvasProps,
  ...htmlAttr
}) => {
  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  const { _connect } = useCanvasContext();

  React.useEffect(() => {
    if (!canvasEl.current) return;
    const canvas = new FabricCanvas(canvasEl.current, {
      selection: true,
      ...fabricCanvasProps,
    });

    const setCurrentDimensions = () => {
      const parentEl = canvasEl.current?.parentElement?.parentElement;
      canvas.setDimensions({
        height: parentEl?.clientHeight || 0,
        width: parentEl?.clientWidth || 0,
      });
      canvas.renderAll();
    };
    const resizeCanvas = () => {
      if (!responsive) return;
      setCurrentDimensions();
    };

    setCurrentDimensions();
    window.addEventListener("resize", resizeCanvas, false);

    // Add zoom functionality
    canvas.on("mouse:wheel", (event) => {
      const zoom = canvas.getZoom();
      const delta = event.e.deltaY > 0 ? 0.95 : 1.05;
      canvas.zoomToPoint(
        new Point({ x: event.e.offsetX, y: event.e.offsetY }),
        zoom * delta
      );
      event.e.preventDefault();
      event.e.stopPropagation();
    });

    // Add panning functionality
    let isDragging = false;
    let lastPosX: number;
    let lastPosY: number;

    // canvas.on();

    canvas.on({
      "mouse:down": (event) => {
        if (event.e.ctrlKey) {
          isDragging = true;
          const pointer = canvas.getViewportPoint(event.e);
          lastPosX = pointer.x;
          lastPosY = pointer.y;
          canvas.selection = false;
        }
      },
      "mouse:move": (event) => {
        if (isDragging) {
          const pointer = canvas.getViewportPoint(event.e);
          const deltaX = pointer.x - lastPosX;
          const deltaY = pointer.y - lastPosY;
          canvas.relativePan(new Point({ x: deltaX, y: deltaY }));
          lastPosX = pointer.x;
          lastPosY = pointer.y;
        }
      },
      "mouse:up": () => {
        if (isDragging) {
          isDragging = false;
          canvas.selection = true;
        }
      },
    });

    if (onReady) {
      _connect(canvas);
      onReady(canvas);
    }

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasEl} {...htmlAttr} />;
};
