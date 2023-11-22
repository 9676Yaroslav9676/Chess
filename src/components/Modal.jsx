import { PieceTypes } from "../Constans";
import "./Modal.css";

const Modal = () => {
  return (
    <div className="pawn-promotion-modal ">
      <div className="modal-body">
        <div>
          <img
            onClick={() => onChange(PieceTypes.ROOK)}
            src={require(`../assets/images/rook_w.png`)}
          ></img>
        </div>
        <div>
          <img
            onClick={() => onChange(PieceTypes.KNIGHT)}
            src={require(`../assets/images/knigth_w.png`)}
          ></img>
        </div>
        <div>
          <img
            onClick={() => onChange(PieceTypes.BISHOP)}
            src={require(`../assets/images/bishop_w.png`)}
          ></img>
        </div>
        <div>
          <img
            onClick={() => onChange(PieceTypes.QUEEN)}
            src={require(`../assets/images/queen_w.png`)}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Modal;
