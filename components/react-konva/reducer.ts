import { FlatState, Action } from './types';

export function reducer(state: FlatState, action: Action): FlatState {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      const stateKey = `${action.elementType}s` as keyof FlatState;
      return {
        ...state,
        [stateKey]: {
          ...state[stateKey],
          [action.payload.id]: action.payload
        }
      };
    }

    case 'REMOVE_ELEMENT': {
      const stateKey = `${action.elementType}s` as keyof FlatState;
      const { [action.id]: removed, ...remaining } = state[stateKey];
      return {
        ...state,
        [stateKey]: remaining
      };
    }

    case 'UPDATE_ELEMENT': {
      const stateKey = `${action.elementType}s` as keyof FlatState;
      return {
        ...state,
        [stateKey]: {
          ...state[stateKey],
          [action.payload.id]: {
            ...state[stateKey][action.payload.id],
            ...action.payload
          }
        }
      };
    }

    case 'ADD_CHILD': {
      const stateKey = `${action.parentType}s` as keyof FlatState;
      return {
        ...state,
        [stateKey]: {
          ...state[stateKey],
          [action.parentId]: {
            ...state[stateKey][action.parentId],
            children: [...(state[stateKey][action.parentId] as any).children, action.childId]
          }
        }
      };
    }

    case 'REMOVE_CHILD': {
      const stateKey = `${action.parentType}s` as keyof FlatState;
      return {
        ...state,
        [stateKey]: {
          ...state[stateKey],
          [action.parentId]: {
            ...state[stateKey][action.parentId],
            children: (state[stateKey][action.parentId] as any).children.filter((id: string) => id !== action.childId)
          }
        }
      };
    }

    default:
      return state;
  }
}