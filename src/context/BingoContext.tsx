import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { buzzwords } from "../buzzwords";

export const BingoContext = React.createContext<{
  grid?: GridElement[][] | null;
  setGridElement?: (row: number, column: number) => void;
  shuffleAndInitialize?: () => void;
  gameFinished: boolean;
}>({ gameFinished: false });

export interface GridElement {
  text: string;
  selected: boolean;
  jolly: boolean;
}

interface BingoContextProviderProps {
  children: React.ReactNode;
}

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const BingoContextProvider: React.FC<BingoContextProviderProps> = ({
  children,
}) => {
  const [grid, setGrid] = useState<GridElement[][] | null>(null);

  const gameFinished = useMemo(() => {
    let hasWon = false;

    // Check for winning row
    for (let i = 0; i < 5; i++) {
      hasWon = true;

      for (let j = 0; j < 5; j++) {
        if (!grid?.[i][j].selected) {
          hasWon = false;
          break;
        }
      }

      if (hasWon) {
        return true;
      }
    }

    // Check for winning column
    for (let i = 0; i < 5; i++) {
      hasWon = true;

      for (let j = 0; j < 5; j++) {
        if (!grid?.[j][i].selected) {
          hasWon = false;
          break;
        }
      }

      if (hasWon) {
        return true;
      }
    }

    // Check along diagonals
    for (let i = 0; i < 5; i++) {
      hasWon = true;

      if (!grid?.[i][i].selected) {
        hasWon = false;
        break;
      }
    }

    if (hasWon) {
      return true;
    }

    for (let i = 0; i < 5; i++) {
      hasWon = true;

      if (!grid?.[i][4 - i].selected) {
        hasWon = false;
        break;
      }
    }

    return hasWon;
  }, [grid]);

  const shuffleAndInitialize = () => {
    const newGrid = [];
    const shuffledBuzzwords = [...shuffleArray(buzzwords).slice(0, 25)];
    shuffledBuzzwords[12] = "";
    while (shuffledBuzzwords.length)
      newGrid.push(
        shuffledBuzzwords.splice(0, 5).map((gridElement: string) => ({
          text: gridElement,
          selected: gridElement ? false : true,
          jolly: gridElement ? false : true,
        }))
      );
    setGrid(newGrid);
  };

  const setGridElement = (row: number, column: number) => {
    setGrid((currentGrid) => {
      const newGrid = JSON.parse(JSON.stringify(currentGrid));
      newGrid[row][column].selected = !newGrid[row][column].selected;
      return newGrid;
    });
  };

  useEffect(() => {
    shuffleAndInitialize();
  }, []);

  return (
    <BingoContext.Provider
      value={{ grid, setGridElement, shuffleAndInitialize, gameFinished }}
    >
      {children}
    </BingoContext.Provider>
  );
};
