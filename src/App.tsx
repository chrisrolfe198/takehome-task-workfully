import "./App.css";
import { DoneConfirmation } from "./DoneConfirmation";
import { Card } from "./components/Card";
import { Column } from "./components/Column";
import { ColumnContainer } from "./components/ColumnContainer";
import { State } from "./domain/types";
import { useCardReducer } from "./domain/useCardReducer";

const columns = ["Backlog", "Todo", "Doing", "Done"];

function App() {
  const { state } = useCardReducer();

  return (
    <div className="App">
      <ColumnContainer>
        {columns.map((col) => {
          const name = col as State;
          return (
            <Column key={name} name={name}>
              {state[name].map((card) => {
                return <Card key={card.id} card={card} />;
              })}
            </Column>
          );
        })}
      </ColumnContainer>
      <DoneConfirmation />
    </div>
  );
}

export default App;
