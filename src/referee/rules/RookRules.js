import { samePosition } from "../../Constans";
import {
  tileIsOccupied,
  tileIsEmptyOrOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (initialPosition, disirePosition, team, boardState) => {
  for (let i = 1; i < 8; i++) {
    //UP/Down movement
    if (disirePosition.x === initialPosition.x) {
      let multiplier = disirePosition.y > initialPosition.y ? 1 : -1;
      let passedPosition = {
        x: initialPosition.x,
        y: initialPosition.y + i * multiplier,
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

    //Left/Rigth movement
    if (disirePosition.y === initialPosition.y) {
      let multiplier = disirePosition.x > initialPosition.x ? 1 : -1;
      let passedPosition = {
        x: initialPosition.x + i * multiplier,
        y: initialPosition.y,
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
  }
  return false;
};
