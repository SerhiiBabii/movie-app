import React from "react";
import PropTypes from "prop-types";
import GenresHOC from "./GenresHOC";
import AppContextHOC from "../HOC/AppContextHOC";

const Genres = ({ addGenre, genres }) => {
  return (
    <div className="btn-group row">
      {genres.map(item => (
        <label key={item.id} className="col-12">
          <input name={item.id} type="checkbox" onChange={addGenre} />
          {item.name}
        </label>
      ))}
    </div>
  );
};

Genres.propTypes = {
  addGenre: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired
};

export default AppContextHOC(GenresHOC(Genres));
