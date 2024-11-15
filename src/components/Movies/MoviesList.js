import React from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import MoviesHOC from "./MoviesHOC";

const MoviesList = ({
  filters,
  movies,
  getMovieFavorite,
  getMovieWatchlist
}) => {
  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem
              item={movie}
              filters={filters}
              getMovieFavorite={getMovieFavorite}
              getMovieWatchlist={getMovieWatchlist}
            />
          </div>
        );
      })}
    </div>
  );
};

MoviesList.defaulProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MoviesHOC(MoviesList);
