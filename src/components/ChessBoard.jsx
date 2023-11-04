import { useState } from "react";
import Piece from "./Piece";
import classes from "./СhessBoard.module.css";

const ChessBoard = () => {
  const [board, setBoard] = useState([
    ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"],
  ]);

  const handleFigure = (rowIndex, cellIndex) => {
    setBoard((prev) => {
    let res = [...prev]

    const value = res[rowIndex][cellIndex];
    console.log(value)
    // res[rowIndex + 1][cellIndex] = piece;
    return res
    })
  }

  return (
    <div className={classes["chess-board"]}>
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className={classes["chess-row"]}>
            {row.map((piece, cellIndex) => {
              const isBlack = (rowIndex + cellIndex) % 2 === 1;

              return (
                <div
                  key={cellIndex}
                  className={`${classes["chess-cell"]} ${
                    isBlack ? classes["black"] : classes["white"]
                  }`}
                >
                  {piece && <Piece onChange={() => handleFigure(rowIndex, cellIndex)} type={piece} rowIndex={rowIndex} />}
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
