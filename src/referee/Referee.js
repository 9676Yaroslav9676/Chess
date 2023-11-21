import { TeamTypes, PieceTypes, samePosition } from "../Constans";

export default class Referee {
  tileIsEmptyOrOccupiedByOpponent = (position, boardState, team) => {
    return (
      !this.tileIsOccupied(position, boardState) ||
      this.tileIsOccupiedByOpponent(position, boardState, team)
    );
  };

  tileIsOccupied = (position, boardState) => {
    const piece = boardState.find((p) => samePosition(p.position, position));

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

  pawnMove = (initialPosition, disirePosition, team, boardState) => {
    const specialRow = team === TeamTypes.OPPONENT ? 1 : 6;
    const pawnDirection = team === TeamTypes.OPPONENT ? 1 : -1;

    //Movie figure

    if (
      initialPosition.x === disirePosition.x &&
      initialPosition.y === specialRow &&
      disirePosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !this.tileIsOccupied(disirePosition, boardState) &&
        !this.tileIsOccupied(
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
      if (!this.tileIsOccupied(disirePosition, boardState)) {
        return true;
      }
    }
    // Attack figure
    else if (
      disirePosition.x - initialPosition.x === -1 &&
      disirePosition.y - initialPosition.y === pawnDirection
    ) {
      if (this.tileIsOccupiedByOpponent(disirePosition, boardState, team)) {
        return true;
      }
    } else if (
      disirePosition.x - initialPosition.x === 1 &&
      disirePosition.y - initialPosition.y === pawnDirection
    ) {
      if (this.tileIsOccupiedByOpponent(disirePosition, boardState, team)) {
        return true;
      }
    }
    return false;
  };

  knightMove = (initialPosition, disirePosition, team, boardState) => {
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        //top/bottom position
        if (disirePosition.y - initialPosition.y === 2 * i) {
          if (disirePosition.x - initialPosition.x === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpponent(
                disirePosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }
        //rigth/left position
        if (disirePosition.x - initialPosition.x === 2 * i) {
          if (disirePosition.y - initialPosition.y === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpponent(
                disirePosition,
                boardState,
                team
              )
            ) {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  bishopMove = (initialPosition, disirePosition, team, boardState) => {
    //Diagonal
    for (let i = 1; i < 8; i++) {
      let multiplierY = disirePosition.y > initialPosition.y ? 1 : -1;
      let multiplierX = disirePosition.x > initialPosition.x ? 1 : -1;
      let passedPosition = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      };
      if (samePosition(passedPosition, disirePosition)) {
        if (
          this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  };

  rookMove = (initialPosition, disirePosition, team, boardState) => {
    for (let i = 1; i < 8; i++) {
      //UP/Down movement
      if (disirePosition.x === initialPosition.x) {
        let multiplier = disirePosition.y > initialPosition.y ? 1 : -1;
        let passedPosition = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        };
        if (samePosition(passedPosition, disirePosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true;
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break;
          }
        }
      }
    }
    return false;
  };

  queenMove = (initialPosition, disirePosition, team, boardState) => {
    for (let i = 1; i < 8; i++) {
      let multiplierX =
        disirePosition.x > initialPosition.x
          ? 1
          : disirePosition.x < initialPosition.x
          ? -1
          : 0;
      let multiplierY =
        disirePosition.y > initialPosition.y
          ? 1
          : disirePosition.y < initialPosition.y
          ? -1
          : 0;

      let passedPosition = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      };
      if (samePosition(passedPosition, disirePosition)) {
        if (
          this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  };

  kingMove = (initialPosition, disirePosition, team, boardState) => {
    for (let i = 1; i < 2; i++) {
      let multiplierX =
        disirePosition.x > initialPosition.x
          ? 1
          : disirePosition.x < initialPosition.x
          ? -1
          : 0;
      let multiplierY =
        disirePosition.y > initialPosition.y
          ? 1
          : disirePosition.y < initialPosition.y
          ? -1
          : 0;

      let passedPosition = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      };
      if (samePosition(passedPosition, disirePosition)) {
        if (
          this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true;
        }
      } else {
        if (this.tileIsOccupied(passedPosition, boardState)) {
          break;
        }
      }
    }
    return false;
  };

  isValidMovie = (initialPosition, disirePosition, type, team, boardState) => {
    let validMove = false;
    switch (type) {
      case PieceTypes.PAWN:
        validMove = this.pawnMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.KNIGHT:
        validMove = this.knightMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.BISHOP:
        validMove = this.bishopMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.ROOK:
        validMove = this.rookMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.QUEEN:
        validMove = this.queenMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
      case PieceTypes.KING:
        validMove = this.kingMove(
          initialPosition,
          disirePosition,
          team,
          boardState
        );
        break;
    }

    return validMove;
  };
}
