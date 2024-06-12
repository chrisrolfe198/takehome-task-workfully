import { useState } from "react";
import "./App.css";
import { DoneConfirmation } from "./DoneConfirmation";
import { Card } from "./components/Card";
import { Column } from "./components/Column";
import { ColumnContainer } from "./components/ColumnContainer";
import { State } from "./domain/types";
import { useCardReducer } from "./domain/useCardReducer";
import { AddCard } from "./AddCard";

const columns = ["Backlog", "Todo", "Doing", "Done"];

function App() {
  const { state } = useCardReducer();
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="App">
      <button style={{ margin: "1rem" }} onClick={() => setIsAdding(true)}>
        Add Card
      </button>
      <ColumnContainer>
        {columns.map((col) => {
          const name = col as State;
          return (
            <Column data-testid={`column-${name}`} key={name} name={name}>
              {state[name].map((card) => {
                return <Card key={card.id} card={card} />;
              })}
            </Column>
          );
        })}
      </ColumnContainer>
      <DoneConfirmation />
      {isAdding && <AddCard cancel={() => setIsAdding(false)} />}
    </div>
  );
}

export default App;
