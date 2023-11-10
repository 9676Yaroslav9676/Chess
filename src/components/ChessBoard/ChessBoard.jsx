import "./ChessBoard.css";
import Tile from "../Tile/Tile";
import { useRef, useState } from "react";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const initialBoardState = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const n = p === 0 ? 0 : 7;

  initialBoardState.push({
    image: require(`../../assets/images/rook_${type}.png`),
    x: 0,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/rook_${type}.png`),
    x: 7,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/knigth_${type}.png`),
    x: 1,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/knigth_${type}.png`),
    x: 6,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/bishop_${type}.png`),
    x: 2,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/bishop_${type}.png`),
    x: 5,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/queen_${type}.png`),
    x: 3,
    y: n,
  });
  initialBoardState.push({
    image: require(`../../assets/images/king_${type}.png`),
    x: 4,
    y: n,
  });
}

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: require("../../assets/images/pawn_b.png"),
    x: i,
    y: 1,
  });
  initialBoardState.push({
    image: require("../../assets/images/pawn_w.png"),
    x: i,
    y: 6,
  });
}

const ChessBoard = () => {
  const [activePiece, setActivePiece] = useState(null);
  const [gridY, setGridY] = useState(0);
  const [gridX, setGridX] = useState(0);
  const [pieces, setPieces] = useState(initialBoardState);
  const chessBoardRef = useRef(null);

  const handleGrabPiece = (e) => {
    const element = e.target;
    const chessBoard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessBoard) {
      setGridX(Math.floor((e.clientX - chessBoard.offsetLeft) / 100));
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100))
      );

      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActivePiece(element);
    }
  };

  const handleMovePiece = (e) => {
    const chessBoard = chessBoardRef.current;
    if (activePiece && chessBoard) {
      const chessBoardRect = chessBoard.getBoundingClientRect();
      const minX = chessBoardRect.left - 17;
      const minY = chessBoardRect.top - 10;
      const maxX = chessBoardRect.right - 57;
      const maxY = chessBoardRect.bottom - 60;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  };

  const handleUpPiece = (e) => {
    const chessBoard = chessBoardRef.current;
    if (activePiece && chessBoard) {
      const x = Math.floor((e.clientX - chessBoard.offsetLeft) / 100);

      const y = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100)
      );

      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });
      setActivePiece(null);
    }
  };

  let board = verticalAxis.map((v, j) => {
    return horizontalAxis.map((h, i) => {
      const number = i + j + 2;
      let image;
      pieces.forEach((p) => {
        p.x === i && p.y === j && (image = p.image);
      });
      const tileKey = `${i}-${j}`;
      return <Tile image={image} key={tileKey} number={number} />;
    });
  });
  return (
    <div
      onMouseUp={handleUpPiece}
      onMouseMove={handleMovePiece}
      onMouseDown={handleGrabPiece}
      className="chess-board"
      id="chessBoard"
      ref={chessBoardRef}
    >
      {board}
    </div>
  );
};

export default ChessBoard;
