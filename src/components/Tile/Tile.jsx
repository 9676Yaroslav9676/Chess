import "./Tile.css";

const Tile = ({ number, image }) => {
  if (number % 2 === 0) {
    return (
      <div className="tile white">
        {image && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="chess-piece"
          ></div>
        )}
      </div>
    );
  } else {
    return (
      <div className="tile black">
        {image && (
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="chess-piece"
          ></div>
        )}
      </div>
    );
  }
};

export default Tile;
