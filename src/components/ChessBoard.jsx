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

  const[currentCellIndex, setCurrentCellIndex] = useState(null)

  const dragStartHandler = (e, cellIndex) => { 
 console.log("drag", cellIndex)
 setCurrentCellIndex(cellIndex)
  }

  const dragLeaveHandler = (e) => {
    console.log("dragLeave")
  }

  const dragEndHandler = (e, cellIndex) => {
    console.log("dragEnd", cellIndex)
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
    console.log("dragOver")
    e.target.style.background = "ligthgrey"
  }

  const dropHandler = (e, cellIndex) => {
    e.preventDefault()
    console.log("drop", cellIndex)
   
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
                onDragStart={(e) => dragStartHandler(e, cellIndex)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragEnd={(e) => dragEndHandler(e, cellIndex)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, cellIndex)}
                draggable={true}
                  key={cellIndex}
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
