import { TeamTypes, PieceTypes } from "../Constans";
import {
  pawnMove,
  knightMove,
  bishopMove,
  rookMove,
  queenMove,
  kingMove,
} from "./rules";
export default class Referee {
  isEnPassantMove = (
    initialPosition,
    disirePosition,
    type,
    team,
    boardState
  ) => {
    const pawnDirection = team === TeamTypes.OPPONENT ? 1 : -1;

    if (type === PieceTypes.PAWN) {
      if (
        (disirePosition.x - initialPosition.x === -1 ||
          disirePosition.x - initialPosition.x === 1) &&
        disirePosition.y - initialPosition.y === pawnDirection
      ) {
        const piece = boardState.find(
          (p) =>
            p.position.x === disirePosition.x &&
            p.position.y === disirePosition.y - pawnDirection &&
            p.enPassant
        );
        console.log(piece);
        if (piece) {
          return true;
        }
      }
    }

    return false;
  };

  isValidMovie = (initialPosition, disirePosition, type, team, boardState) => {
    let validMove = false;
    switch (type) {
      case PieceTypes.PAWN:
        validMove = pawnMove(initialPosition, disirePosition, team, boardState);
        break;
      case PieceTypes.KNIGHT:
        validMove = knightMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.BISHOP:
        validMove = bishopMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.ROOK:
        validMove = rookMove(initialPosition, disirePosition, team, boardState);
        break;
      case PieceTypes.QUEEN:
        validMove = queenMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.KING:
        validMove = kingMove(initialPosition, disirePosition, team, boardState);
        break;
    }

    return validMove;
  };
}
