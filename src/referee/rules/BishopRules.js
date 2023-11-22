import { samePosition } from "../../Constans";
import {
  tileIsOccupied,
  tileIsEmptyOrOccupiedByOpponent,
} from "./GeneralRules";

export const bishopMove = (
  initialPosition,
  disirePosition,
  team,
  boardState
) => {
  //Diagonal
  for (let i = 1; i < 8; i++) {
    let multiplierY = disirePosition.y > initialPosition.y ? 1 : -1;
    let multiplierX = disirePosition.x > initialPosition.x ? 1 : -1;
    let passedPosition = {
      x: initialPosition.x + i * multiplierX,
      y: initialPosition.y + i * multiplierY,
    };
    if (samePosition(passedPosition, disirePosition)) {
      if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
        return true;
      }
    } else {
      if (tileIsOccupied(passedPosition, boardState)) {
        break;
      }
    }
  }
  return false;
};
