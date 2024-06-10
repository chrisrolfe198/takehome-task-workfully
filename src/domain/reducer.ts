import { moveCard } from "./moveCard";
import { ActionNames, Actions, Reducer } from "./types";

export function reducer(state: Reducer, action: Actions) {
  if (action.type === ActionNames.MOVE_CARD) {
    return moveCard(state, action);
  }

  return state;
}
