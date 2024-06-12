import { render as r } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";
import CardStateProvider from "./domain/CardStateProvider";

export const render = () =>
  r(
    <CardStateProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </CardStateProvider>
  );
