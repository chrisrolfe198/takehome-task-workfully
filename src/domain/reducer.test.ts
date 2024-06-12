import { moveCard } from "./moveCard";
import { baseReducer, reducer } from "./reducer";
import { ActionNames, Card, Reducer, State } from "./types";

const card = {
  id: 1,
  content: "test",
  state: State.BACKLOG,
};

test("cards can be moved", () => {
  const state = reducer(
    { ...baseReducer, [State.BACKLOG]: [card] },
    {
      type: ActionNames.MOVE_CARD,
      payload: { card, from: State.BACKLOG, to: State.TODO },
    }
  );

  expect(state[State.BACKLOG]).toEqual([]);
  expect(state[State.TODO]).toEqual([card]);
});

test("cards cannot be moved to the same column they are already in", () => {
  expect(() =>
    reducer(
      { ...baseReducer, [State.BACKLOG]: [card] },
      {
        type: ActionNames.MOVE_CARD,
        payload: { card, from: State.BACKLOG, to: State.BACKLOG },
      }
    )
  ).toThrow();
});

test("card can be marked as being moved to done", () => {
  const state = reducer(
    { ...baseReducer, [State.BACKLOG]: [card] },
    {
      type: ActionNames.MOVE_CARD_TO_DONE,
      payload: card,
    }
  );

  expect(state.options.cardToMoveToDone).toEqual(card);
});

test("card can be unmarked as being moved to done", () => {
  const state = reducer(
    { ...baseReducer, [State.BACKLOG]: [card] },
    {
      type: ActionNames.RESET_MOVING_CARD_TO_DONE,
    }
  );

  expect(state.options.cardToMoveToDone).toEqual(undefined);
});

test("new card can be added", () => {
  const state = reducer(
    { ...baseReducer },
    {
      type: ActionNames.ADD_CARD,
      payload: "test",
    }
  );

  expect(state.options.nextId).toEqual(2);
  expect(state.Backlog).toEqual([
    {
      id: 1,
      content: "test",
      state: State.BACKLOG,
    },
  ]);
});
