import React, { Component } from "react";
import CallApi from "../../../api/api";
import MovieTabs from "./MovieTabs";
import AppContext from "../../HOC/AppContextHOC";

class MoviePage extends Component {
  state = {
    movie: [],
    favorite: false,
    watchlist: false
  };

  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: { language: "ru_RU" }
    }).then(data => {
      this.setState({
        ...this.state,
        movie: data
      });
    });
    if (this.props.user) {
      this.checkMark("watchlist", this.props.match.params.id);
      this.checkMark("favorite", this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user !== this.props.user &&
      !this.props.user &&
      this.props.user !== null
    ) {
      this.props.getMovieFavorite(this.props.user.id, this.props.session_id);
      this.props.getMovieWatchlist(this.props.user.id, this.props.session_id);
    }
    if (this.props.user) {
      if (prevProps.watchlist !== this.props.watchlist) {
        this.checkMark("watchlist", this.props.match.params.id);
      }
      if (prevProps.favorite !== this.props.favorite) {
        this.checkMark("favorite", this.props.match.params.id);
      }
    }
    if (prevProps.user && this.props.user === null) {
      this.setState({
        ...this.state,
        favorite: false,
        watchlist: false
      });
    }
  }

  handleMark = e => {
    const name = e.target.getAttribute("name");
    if (this.props.user) {
      CallApi.mark(`/account/${this.props.user.id}/${name}`, {
        params: {
          session_id: this.props.session_id
        },
        body: {
          media_type: "movie",
          media_id: this.props.match.params.id,
          [name]: !this.state[name]
        }
      })
        .then(() => {
          if (name === "favorite") {
            this.props.getMovieFavorite(
              this.props.user.id,
              this.props.session_id
            );
          } else if (name === "watchlist") {
            this.props.getMovieWatchlist(
              this.props.user.id,
              this.props.session_id
            );
          }
        })
        .then(() => {
          this.setState(prevState => ({
            // ...prevState,
            [name]: !prevState[name]
          }));
        });
    } else if (!this.props.user) {
      this.props.toggleModal();
    }
  };

  checkMark = (targetName, movieId) => {
    this.props[targetName].results.forEach(itemResults => {
      if (+movieId === itemResults.id) {
        this.setState({
          // ...this.state,
          [targetName]: true
        });
      }
    });
  };

  render() {
    const {
      movie: {
        title,
        original_title,
        backdrop_path,
        poster_path,
        overview,
        vote_average,
        release_date
      },
      favorite,
      watchlist
    } = this.state;
    const poster = backdrop_path || poster_path;
    const defaultPoster = "../../images/default-movie-poster.jpg";
    return (
      <div>
        <h2>Hello! I'm a Movie Compnent</h2>
        <div className="">
          <img
            src={
              poster
                ? `https://image.tmdb.org/t/p/w500${poster}`
                : defaultPoster
            }
            alt="poster"
          />
          <div>
            <h4>
              {title} ({original_title}){" "}
              <span>{release_date ? release_date.substring(0, 4) : ""}</span>
            </h4>
            <div>
              <div>{vote_average}</div>
              <div className="card-favorite-watchlist">
                <i
                  className="material-icons"
                  name="favorite"
                  onClick={this.handleMark}
                >
                  {favorite ? "star" : "star_border"}
                </i>
                <i
                  className="material-icons"
                  name="watchlist"
                  onClick={this.handleMark}
                >
                  {watchlist ? "bookmark" : "bookmark_border"}
                </i>
              </div>
            </div>
            <div>
              <p>{overview}</p>
              <p></p>
            </div>
          </div>
        </div>
        <MovieTabs movie={this.state.movie} />
      </div>
    );
  }
}

export default AppContext(MoviePage);
