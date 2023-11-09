import "./ChessBoard.css";
import Tile from "../Tile/Tile";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieces = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "w" : "b";
  const n = p === 0 ? 0 : 7;

  pieces.push({
    image: require(`../../assets/images/rook_${type}.png`),
    x: 0,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/rook_${type}.png`),
    x: 7,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/knigth_${type}.png`),
    x: 1,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/knigth_${type}.png`),
    x: 6,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/bishop_${type}.png`),
    x: 2,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/bishop_${type}.png`),
    x: 5,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/queen_${type}.png`),
    x: 3,
    y: n,
  });
  pieces.push({
    image: require(`../../assets/images/king_${type}.png`),
    x: 4,
    y: n,
  });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: require("../../assets/images/pawn_w.png"), x: i, y: 1 });
  pieces.push({ image: require("../../assets/images/pawn_b.png"), x: i, y: 6 });
}

const ChessBoard = () => {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = i + j + 2;
      let image = undefined;
      pieces.map((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });
      const tileKey = `${i}-${j}`;
      board.push(<Tile image={image} key={tileKey} number={number} />);
    }
  }
  return <div className="chess-board">{board}</div>;
};

export default ChessBoard;
