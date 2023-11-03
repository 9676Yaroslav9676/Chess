import PeshkaBlack from "../images/free-icon-pawn-497304 (2).png";
import PeshkaWhite from "../images/free-icon-pawn-497273 (2).png";
import TuraWhite from "../images/kisspng-chess-piece-pawn-rook-queen-vector-ai-figure-5ad9d0034d2b67.4585280715242240033161.png";
import TuraBlack from "../images/kisspng-chess-piece-queen-pawn-checkmate-5af10fb7b307a0.9899481915257476397333.png";
import classes from "./СhessBoard.module.css";

const Piece = ( { type, rowIndex, onChange }) => {
  const pieceImages = {
    pawn: rowIndex > 2 ? PeshkaBlack : PeshkaWhite,
    rook: rowIndex > 2 ? TuraBlack : TuraWhite,
  };

  return (
    <img onClick={onChange}
      src={pieceImages[type]}
      alt={type}
      className={classes["chess-piece"]}
    />
  );
};

export default Piece;
