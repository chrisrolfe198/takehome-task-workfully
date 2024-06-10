import { Card, Reducer, State } from "./types";

const columnOrder = [State.BACKLOG, State.TODO, State.DOING, State.DONE];

export const canMoveCard = (
  card: Card,
  state: Reducer,
  from?: State,
  to?: State
) => {
  if (card.state === State.DONE) {
    return false;
  }

  if (from && to) {
    if (from === to) {
      return false;
    }

    if (to === State.DOING && state?.Doing?.length && state.Doing.length >= 2) {
      return false;
    }

    const difference = Math.abs(
      columnOrder.indexOf(from) - columnOrder.indexOf(to)
    );

    if (difference > 1) {
      return false;
    }
  }

  return true;
};
