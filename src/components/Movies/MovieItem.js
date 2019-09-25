import React from "react";
import PropTypes from "prop-types";
import AppContextHOC from "../HOC/AppContextHOC";
import MovieItemHOC from "./MovieItemHOC";
import { Link } from "react-router-dom";

const MovieItem = props => {
  const {
    item,
    favorite,
    watchlist,
    poster,
    defaultPoster,
    handleMark
  } = props;
  return (
    <div className="card" style={{ width: "100%" }}>
      <img
        className="card-img-top card-img--height"
        src={
          poster ? `https://image.tmdb.org/t/p/w500${poster}` : defaultPoster
        }
        alt="poster"
      />
      <div className="card-body">
        <Link to={`/movie/${item.id}`} className="card-title">
          {item.title}
        </Link>
        <div className="card-text">Рейтинг: {item.vote_average}</div>
        <div className="card-favorite-watchlist">
          <i className="material-icons" name="favorite" onClick={handleMark}>
            {favorite ? "star" : "star_border"}
          </i>
          <i className="material-icons" name="watchlist" onClick={handleMark}>
            {watchlist ? "bookmark" : "bookmark_border"}
          </i>
        </div>
      </div>
    </div>
  );
};

MovieItem.propTypes = {
  item: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
  watchlist: PropTypes.bool.isRequired,
  poster: PropTypes.string,
  defaultPoster: PropTypes.string.isRequired,
  handleMark: PropTypes.func.isRequired
};

export default AppContextHOC(MovieItemHOC(MovieItem));
