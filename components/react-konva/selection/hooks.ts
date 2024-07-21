import { Artboard, ElementType, Group, Layer, Shape } from "../element/types";
import { useSelectionState, useSelectionDispatch } from "./state";

export function useSelectionOperations() {
  const { selectedElements } = useSelectionState();
  const dispatch = useSelectionDispatch();

  const selectElement = (elementType: ElementType, id: string) => {
    dispatch({ type: "SELECT_ELEMENT", elementType, id });
  };

  const deselectElement = (elementType: ElementType, id: string) => {
    dispatch({ type: "DESELECT_ELEMENT", elementType, id });
  };

  const toggleElementSelection = (elementType: ElementType, id: string) => {
    dispatch({ type: "TOGGLE_ELEMENT_SELECTION", elementType, id });
  };

  const clearSelection = () => {
    dispatch({ type: "CLEAR_SELECTION" });
  };

  const getSelectedElements = () => {
    const result: {
      type: ElementType;
      id: string;
    }[] = [];
    Object.keys(selectedElements).forEach((key) => {
      selectedElements[key as ElementType].forEach((el) => {
        result.push({
          type: key as ElementType,
          id: el,
        });
      });
    });
    return result;
  };

  return {
    selectElement,
    deselectElement,
    toggleElementSelection,
    clearSelection,

    getSelectedElements,
  };
}

export function useSelectedElements() {
  const { selectedElements } = useSelectionState();
  return selectedElements;
}
