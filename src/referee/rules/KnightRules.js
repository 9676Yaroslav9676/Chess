import { tileIsEmptyOrOccupiedByOpponent } from "./GeneralRules";

export const knightMove = (
  initialPosition,
  disirePosition,
  team,
  boardState
) => {
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      //top/bottom position
      if (disirePosition.y - initialPosition.y === 2 * i) {
        if (disirePosition.x - initialPosition.x === j) {
          if (
            tileIsEmptyOrOccupiedByOpponent(disirePosition, boardState, team)
          ) {
            return true;
          }
        }
      }
      //rigth/left position
      if (disirePosition.x - initialPosition.x === 2 * i) {
        if (disirePosition.y - initialPosition.y === j) {
          if (
            tileIsEmptyOrOccupiedByOpponent(disirePosition, boardState, team)
          ) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const getPossibleKnightMoves = (knight, boardState) => {
  const possibleMovies = [];
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; i += 2) {
      const verticalMove = {
        x: knight.position.x + j,
        y: knight.position.y + i * 2,
      };
      const horizontalMove = {
        x: knight.position.x + i * 2,
        y: knight.position.y + j,
      };
    }
  }

  return possibleMovies;
};
