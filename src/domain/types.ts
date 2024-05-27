export enum State {
  BACKLOG = "Backlog",
  TODO = "Todo",
  DOING = "Doing",
  DONE = "Done",
}

export type Card = {
  id: string;
  content: string;
  state: State;
};

export type Reducer = {
  [key in State]: Card[];
};

export enum ActionNames {
  MOVE_CARD = "MOVE_CARD",
}

export type Actions = {
  type: ActionNames.MOVE_CARD;
  payload: { card: Card; from: State; to: State };
};
