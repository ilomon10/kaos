"use client";

import React from "react";
import { FlatState, Action } from "./types";
import { reducer } from "./reducer";

const initialState: FlatState = {
  artboards: {},
  layers: {},
  groups: {},
  objects: {},
};

const StateContext = React.createContext<FlatState>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => null);

export const KonvaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useKonvaContextState = () => React.useContext(StateContext);
export const useKonvaContextDispatch = () => React.useContext(DispatchContext);
