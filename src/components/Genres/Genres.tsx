import React from "react";

import "./Genres.scss";

interface Props {
  genres: any[];
}

const Genres: React.FC<Props> = ({ genres }) => {
  return (
    <div className="genres">
      {genres &&
        genres.map((genre) => {
          return (
            <div key={genre} className="genre">
              <p className="genreText">{genre}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Genres;
