import { TeamTypes } from "../../Constans";
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
