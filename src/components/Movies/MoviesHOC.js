import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MoviesHOC extends React.Component {
    constructor() {
      super();

      this.state = {
        movies: []
      };
    }

    changedSortBy = (filter, page = 1, currentTotalPages) => {
      const { sort_by, year, genre = "" } = filter;
      const queryStringParams = {
        language: "ru-RU",
        sort_by: sort_by,
        page: page,
        primary_release_year: year,
        with_genres: genre
      };
      CallApi.get("/discover/movie", { params: queryStringParams }).then(
        data => {
          currentTotalPages(data.total_pages);
          this.setState({
            movies: data.results
          });
        }
      );
    };

    componentDidMount() {
      this.changedSortBy(
        this.props.filters,
        this.props.page,
        this.props.currentTotalPages
      );
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.filters.sort_by !== this.props.filters.sort_by ||
        prevProps.filters.genre !== this.props.filters.genre ||
        prevProps.page !== this.props.page ||
        prevProps.filters.year !== this.props.filters.year
      ) {
        this.changedSortBy(
          this.props.filters,
          this.props.page,
          this.props.currentTotalPages
        );
        if (this.props.user && this.props.session_id) {
          this.props.getMovieWatchlist(
            this.props.user.id,
            this.props.session_id
          );
          this.props.getMovieFavorite(
            this.props.user.id,
            this.props.session_id
          );
        }
      }
    }

    render() {
      const { movies } = this.state;
      return <Component movies={movies} />;
    }
  };
