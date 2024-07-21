import Konva from "konva";

export interface Transform {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
  skewX?: number;
  skewY?: number;
}

export interface ShapeMetaData {
  [key: string]: any;
}

type KonvaConfig<T extends string> = T extends "rect"
  ? Konva.RectConfig
  : T extends "circle"
  ? Konva.CircleConfig
  : T extends "image"
  ? Konva.ImageConfig
  : T extends "text"
  ? Konva.TextConfig
  : never;

export interface Shape<T extends string> {
  id: string;
  type: T;
  config: KonvaConfig<T>;
  transform?: Transform;
  data: ShapeMetaData;
  _node?: Konva.Node;
}

export interface Group {
  id: string;
  name: string;
  children: string[];
}

export interface Layer {
  id: string;
  name: string;
  children: string[];
}

export interface Artboard {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  children: string[];
}

export interface FlatState {
  artboards: { [id: string]: Artboard };
  layers: { [id: string]: Layer };
  groups: { [id: string]: Group };
  objects: { [id: string]: Shape<any> };
}

export type ElementType = "artboard" | "layer" | "group" | "object";

export type ElementTypeMap = {
  artboard: Artboard;
  layer: Layer;
  group: Group;
  object: Shape<any>;
};

export type Action =
  | {
      type: "ADD_ELEMENT";
      elementType: ElementType;
      payload: ElementTypeMap[ElementType];
    }
  | { type: "REMOVE_ELEMENT"; elementType: ElementType; id: string }
  | {
      type: "UPDATE_ELEMENT";
      elementType: ElementType;
      payload: Partial<ElementTypeMap[ElementType]> & { id: string };
    }
  | {
      type: "ADD_CHILD";
      parentType: Exclude<ElementType, "object">;
      parentId: string;
      childId: string;
    }
  | {
      type: "REMOVE_CHILD";
      parentType: Exclude<ElementType, "object">;
      parentId: string;
      childId: string;
    };
