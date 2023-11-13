import { TeamTypes } from "../components/ChessBoard/ChessBoard";

export default class Referee {
  tileIsOccupied = (x, y, boardState) => {
    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
      return true;
    }
  };

  isValidMovie = (px, py, x, y, type, team, boardState) => {
    if (type === "pawn") {
      const specialRow = team === TeamTypes.OPPONENT ? 1 : 6;
      const pawnDirection = team === TeamTypes.OPPONENT ? 1 : -1;

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
    }
    return false;
  };
}
