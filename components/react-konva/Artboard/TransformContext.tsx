import Konva from "konva";
import React, { useContext } from "react";
import {
  Artboard,
  Group,
  Shape,
  Layer,
  ElementType,
  FlatState,
} from "../element/types";
import { Text, Transformer } from "react-konva";
import { generateID } from "@/utils/common/generateID";
import { Stage } from "konva/lib/Stage";
import { KonvaEventObject } from "konva/lib/Node";
import { useKonvaContext } from "../hooks";

type SelectedElement = {
  type: ElementType;
  element: Artboard | Group | Shape<any> | Layer;
  ref: Konva.Node;
};

const initialValue = {
  _trId: `transformer-${generateID()}`,
  elements: [],
};

const TransformContext = React.createContext<{
  _trId: string;
  elements: SelectedElement[];
}>(initialValue);

export const TransformContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const konvaContext = useKonvaContext();

  const transformerRef = React.useRef<Konva.Transformer | null>(null as any);
  const isDragging = React.useRef<boolean>(false);

  const elements = React.useMemo(() => {
    const stage = transformerRef.current?.getStage();
    const result: SelectedElement[] = [];

    if (!stage) return result;

    Object.keys(konvaContext.selected).forEach((type: any) => {
      konvaContext.selected[type as ElementType].forEach((id) => {
        let ref = stage.findOne(`#${id}`);
        if (type === "artboard") {
          ref = (ref as Konva.Group).findOne(".artboard-board");
        }
        if (!ref) return;
        result.push({
          type: type,
          element: konvaContext.elements[`${type}s` as keyof FlatState][id],
          ref: ref,
        });
      });
    });

    return result;
  }, [konvaContext.selected]);

  const isSelected = React.useMemo(() => {
    return elements.length > 0;
  }, [elements]);

  React.useEffect(() => {
    if (isSelected) {
      transformerRef.current?.setNodes(elements.map(({ ref }) => ref));
    } else {
      transformerRef.current?.setNodes([]);
    }
    transformerRef.current?.getLayer()?.batchDraw();
  }, [isSelected, elements]);

  React.useEffect(() => {
    const stage = transformerRef.current?.getStage();

    if (!stage) return;

    const handleOutclick = (evt: KonvaEventObject<Stage>) => {
      if (isDragging.current) {
        isDragging.current = false;
        return;
      }
      if (evt.target !== stage) return;

      konvaContext.helper.clearSelection();
    };

    stage.on("pointerclick", handleOutclick);

    return () => {
      stage.off("pointerclick", handleOutclick);
    };
  }, [transformerRef.current]);

  const handleDragStart = () => {
    isDragging.current = true;
  };
  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <TransformContext.Provider
      value={{
        ...initialValue,
        elements,
      }}
    >
      {children}
      <Transformer
        id={initialValue._trId}
        ref={transformerRef}
        ignoreStroke={true}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        enabledAnchors={[]}
        rotateEnabled={false}
      />
      {elements.map(({ element }) => {
        return <Text key={element.id} text={element.id} x={0} y={0} />;
      })}
    </TransformContext.Provider>
  );
};
