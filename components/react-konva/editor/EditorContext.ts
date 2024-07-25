"use client";

import { createContext } from "react";

import { useEditorStore } from "./store";

export type EditorContextType = ReturnType<typeof useEditorStore>;
export const EditorContext = createContext<EditorContextType>(null as any);
