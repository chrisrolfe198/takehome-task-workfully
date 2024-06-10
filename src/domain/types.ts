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

type DataReducer = {
  [key in State]: Card[];
};

export type Reducer = DataReducer & {
  options: {
    cardToMoveToDone: Card | undefined;
  };
};

export enum ActionNames {
  MOVE_CARD = "MOVE_CARD",
  MOVE_CARD_TO_DONE = "MOVE_CARD_TO_DONE",
  RESET_MOVING_CARD_TO_DONE = "RESET_MOVING_CARD_TO_DONE",
}

export type MoveCardAction = {
  type: ActionNames.MOVE_CARD;
  payload: { card: Card; from: State; to: State };
};

export type Actions =
  | MoveCardAction
  | {
      type: ActionNames.MOVE_CARD_TO_DONE;
      payload: Card;
    }
  | {
      type: ActionNames.RESET_MOVING_CARD_TO_DONE;
    };
