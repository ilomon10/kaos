import React from "react";
import { useElementOperations } from "./element/hooks";
import { useElementContextState, useStageRefContext } from "./element/state";
import { useSelectedElements, useSelectionOperations } from "./selection/hooks";

export const useKonvaContext = () => {
  const elementOperation = useElementOperations();
  const elements = useElementContextState();

  const selectedElements = useSelectedElements();
  const selectionOperations = useSelectionOperations();

  const stageRefCtx = useStageRefContext();

  return {
    elements,
    selected: selectedElements,
    helper: {
      ...elementOperation,
      ...selectionOperations,
    },

    _stage: stageRefCtx,
  };
};
