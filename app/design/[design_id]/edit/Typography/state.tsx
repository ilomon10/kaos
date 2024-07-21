"use client";

import React, { createContext, useContext, useReducer, Dispatch } from "react";
import { TypographyAction, TypographyState } from "./types";
import { reducer } from "./reducer";

export const initialState: TypographyState = {
  text: "",
  style: {
    align: "center",
    fontSize: 24,
    fontFamily: "monospace",
    fill: "red",
  },
};

const TypographyStateContext = createContext<TypographyState>(initialState);
const TypographyDispatchContext = createContext<Dispatch<TypographyAction>>(
  () => null
);

export const TypographyProvider: React.FC<{
  initialValue?: TypographyState;
  children: React.ReactNode;
}> = ({ initialValue, children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue || initialState);

  return (
    <TypographyStateContext.Provider value={state}>
      <TypographyDispatchContext.Provider value={dispatch}>
        {children}
      </TypographyDispatchContext.Provider>
    </TypographyStateContext.Provider>
  );
};

export const useTypographyState = () => useContext(TypographyStateContext);
export const useTypographyDispatch = () =>
  useContext(TypographyDispatchContext);
