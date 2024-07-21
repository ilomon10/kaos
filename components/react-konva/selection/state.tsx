"use client";

import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { SelectionState, SelectionAction } from "./types";
import { reducer } from "./reducer";

export const initialState: SelectionState = {
  selectedElements: {
    artboard: new Set(),
    layer: new Set(),
    group: new Set(),
    object: new Set(),
  },
};

const SelectionStateContext = createContext<SelectionState>(initialState);
const SelectionDispatchContext = createContext<Dispatch<SelectionAction>>(
  () => null
);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SelectionStateContext.Provider value={state}>
      <SelectionDispatchContext.Provider value={dispatch}>
        {children}
      </SelectionDispatchContext.Provider>
    </SelectionStateContext.Provider>
  );
};

export const useSelectionState = () => useContext(SelectionStateContext);
export const useSelectionDispatch = () => useContext(SelectionDispatchContext);
