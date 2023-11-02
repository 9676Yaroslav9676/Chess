import "./ChessBoardModule.css";
import Figure from "./Figure";
import PeshkaWhite from "../images/free-icon-pawn-497273 (2).png";

const ChessBoard = () => {
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      // const figure =
      //   squares.length > 7 && squares.length < 16 ? (
      //     <img src={PeshkaWhite}></img>
      //   ) : null;
      const squareColor = (row + col) % 2 === 0 ? "white" : "grey";
      squares.push(
        <div key={`${row}-${col}`} className={`square ${squareColor}`}>
          <Figure />
        </div>
      );
    }
  }

  return (
    <div>
      <div className="chess-board">{squares}</div>
    </div>
  );
};

export default ChessBoard;
