import { useCallback, useContext, useEffect, useMemo } from "react";
import { localStorageKey } from "../constants";
import { CardStateContext } from "./CardStateProvider";
import { ActionNames, Card, State } from "./types";

export const useCardReducer = () => {
  const context = useContext(CardStateContext);

  if (!context) {
    throw Error("Context is not properly configured");
  }

  const [state, dispatch] = context;

  const moveCard = (card: Card, to: State) => {
    if (to === State.DONE) {
      dispatch({
        type: ActionNames.MOVE_CARD_TO_DONE,
        payload: card,
      });
    } else {
      dispatch({
        type: ActionNames.MOVE_CARD,
        payload: {
          card: {
            ...card,
            state: to,
          },
          from: card.state,
          to,
        },
      });
    }
  };

  const resetMovingCardToDone = () => {
    dispatch({
      type: ActionNames.RESET_MOVING_CARD_TO_DONE,
    });
  };

  const moveCardToDone = (card: Card) => {
    dispatch({
      type: ActionNames.MOVE_CARD,
      payload: {
        card: {
          ...card,
          state: State.DONE,
        },
        from: card.state,
        to: State.DONE,
      },
    });
    resetMovingCardToDone();
  };

  useEffect(() => {
    // TODO: this is triggering too many times with rerenders
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return {
    state,
    moveCard,
    moveCardToDone,
    resetMovingCardToDone,
  };
};
