import { fireEvent, screen, within } from "@testing-library/react";
import { render } from "./tests";
import userEvent from "@testing-library/user-event";
import { localStorageKey } from "./constants";
import { baseReducer } from "./domain/reducer";
import { State } from "./domain/types";

test("Can add a new card to backlog", async () => {
  const user = userEvent.setup();

  render();

  expect(
    await screen.findByRole("button", { name: "Add Card" })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Add Card" }));

  await user.type(screen.getByRole("textbox", { name: "Card" }), "test card 1");
  await user.click(screen.getByRole("button", { name: "Add" }));

  expect(await screen.findByText("1: test card 1")).toBeInTheDocument();

  expect(
    JSON.parse(window.localStorage.getItem(localStorageKey) as string)
  ).toMatchObject({
    ...baseReducer,
    Backlog: [
      {
        id: 1,
        content: "test card 1",
        state: State.BACKLOG,
      },
    ],
    options: {
      ...baseReducer.options,
      nextId: 2,
    },
  });
});

test("Can move a card from backlog to todo", async () => {
  window.localStorage.setItem(
    localStorageKey,
    JSON.stringify({
      ...baseReducer,
      Backlog: [
        {
          id: 1,
          content: "test card 1",
          state: State.BACKLOG,
        },
      ],
    })
  );

  render();

  const backlogColumn = screen.getByTestId("column-Backlog");
  const card = screen.getByText("1: test card 1");
  const todoColumn = screen.getByTestId("column-Todo");

  expect(within(backlogColumn).getByText("1: test card 1")).toBeInTheDocument();

  fireEvent.dragStart(card);
  fireEvent.dragOver(todoColumn);
  fireEvent.drop(todoColumn);
  fireEvent.dragEnd(card);

  expect(within(todoColumn).getByText("1: test card 1")).toBeInTheDocument();
  expect(
    within(backlogColumn).queryByText("1: test card 1")
  ).not.toBeInTheDocument();

  expect(
    JSON.parse(window.localStorage.getItem(localStorageKey) as string)
  ).toMatchObject({
    ...baseReducer,
    Todo: [
      {
        id: 1,
        content: "test card 1",
        state: State.TODO,
      },
    ],
  });
});

test("cannot move a card from backlog straight to doing", () => {
  const initialState = {
    ...baseReducer,
    Backlog: [
      {
        id: 1,
        content: "test card 1",
        state: State.BACKLOG,
      },
    ],
  };

  window.localStorage.setItem(localStorageKey, JSON.stringify(initialState));

  render();

  const backlogColumn = screen.getByTestId("column-Backlog");
  const card = screen.getByText("1: test card 1");
  const doingColumn = screen.getByTestId("column-Doing");

  expect(within(backlogColumn).getByText("1: test card 1")).toBeInTheDocument();

  fireEvent.dragStart(card);
  fireEvent.dragOver(doingColumn);
  fireEvent.drop(doingColumn);
  fireEvent.dragEnd(card);

  expect(
    within(doingColumn).queryByText("1: test card 1")
  ).not.toBeInTheDocument();
  expect(
    within(backlogColumn).queryByText("1: test card 1")
  ).toBeInTheDocument();

  expect(
    JSON.parse(window.localStorage.getItem(localStorageKey) as string)
  ).toMatchObject(initialState);
});

test("cannot move a card into doing when there are two there", () => {
  const initialState = {
    ...baseReducer,
    Todo: [
      {
        id: 3,
        content: "test card 3",
        state: State.TODO,
      },
    ],
    Doing: [
      {
        id: 1,
        content: "test card 1",
        state: State.DOING,
      },
      {
        id: 2,
        content: "test card 2",
        state: State.DOING,
      },
    ],
  };

  window.localStorage.setItem(localStorageKey, JSON.stringify(initialState));

  render();

  const cardText = "3: test card 3";
  const todoColumn = screen.getByTestId("column-Todo");
  const card = screen.getByText(cardText);
  const doingColumn = screen.getByTestId("column-Doing");

  expect(within(todoColumn).getByText(cardText)).toBeInTheDocument();

  fireEvent.dragStart(card);
  fireEvent.dragOver(doingColumn);
  fireEvent.drop(doingColumn);
  fireEvent.dragEnd(card);

  expect(within(doingColumn).queryByText(cardText)).not.toBeInTheDocument();
  expect(within(todoColumn).queryByText(cardText)).toBeInTheDocument();

  expect(
    JSON.parse(window.localStorage.getItem(localStorageKey) as string)
  ).toMatchObject(initialState);
});

test("moving a card into done asks for confirmation", async () => {
  const user = userEvent.setup();
  const initialState = {
    ...baseReducer,
    Doing: [
      {
        id: 1,
        content: "test card 1",
        state: State.DOING,
      },
    ],
  };

  window.localStorage.setItem(localStorageKey, JSON.stringify(initialState));

  render();

  const cardText = "1: test card 1";
  const doingColumn = screen.getByTestId("column-Doing");
  const card = screen.getByText(cardText);
  const doneColumn = screen.getByTestId("column-Done");

  expect(within(doingColumn).getByText(cardText)).toBeInTheDocument();

  fireEvent.dragStart(card);
  fireEvent.dragOver(doneColumn);
  fireEvent.drop(doneColumn);
  fireEvent.dragEnd(card);

  expect(
    await screen.findByText("Are you sure you want to move this card to done?")
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Yes" }));

  expect(within(doingColumn).queryByText(cardText)).not.toBeInTheDocument();
  expect(within(doneColumn).queryByText(cardText)).toBeInTheDocument();

  expect(
    JSON.parse(window.localStorage.getItem(localStorageKey) as string)
  ).toMatchObject({
    ...baseReducer,
    Done: [
      {
        id: 1,
        content: "test card 1",
        state: State.DONE,
      },
    ],
  });
});

test("Cards in done cannot be moved", () => {
  const initialState = {
    ...baseReducer,
    Done: [
      {
        id: 1,
        content: "test card 1",
        state: State.DONE,
      },
    ],
  };

  window.localStorage.setItem(localStorageKey, JSON.stringify(initialState));

  render();

  const cardText = "1: test card 1";
  const doneColumn = screen.getByTestId("column-Done");
  const card = screen.getByText(cardText);
  const doingColumn = screen.getByTestId("column-Doing");

  expect(within(doneColumn).getByText(cardText)).toBeInTheDocument();

  // We cannot drag cards in done so attempting to drag will fail
  expect(fireEvent.dragStart(card)).toBeFalsy();

  expect(within(doingColumn).queryByText(cardText)).not.toBeInTheDocument();
  expect(within(doneColumn).queryByText(cardText)).toBeInTheDocument();

  expect(
    JSON.parse(window.localStorage.getItem(localStorageKey) as string)
  ).toMatchObject(initialState);
});
