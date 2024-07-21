import { initialState } from "./state";
import { SelectionAction, SelectionState } from "./types";

export function reducer(
  state: SelectionState,
  action: SelectionAction
): SelectionState {
  switch (action.type) {
    case "SELECT_ELEMENT":
      return {
        ...state,
        selectedElements: {
          ...state.selectedElements,
          [action.elementType]: new Set(
            state.selectedElements[action.elementType]
          ).add(action.id),
        },
      };
    case "DESELECT_ELEMENT":
      const newSet = new Set(state.selectedElements[action.elementType]);
      newSet.delete(action.id);
      return {
        ...state,
        selectedElements: {
          ...state.selectedElements,
          [action.elementType]: newSet,
        },
      };
    case "TOGGLE_ELEMENT_SELECTION":
      const toggledSet = new Set(state.selectedElements[action.elementType]);
      if (toggledSet.has(action.id)) {
        toggledSet.delete(action.id);
      } else {
        toggledSet.add(action.id);
      }
      return {
        ...state,
        selectedElements: {
          ...state.selectedElements,
          [action.elementType]: toggledSet,
        },
      };
    case "CLEAR_SELECTION":
      return initialState;
    default:
      return state;
  }
}
