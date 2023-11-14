import { TeamTypes } from "../components/ChessBoard/ChessBoard";

export default class Referee {
  tileIsOccupied = (x, y, boardState) => {
    const piece = boardState.find((p) => p.x === x && p.y === y);

    if (piece) {
      return true;
    } else {
      return false;
    }
  };

  tileIsOccupiedByOpponent = (x, y, boardState, team) => {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  };

  isValidMovie = (px, py, x, y, type, team, boardState) => {
    if (type === "pawn") {
      const specialRow = team === TeamTypes.OPPONENT ? 1 : 6;
      const pawnDirection = team === TeamTypes.OPPONENT ? 1 : -1;

      //Movie figure

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true;
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true;
        }
      }
      // Attack figure
      else if (x - px === -1 && y - py === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      } else if (x - px === 1 && y - py === pawnDirection) {
        if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
          return true;
        }
      }
    }
    return false;
  };
}
