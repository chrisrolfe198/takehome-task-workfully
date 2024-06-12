import { moveCard } from "./moveCard";
import { ActionNames, Actions, Card, Reducer, State } from "./types";

export const baseReducer: Reducer = {
  Backlog: [],
  Todo: [],
  Doing: [],
  Done: [],
  options: {
    cardToMoveToDone: null,
    nextId: 1,
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
          cardToMoveToDone: null,
        },
      };

    case ActionNames.ADD_CARD:
      return {
        ...state,
        [State.BACKLOG]: [
          ...state[State.BACKLOG],
          {
            id: state.options.nextId,
            content: action.payload,
            state: State.BACKLOG,
          } as Card,
        ],
        options: {
          ...state.options,
          nextId: state.options.nextId + 1,
        },
      };

    default:
      return state;
  }
}
