import { Actions, Reducer } from "./types";

export function moveCard(state: Reducer, action: Actions) {
  const {
    payload: { card, from, to },
  } = action;

  if (from === to) {
    throw new Error("A card cannot be moved to the column it started in");
  }

  // remove the card from the previous category in the reducer
  const oldCategory = state[from].filter(({ id }) => id !== card.id);

  // move it to the new one
  const newCategory = [...state[to], card];

  return {
    ...state,
    [from]: oldCategory,
    [to]: newCategory,
  };
}
