import { moveCard } from "./moveCard";
import { ActionNames, Actions, Reducer } from "./types";

export const baseReducer: Reducer = {
  Backlog: [],
  Todo: [],
  Doing: [],
  Done: [],
  options: {
    cardToMoveToDone: undefined,
  },
};

export function reducer(state: Reducer = baseReducer, action: Actions) {
  switch (action.type) {
    case ActionNames.MOVE_CARD:
      return moveCard(state, action);

    case ActionNames.MOVE_CARD_TO_DONE:
      return {
        ...state,
        options: {
          ...state.options,
          cardToMoveToDone: action.payload,
        },
      };

    case ActionNames.RESET_MOVING_CARD_TO_DONE:
      return {
        ...state,
        options: {
          ...state.options,
          cardToMoveToDone: undefined,
        },
      };

    default:
      return state;
  }
}
