import { initialState } from "./state";
import { TypographyAction, TypographyState } from "./types";

export function reducer(
  state: TypographyState,
  action: TypographyAction
): TypographyState {
  switch (action.type) {
    case "SET_STYLE":
      return {
        ...state,
        style: {
          ...state.style,
          ...action.style,
        },
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.text,
      };
    default:
      return state;
  }
}
