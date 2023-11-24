import { PieceTypes, TeamTypes, samePosition } from "../../Constans";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (initialPosition, disirePosition, team, boardState) => {
  const specialRow = team === TeamTypes.OPPONENT ? 1 : 6;
  const pawnDirection = team === TeamTypes.OPPONENT ? 1 : -1;

  //Movie figure

  if (
    initialPosition.x === disirePosition.x &&
    initialPosition.y === specialRow &&
    disirePosition.y - initialPosition.y === 2 * pawnDirection
  ) {
    if (
      !tileIsOccupied(disirePosition, boardState) &&
      !tileIsOccupied(
        { x: disirePosition.x, y: disirePosition.y - pawnDirection },
        boardState
      )
    ) {
      return true;
    }
  } else if (
    initialPosition.x === disirePosition.x &&
    disirePosition.y - initialPosition.y === pawnDirection
  ) {
    if (!tileIsOccupied(disirePosition, boardState)) {
      return true;
    }
  }
  // Attack figure
  else if (
    disirePosition.x - initialPosition.x === -1 &&
    disirePosition.y - initialPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedByOpponent(disirePosition, boardState, team)) {
      return true;
    }
  } else if (
    disirePosition.x - initialPosition.x === 1 &&
    disirePosition.y - initialPosition.y === pawnDirection
  ) {
    if (tileIsOccupiedByOpponent(disirePosition, boardState, team)) {
      return true;
    }
  }
  return false;
};

export const getPossiblePawnMoves = (pawn, boardState) => {
  const possibleMovies = [];
  const specialRow = pawn.team === TeamTypes.OPPONENT ? 1 : 6;
  const pawnDirection = pawn.team === TeamTypes.OPPONENT ? 1 : -1;

  const normalMove = { x: pawn.position.x, y: pawn.position.y + pawnDirection };
  const specialMove = {
    x: pawn.position.x,
    y: pawn.position.y + 2 * pawnDirection,
  };
  const upperLeftAttack = { x: pawn.position.x - 1, y: pawn.position.y };
  const upperRightAttack = { x: pawn.position.x + 1, y: pawn.position.y };
  const leftPosition = { x: pawn.position.x - 1, y: pawn.position.y };
  const rightPosition = { x: pawn.position.x + 1, y: pawn.position.y };

  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMovies.push(normalMove);

    if (
      pawn.position.y === specialRow &&
      !tileIsOccupied(specialMove, boardState)
    ) {
      possibleMovies.push(specialMove);
    }
  }

  if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
    possibleMovies.push(upperLeftAttack);
  } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
    const leftPiece = boardState.find((p) =>
      samePosition(p.position, leftPosition)
    );
    if (leftPiece != null && leftPiece.enPassant) {
      possibleMovies.push(upperLeftAttack);
    }
  }

  if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
    possibleMovies.push(upperRightAttack);
  } else if (!tileIsOccupied(upperRightAttack, boardState)) {
    const rightPiece = boardState.find((p) =>
      samePosition(p.position, rightPosition)
    );
    if (rightPiece != null && rightPiece.enPassant) {
      possibleMovies.push(upperRightAttack);
    }
  }

  return possibleMovies;
};
