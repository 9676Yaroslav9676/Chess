import "./ChessBoardModule.css";

const ChessBoard = () => {
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareColor = (row + col) % 2 === 0 ? "white" : "grey";
      squares.push(
        <div key={`${row}-${col}`} className={`square ${squareColor}`}></div>
      );
    }
  }
  return (
    <div>
      <div className="chess-board">{squares}</div>;
    </div>
  );
};

export default ChessBoard;
