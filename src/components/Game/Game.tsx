import { useContext } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Box, JollyBox } from "../Box/Box";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

import "./Game.css";
import { BingoContext } from "../../context/BingoContext";

const Game = () => {
  const { width, height } = useWindowSize();
  const { grid, setGridElement, gameFinished, shuffleAndInitialize } =
    useContext(BingoContext);

  return (
    <div className="container">
      {gameFinished && (
        <>
          <Confetti width={width} height={height} />
          <Modal />
        </>
      )}

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
