import "./Tile.css";

const Tile = ({ number, image, highlight }) => {
  const className = [
    "tile",
    number % 2 === 0 && "black",
    number % 2 !== 0 && "white",
    highlight && "tile-highlight",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="chess-piece"
        ></div>
      )}
    </div>
  );
};

export default Tile;
