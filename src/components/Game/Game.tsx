import { useContext } from "react";
import { Box, JollyBox } from "../Box/Box";
import "./Game.css";
import { BingoContext } from "../../context/BingoContext";
import Button from "../Button/Button";

const Game = () => {
  const { grid, setGridElement, shuffleAndInitialize } =
    useContext(BingoContext);

  return (
    <div className="container">
      <div className="gameContainer">
        <div className="buttonContainer">
          <Button onClick={() => shuffleAndInitialize?.()}>New Game</Button>
        </div>
        <div className="boardContainer">
          {grid?.map((row, rowIndex) =>
            row.map((gridElement, columnIndex) =>
              gridElement.jolly ? (
                <JollyBox key={`grid-${rowIndex}-${columnIndex}`}></JollyBox>
              ) : (
                <Box
                  key={`grid-${rowIndex}-${columnIndex}`}
                  gridElement={gridElement}
                  onBoxClicked={() => {
                    setGridElement?.(rowIndex, columnIndex);
                  }}
                />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
