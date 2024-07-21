import { ElementType } from "../element/types";

export interface SelectedElements {
  artboard: Set<string>;
  layer: Set<string>;
  group: Set<string>;
  object: Set<string>;
}

export interface SelectionState {
  selectedElements: SelectedElements;
}

export type SelectionAction =
  | { type: "SELECT_ELEMENT"; elementType: ElementType; id: string }
  | { type: "DESELECT_ELEMENT"; elementType: ElementType; id: string }
  | { type: "TOGGLE_ELEMENT_SELECTION"; elementType: ElementType; id: string }
  | { type: "CLEAR_SELECTION" };