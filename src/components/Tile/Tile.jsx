import "./Tile.css";

const Tile = ({ number }) => {
  if (number % 2 === 0) {
    return <div className="tile black"></div>;
  } else {
    return <div className="tile white"></div>;
  }
};

export default Tile;
