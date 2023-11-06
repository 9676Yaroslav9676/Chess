import PeshkaBlack from "../images/Новый проект (14).png";
import PeshkaWhite from "../images/Новый проект (15).png";
import TuraWhite from "../images/Новый проект (20).png";
import TuraBlack from "../images/Новый проект (11).png";
import KnigthBlack from "../images/Новый проект (13).png";
import KnigthWhite from "../images/Новый проект (16).png";
import BishopWhite from "../images/Новый проект (19).png";
import BishopBlack from "../images/Новый проект (10).png";
import QueenWhite from "../images/Новый проект (17).png";
import QueenBlack from "../images/Новый проект (12).png";
import KingWhite from "../images/Новый проект (18).png";
import KingBlack from "../images/Новый проект (9).png";
import classes from "./СhessBoard.module.css";

const Piece = ( { type, rowIndex, onChange }) => {
  const pieceImages = {
    pawn: rowIndex > 2 ? PeshkaWhite : PeshkaBlack,
    rook: rowIndex > 2 ? TuraWhite : TuraBlack,
    knight: rowIndex > 2 ? KnigthWhite : KnigthBlack,
    bishop: rowIndex > 2 ? BishopWhite : BishopBlack,
    queen: rowIndex > 2 ? QueenWhite : QueenBlack,
    king: rowIndex > 2 ? KingWhite : KingBlack,
  };

  return (
    
      <img
      src={pieceImages[type]}
      alt={type}
      className={classes["chess-piece"]}
    />
    
    
  );
};

export default Piece;
