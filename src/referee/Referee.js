import { TeamTypes, PieceTypes, samePosition } from "../Constans";

export default class Referee {
  tileIsEmptyOrOccupiedByOpponent = (position, boardState, team) => {
   return(!this.tileIsOccupied(position, boardState) || this.tileIsOccupiedByOpponent(position, boardState, team))
  }

  tileIsOccupied = (position, boardState) => {
    const piece = boardState.find(
      (p) => samePosition(p.position, position)
    );

    if (piece) {
      return true;
    } else {
      return false;
    }
  };

  tileIsOccupiedByOpponent = (position, boardState, team) => {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
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
            disirePosition,
            boardState
          ) &&
          !this.tileIsOccupied(
            {x: disirePosition.x, y: disirePosition.y - pawnDirection},
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
          !this.tileIsOccupied(disirePosition, boardState)
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
            disirePosition,
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
            disirePosition,
            boardState,
            team
          )
        ) {
          return true;
        }
      }
    }else if(type === PieceTypes.KNIGHT){
      for(let i = -1; i < 2; i+= 2){
         for(let j = -1; j < 2; j+= 2){
          //top/bottom position
          if(disirePosition.y - initialPosition.y === 2 * i){
            if(disirePosition.x - initialPosition.x === j){
              if(this.tileIsEmptyOrOccupiedByOpponent(disirePosition, boardState, team)){
                return true
              }
            }
          }
          //rigth/left position
          if(disirePosition.x - initialPosition.x === 2 * i){
            if(disirePosition.y - initialPosition.y === j){
              if(this.tileIsEmptyOrOccupiedByOpponent(disirePosition, boardState, team)){
                return true
              }
            }
          }
         }
      }
    }else if(type === PieceTypes.BISHOP){

    
    
    for(let i = 1; i < 8; i++){
  //Up rigth movement
          if(disirePosition.x > initialPosition.x && disirePosition.y > initialPosition.y){
            let passedPosition =  {x: initialPosition.x + i, y: initialPosition.y + i}
            if(passedPosition.x === disirePosition.x && passedPosition.y === disirePosition.y){
              if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true
               }
              }else{
                if(this.tileIsOccupied(passedPosition, boardState)){
                break
              }
            }
          }
        
        
         
//Down rigth movement
          if(disirePosition.x < initialPosition.x && disirePosition.y > initialPosition.y){
            let passedPosition =  {x: initialPosition.x + i, y: initialPosition.y - i}
            if(passedPosition.x === disirePosition.x && passedPosition.y === disirePosition.y){
              if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true
               }
              }else{
                if(this.tileIsOccupied(passedPosition, boardState)){
                break
              }
            }
          }
          

  //Down left movement
          if(disirePosition.x > initialPosition.x && disirePosition.y < initialPosition.y){
            let passedPosition =  {x: initialPosition.x - i, y: initialPosition.y - i}
            if(passedPosition.x === disirePosition.x && passedPosition.y === disirePosition.y){
              if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true
               }
              }else{
                if(this.tileIsOccupied(passedPosition, boardState)){
                break
              }
            }
          }
          
         
//Up left movement
          if(disirePosition.x < initialPosition.x && disirePosition.y < initialPosition.y){
            let passedPosition =  {x: initialPosition.x - i, y: initialPosition.y + i}
            if(passedPosition.x === disirePosition.x && passedPosition.y === disirePosition.y){
              if(this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)){
                return true
               }
              }else{
                if(this.tileIsOccupied(passedPosition, boardState)){
                break
              }
            }
          }
          
    }
    }
    return false;
  };
}
