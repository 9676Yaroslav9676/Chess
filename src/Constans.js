export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const GRID_SIZE = 75;

export const samePosition = (p1, p2) => {
  return p1.x === p2.x && p1.y === p2.y;
};

export const PieceTypes = {
  PAWN: "pawn",
  ROOK: "rook",
  KNIGHT: "knight",
  BISHOP: "bishop",
  QUEEN: "queen",
  KING: "king",
};

export const TeamTypes = {
  OPPONENT: 1,
  OUR: 2,
};

export const initialBoardState = [
  {
    image: require(`./assets/images/rook_w.png`),
    position: { x: 0, y: 0 },
    type: PieceTypes.ROOK,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/knigth_w.png`),
    position: { x: 1, y: 0 },
    type: PieceTypes.KNIGHT,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/bishop_w.png`),
    position: { x: 2, y: 0 },
    type: PieceTypes.BISHOP,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/queen_w.png`),
    position: { x: 3, y: 0 },
    type: PieceTypes.QUEEN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/king_w.png`),
    position: { x: 4, y: 0 },
    type: PieceTypes.KING,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/bishop_w.png`),
    position: { x: 5, y: 0 },
    type: PieceTypes.BISHOP,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/knigth_w.png`),
    position: { x: 6, y: 0 },
    type: PieceTypes.KNIGHT,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/rook_w.png`),
    position: { x: 7, y: 0 },
    type: PieceTypes.ROOK,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require(`./assets/images/rook_b.png`),
    position: { x: 0, y: 7 },
    type: PieceTypes.ROOK,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/knigth_b.png`),
    position: { x: 1, y: 7 },
    type: PieceTypes.KNIGHT,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/bishop_b.png`),
    position: { x: 2, y: 7 },
    type: PieceTypes.BISHOP,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/queen_b.png`),
    position: { x: 3, y: 7 },
    type: PieceTypes.QUEEN,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/king_b.png`),
    position: { x: 4, y: 7 },
    type: PieceTypes.KING,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/bishop_b.png`),
    position: { x: 5, y: 7 },
    type: PieceTypes.BISHOP,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/knigth_b.png`),
    position: { x: 6, y: 7 },
    type: PieceTypes.KNIGHT,
    team: TeamTypes.OUR,
  },
  {
    image: require(`./assets/images/rook_b.png`),
    position: { x: 7, y: 7 },
    type: PieceTypes.ROOK,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 0, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 1, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 2, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 3, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 4, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 5, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 6, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_w.png"),
    position: { x: 7, y: 1 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OPPONENT,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 0, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 1, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 2, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 3, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 4, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 5, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 6, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
  {
    image: require("./assets/images/pawn_b.png"),
    position: { x: 7, y: 6 },
    type: PieceTypes.PAWN,
    team: TeamTypes.OUR,
  },
];
