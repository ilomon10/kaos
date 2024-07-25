import Konva from "konva";
import React from "react";
import { KonvaNodeComponent } from "react-konva";

export type UserComponentConfig<T> = {
  displayName: string;
  related: Partial<NodeRelated>;
  props: Partial<T>;
};

export type UserComponent<T = any> = React.ComponentType<T> & {
  konva?: Partial<UserComponentConfig<T>>;
};

export type NodeId = string;
export type NodeEventTypes = "selected" | "dragged" | "hovered";

export type NodeTransform = {
  x: number;
  y: number;
  height: number;
  width: number;
  scaleX: number;
  scaleY: number;
  skewX: number;
  skewY: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
};

export type NodeData = {
  id: NodeId;
  props: Record<string, any>;
  type: string;
  name: string;
  nodes: NodeId[];

  transform: Partial<NodeTransform>;
};

export type AnyKonvaNodeComponent =
  | Konva.Arc
  | Konva.Text
  | Konva.Arrow
  | Konva.Rect
  | Konva.Circle
  | Konva.RegularPolygon
  | Konva.Group
  | Konva.Shape
  | Konva.Path
  | Konva.Transformer;

export type Node = {
  id: NodeId;
  type: string | React.ElementType;
  data: NodeData;
  events: Record<NodeEventTypes, boolean>;
  ref: AnyKonvaNodeComponent | null;
  related: Record<string, React.ElementType>;

  __hydrationTimestamp: number;
};

export type NodeRelated = Record<string, React.ElementType>;

export type Nodes = Record<NodeId, Node>;

export type SerializedNode = NodeData;
