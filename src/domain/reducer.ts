import { moveCard } from "./moveCard";
import { ActionNames, Actions, Reducer } from "./types";

export const baseReducer: Reducer = {
  Backlog: [],
  Todo: [],
  Doing: [],
  Done: [],
};

export function reducer(state: Reducer = baseReducer, action: Actions) {
  if (action.type === ActionNames.MOVE_CARD) {
    return moveCard(state, action);
  }

  return state;
}
