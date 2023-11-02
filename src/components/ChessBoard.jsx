import "./ChessBoardModule.css";
import Figure from "./Figure";
import PeshkaWhite from "../images/free-icon-pawn-497273 (2).png";

const ChessBoard = () => {
  const squares = [];

  const figures = {
    img: PeshkaWhite,
    location: [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
      [7, 1],
    ],
  };

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareColor = (row + col) % 2 === 0 ? "white" : "grey";

      let figure = null;

      for (const [figureRow, figureCol] of figures.location) {
        if (row === figureRow && col === figureCol) {
          figure = <img src={figures.img} alt="Пішка" />;
          break;
        }
      }

      squares.push(
        <div key={`${row}-${col}`} className={`square ${squareColor}`}>
          {figure}
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
