"use client";

import React from "react";
import { Options } from "../interfaces";
import { useEditorStore } from "./store";
import { EditorContext } from "./EditorContext";
import { Events } from "./Events";

type EditorProps = Partial<Options> & {
  children?: React.ReactNode;
};

export const Editor = ({ children, ...options }: EditorProps) => {
  const context = useEditorStore(options);

  return (
    <EditorContext.Provider value={context}>
      <Events>{children}</Events>
    </EditorContext.Provider>
  );
};
