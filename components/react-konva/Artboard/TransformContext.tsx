import Konva from "konva";
import React, { useContext } from "react";
import { Artboard, Group, KonvaObject, Layer } from "../types";
import { Transformer } from "react-konva";
import { generateID } from "@/utils/common/generateID";

type TransformNode = {
  id: string;
  element: Artboard | Layer | Group | KonvaObject<any>;
  object: Konva.Node;
};

type TransfromContextValue = {
  nodes: { [id: string]: TransformNode };
  transformerConfig: Konva.TransformerConfig;
  transformerId: string;
};

type Action =
  | {
      type: "SET_TRANSFORM_CONFIG";
      config: Partial<TransfromContextValue["transformerConfig"]>;
    }
  | {
      type: "ADD_ELEMENT";
      node: TransformNode;
    }
  | { type: "REMOVE_ELEMENT"; id: string }
  | { type: "SET_ELEMENTS"; nodes: TransformNode[] }
  | { type: "SET_REF"; ref: Konva.Transformer };

const initialValue = {
  nodes: {},
  transformerConfig: {},
  transformerId: `tr-${generateID()}`,
};

const TransformContext =
  React.createContext<TransfromContextValue>(initialValue);
const TransformDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => null
);

export const TransformContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [value, dispatch] = React.useReducer(reducer, initialValue);

  const transformerRef = React.useRef<Konva.Transformer | null>(null as any);

  const isSelected = React.useMemo(() => {
    return Object.keys(value.nodes).length > 0;
  }, [value.nodes]);

  React.useEffect(() => {
    if (isSelected) {
      transformerRef.current?.setNodes(
        Object.values(value.nodes).map(({ object }) => object)
      );
    } else {
      transformerRef.current?.setNodes([]);
    }
    transformerRef.current?.getLayer()?.batchDraw();
  }, [isSelected, value.nodes]);

  return (
    <TransformContext.Provider value={value}>
      <TransformDispatchContext.Provider value={dispatch}>
        {children}
        <Transformer
          id={value.transformerId}
          ref={transformerRef}
          ignoreStroke={true}
          {...value.transformerConfig}
          // rotateEnabled={false}
        />
      </TransformDispatchContext.Provider>
    </TransformContext.Provider>
  );
};

function reducer(
  state: TransfromContextValue,
  action: Action
): TransfromContextValue {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.node.id]: action.node,
        },
      };
    case "REMOVE_ELEMENT":
      const { [action.id]: removed, ...remaining } = state.nodes;
      return {
        ...state,
        nodes: remaining,
      };
    case "SET_ELEMENTS":
      return {
        ...state,
        nodes: action.nodes.reduce((p, node) => {
          return {
            ...p,
            [node.id]: node,
          };
        }, {} as TransfromContextValue["nodes"]),
      };
    case "SET_TRANSFORM_CONFIG":
      return {
        ...state,
        transformerConfig: action.config,
      };
    default:
      return state;
  }
}

export const useTransformContextState = () =>
  React.useContext(TransformContext);
export const useTransformContextDispatch = () =>
  React.useContext(TransformDispatchContext);

export const useTransformContext = () => {
  const { nodes, transformerId } = useTransformContextState();
  const dispatch = useTransformContextDispatch();

  const addElement = (node: TransformNode) => {
    dispatch({ type: "ADD_ELEMENT", node });
  };
  const removeElement = (id: string) => {
    dispatch({ type: "REMOVE_ELEMENT", id });
  };
  const setElements = (nodes: TransformNode[]) => {
    dispatch({ type: "SET_ELEMENTS", nodes });
  };

  const setConfig = (nodes: TransformNode[]) => {
    dispatch({ type: "SET_ELEMENTS", nodes });
  };

  return {
    nodes,
    transformerId,

    addElement,
    removeElement,
    setElements,

    setConfig,
  };
};
