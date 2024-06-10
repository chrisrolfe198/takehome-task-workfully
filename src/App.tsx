import logo from "./logo.svg";
import "./App.css";
import { Card } from "./components/Card";
import { Column } from "./components/Column";
import { ColumnContainer } from "./components/ColumnContainer";
import { useCardReducer } from "./domain/useCardReducer";
import { Card as CardType } from "./domain/types";

const columns = ["Backlog", "Todo", "Doing", "Done"];

function App() {
  const { state } = useCardReducer();

  return (
    <div className="App">
      <ColumnContainer>
        {Object.entries(state).map(([name, cards]) => {
          return (
            <Column key={name} name={name}>
              {cards.map((card) => {
                return <Card key={card.id} card={card} />;
              })}
            </Column>
          );
        })}
      </ColumnContainer>
    </div>
  );
}

export default App;
