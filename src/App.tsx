import React from "react";
import "./App.css";
import Game from "./components/Game/Game";
import { BingoContextProvider } from "./context/BingoContext";

function App() {
  return (
    <div className="appContainer">
      <header>
        <h1 className="header">Sensory Bingo</h1>
      </header>
      <BingoContextProvider>
        <Game />
      </BingoContextProvider>
    </div>
  );
}

export default App;
