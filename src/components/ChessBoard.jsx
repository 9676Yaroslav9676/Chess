import { useRef, useState } from "react";
import Piece from "./Piece";
import classes from "./СhessBoard.module.css";

const ChessBoard = () => {
  const initialBoard = [
    [
      "rookB",
      "knightB",
      "bishopB",
      "queenB",
      "kingB",
      "bishopB",
      "knightB",
      "rookB",
    ],
    ["pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ];
  const lastOveredCell = useRef(null);
  const [board, setBoard] = useState(initialBoard);
  const [currentCellIndex, setCurrentCellIndex] = useState(null);

  const dragStartHandler = (e, piece, cellIndex, rowIndex) => {
    setCurrentCellIndex({ piece, cellIndex, rowIndex });
    e.dataTransfer.setData("text/plain", "");
  };

  const dragEndHandler = (e) => {};

  const dragOverHandler = (e) => {
    const el = e.target.closest("#cell");
    lastOveredCell.current = {
      cellIndex: el.getAttribute("datacellindex"),
      rowIndex: el.getAttribute("datarowindex"),
    };
    e.preventDefault();
  };

  const dropHandler = (e, cellIndex, rowIndex) => {
    if (currentCellIndex) {
      const newBoard = [...board];
      const {
        piece,
        cellIndex: oldCellIndex,
        rowIndex: oldRowIndex,
      } = currentCellIndex;
      console.log(lastOveredCell.current);
      newBoard[rowIndex][cellIndex] = piece;
      console.log(currentCellIndex);
      newBoard[oldRowIndex][oldCellIndex] = "";
      setBoard(newBoard);
    }
  };

  const clickHightLighting = (e, cellIndex, rowIndex) => {
    let cell = e.target;
    if (cell.style.opacity === "0.7") {
      cell.style.opacity = "1";
    } else {
      cell.style.opacity = "0.7";
    }
  };

  return (
    <div className={classes["chess-board"]}>
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={classes["chess-row"]}>
            {row.map((piece, cellIndex) => {
              const isBlack = (rowIndex + cellIndex) % 2 === 1;

              return (
                <div
                  onClick={(e) => clickHightLighting(e, cellIndex, rowIndex)}
                  onDragStart={(e) =>
                    dragStartHandler(e, piece, cellIndex, rowIndex)
                  }
                  onDragEnd={(e) => dragEndHandler(e, cellIndex, rowIndex)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropHandler(e, cellIndex, rowIndex)}
                  draggable={true}
                  datacellindex={cellIndex}
                  datarowindex={rowIndex}
                  key={cellIndex}
                  id="cell"
                  className={`${classes["chess-cell"]} ${
                    isBlack ? classes["black"] : classes["white"]
                  }`}
                >
                  {piece && <Piece type={piece} rowIndex={rowIndex} />}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
