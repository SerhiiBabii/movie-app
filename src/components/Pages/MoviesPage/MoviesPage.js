import React, { Component } from "react";
import Cookies from "universal-cookie";
import Filters from "../../Filters/Filters";
import MoviesList from "../../Movies/MoviesList";
import AppContextHOC from "../../HOC/AppContextHOC";

const cookies = new Cookies();

class MoviesPage extends Component {
  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      const user_id = cookies.get("user_id");
      if (user_id && session_id) {
        this.props.getMovieFavorite(user_id, session_id);
        this.props.getMovieWatchlist(user_id, session_id);
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user !== this.props.user &&
      this.props.user &&
      this.props.user !== null
    ) {
      this.props.getMovieFavorite(this.props.user.id, this.props.session_id);
      this.props.getMovieWatchlist(this.props.user.id, this.props.session_id);
    }
  }

  render() {
    const { filters, page, total_pages, favorite, watchlist } = this.props;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card" style={{ width: "100%" }}>
              <div className="card-body">
                <h3>Filters:</h3>
                <Filters
                  filters={filters}
                  favorite={favorite}
                  watchlist={watchlist}
                  handleSelect={this.props.handleSelect}
                  page={page}
                  total_pages={total_pages}
                  changePage={this.props.changePage}
                  resetFilters={this.props.resetFilters}
                  addGenre={this.props.addGenre}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              total_pages={total_pages}
              currentTotalPages={this.props.currentTotalPages}
              favorite={favorite}
              watchlist={watchlist}
              getMovieFavorite={this.props.getMovieFavorite}
              getMovieWatchlist={this.props.getMovieWatchlist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AppContextHOC(MoviesPage);
