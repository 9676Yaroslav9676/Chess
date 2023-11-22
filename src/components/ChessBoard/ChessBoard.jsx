import "./ChessBoard.css";
import Tile from "../Tile/Tile";
import { useRef, useState } from "react";
import Referee from "../../referee/Referee";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  PieceTypes,
  TeamTypes,
  initialBoardState,
  samePosition,
} from "../../Constans";
import Modal from "../Modal";

const ChessBoard = () => {
  const [activePiece, setActivePiece] = useState(null);
  const [promotionPawn, setPromotionPawn] = useState();
  const [grabPosition, setGrabPosition] = useState({ x: -1, y: -1 });
  const [pieces, setPieces] = useState(initialBoardState);
  const modalRef = useRef(null);
  const chessBoardRef = useRef(null);
  const referee = new Referee();

  const handleGrabPiece = (e) => {
    const element = e.target;
    const chessBoard = chessBoardRef.current;
    if (element.classList.contains("chess-piece") && chessBoard) {
      const grabX = Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE);
      const grabY = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - 600) / GRID_SIZE)
      );
      setGrabPosition({ x: grabX, y: grabY });

      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessBoard.offsetTop - 600) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      );

      if (currentPiece) {
        const validMove = referee.isValidMovie(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const isEnPassantMove = referee.isEnPassantMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        );

        const pawnDirection = currentPiece.team === TeamTypes.OPPONENT ? 1 : -1;

        if (isEnPassantMove) {
          const updatePieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
            ) {
              if (piece.type === PieceTypes.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, []);

          setPieces(updatePieces);
        } else if (validMove) {
          const updatePieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.enPassant =
                Math.abs(grabPosition.y - y) === 2 &&
                piece.type === PieceTypes.PAWN;
              piece.position.x = x;
              piece.position.y = y;

              let promotionRow = piece.team === TeamTypes.OPPONENT ? 7 : 0;

              if (y === promotionRow) {
                modalRef.current?.classList.remove("hidden");
                setPromotionPawn(piece);
              }

              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
              if (piece.type === PieceTypes.PAWN) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, []);

          setPieces(updatePieces);
        } else {
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  };

  const promotePawn = (type) => {
    modalRef.current?.classList.add("hidden");
    console.log(promotionPawn);
  };

  let board = [];

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const number = i + j + 2;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: i, y: j })
      );
      let image = piece ? piece.image : undefined;

      const tileKey = `${i}-${j}`;
      board.push(<Tile image={image} key={tileKey} number={number} />);
    }
  }
  return (
    <>
      <Modal onChange={() => promotePawn()} ref={modalRef} />
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
    </>
  );
};

export default ChessBoard;
