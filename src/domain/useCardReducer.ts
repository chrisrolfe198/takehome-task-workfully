import { useContext, useEffect } from "react";
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
  };

  useEffect(() => {
    // TODO: this is triggering too many times with rerenders
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return {
    state,
    moveCard,
  };
};
