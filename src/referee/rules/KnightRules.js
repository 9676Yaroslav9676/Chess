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
