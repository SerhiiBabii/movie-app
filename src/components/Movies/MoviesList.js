import React, { Component } from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";

export default class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
  }

  changedSortBy = (filter, page = 1, currentTotalPages, genre = "") => {
    const { sort_by, year } = filter;

    const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${year}&with_genres=${genre}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        currentTotalPages(data.total_pages);
        this.setState({
          movies: data.results
        });
      });
  };

  componentDidMount() {
    this.changedSortBy(
      this.props.filters,
      this.props.page,
      this.props.currentTotalPages,
      this.props.genre
    );
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.filters.sort_by !== this.props.filters.sort_by ||
      prevProps.page !== this.props.page ||
      prevProps.filters.year !== this.props.filters.year ||
      prevProps.genre !== this.props.genre
    ) {
      this.changedSortBy(
        this.props.filters,
        this.props.page,
        this.props.currentTotalPages,
        this.props.genre
      );
    }
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="row">
        {movies.map(movie => {
          return (
            <div key={movie.id} className="col-6 mb-4">
              <MovieItem item={movie} />
            </div>
          );
        })}
      </div>
    );
  }
}
