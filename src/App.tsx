import logo from "./logo.svg";
import "./App.css";
import { Card } from "./components/Card";
import { Column } from "./components/Column";
import { ColumnContainer } from "./components/ColumnContainer";

const columns = ["Backlog", "Todo", "Doing", "Done"];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ColumnContainer>
        {columns.map((name) => {
          return (
            <Column name={name}>
              <Card />
            </Column>
          );
        })}
      </ColumnContainer>
    </div>
  );
}

export default App;
