"use client";

import React from "react";
import { FlatState, Action } from "./types";
import { reducer } from "./reducer";
import Konva from "konva";

const initialState: FlatState = {
  artboards: {},
  layers: {},
  groups: {},
  objects: {},
};

type StageRefContextValue = {
  ref: Konva.Stage | null;
  connect: (ref: Konva.Stage | null) => void;
};

const ElementStateContext = React.createContext<FlatState>(initialState);
const ElementDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => null
);
const StageRefContext = React.createContext<StageRefContextValue>({
  ref: null,
  connect: () => {},
});

export const ElementProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const [stageRef, setStageRef] = React.useState<Konva.Stage | null>(null);

  return (
    <ElementStateContext.Provider value={state}>
      <ElementDispatchContext.Provider value={dispatch}>
        <StageRefContext.Provider
          value={{
            ref: stageRef,
            connect(ref) {
              setStageRef(ref);
            },
          }}
        >
          {children}
        </StageRefContext.Provider>
      </ElementDispatchContext.Provider>
    </ElementStateContext.Provider>
  );
};

export const useElementContextState = () =>
  React.useContext(ElementStateContext);
export const useElementContextDispatch = () =>
  React.useContext(ElementDispatchContext);
export const useStageRefContext = () => React.useContext(StageRefContext);
