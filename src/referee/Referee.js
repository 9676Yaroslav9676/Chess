import { TeamTypes, PieceTypes } from "../Constans";

export default class Referee {
  tileIsOccupied = (x, y, boardState) => {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  };

  tileIsOccupiedByOpponent = (x, y, boardState, team) => {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  };

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
    if (type === PieceTypes.PAWN) {
      const specialRow = team === TeamTypes.OPPONENT ? 1 : 6;
      const pawnDirection = team === TeamTypes.OPPONENT ? 1 : -1;

      //Movie figure

      if (
        initialPosition.x === disirePosition.x &&
        initialPosition.y === specialRow &&
        disirePosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(
            disirePosition.x,
            disirePosition.y,
            boardState
          ) &&
          !this.tileIsOccupied(
            disirePosition.x,
            disirePosition.y - pawnDirection,
            boardState
          )
        ) {
          return true;
        }
      } else if (
        initialPosition.x === disirePosition.x &&
        disirePosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          !this.tileIsOccupied(disirePosition.x, disirePosition.y, boardState)
        ) {
          return true;
        }
      }
      // Attack figure
      else if (
        disirePosition.x - initialPosition.x === -1 &&
        disirePosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedByOpponent(
            disirePosition.x,
            disirePosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      } else if (
        disirePosition.x - initialPosition.x === 1 &&
        disirePosition.y - initialPosition.y === pawnDirection
      ) {
        if (
          this.tileIsOccupiedByOpponent(
            disirePosition.x,
            disirePosition.y,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }
    return false;
  };
}
