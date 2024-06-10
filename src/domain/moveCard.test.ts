import { moveCard } from "./moveCard";
import { baseReducer } from "./reducer";
import { ActionNames, Reducer, State } from "./types";

const card = {
  id: "1",
  content: "test",
  state: State.BACKLOG,
};

test("cards can be moved", () => {
  const reducer = moveCard(
    { ...baseReducer, [State.BACKLOG]: [card] },
    {
      type: ActionNames.MOVE_CARD,
      payload: { card, from: State.BACKLOG, to: State.TODO },
    }
  );

  expect(reducer[State.BACKLOG]).toEqual([]);
  expect(reducer[State.TODO]).toEqual([card]);
});

test("cards cannot be moved to the same column they are already in", () => {
  expect(() =>
    moveCard(
      { ...baseReducer, [State.BACKLOG]: [card] },
      {
        type: ActionNames.MOVE_CARD,
        payload: { card, from: State.BACKLOG, to: State.BACKLOG },
      }
    )
  ).toThrow();
});
