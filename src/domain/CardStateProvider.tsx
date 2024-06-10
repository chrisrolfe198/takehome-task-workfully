import { PropsWithChildren, createContext, useReducer } from "react";
import { localStorageKey } from "../constants";
import { baseReducer, reducer } from "./reducer";
import { Actions } from "./types";

export const CardStateContext = createContext<
  [ReturnType<typeof reducer>, React.Dispatch<Actions>] | undefined
>(undefined);

export default function CardStateProvider({ children }: PropsWithChildren) {
  const initializer = localStorage.getItem(localStorageKey)
    ? JSON.parse(localStorage.getItem(localStorageKey) as string)
    : baseReducer;

  const [state, dispatch] = useReducer(reducer, initializer);

  return (
    <CardStateContext.Provider value={[state, dispatch]}>
      {children}
    </CardStateContext.Provider>
  );
}
