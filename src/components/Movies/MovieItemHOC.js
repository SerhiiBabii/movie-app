import React from "react";
import CallApi from "../../api/api";

export default Component =>
  class MoviesItemHOC extends React.Component {
    state = {
      favorite: false,
      watchlist: false,
      movie_id: ""
    };

    handleMark = e => {
      const name = e.target.getAttribute("name");
      if (this.props.user) {
        CallApi.mark(`/account/${this.props.user.id}/${name}`, {
          params: {
            session_id: this.props.session_id
          },
          body: {
            media_type: "movie",
            media_id: this.props.item.id,
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
              ...this.prevState,
              [name]: !prevState[name]
            }));
            this.checkMark("watchlist", this.props.item.id);
            this.checkMark("favorite", this.props.item.id);
          });
      } else if (!this.props.user) {
        this.props.toggleModal();
      }
    };

    checkMark = (targetName, movieId) => {
      this.props[targetName].results.forEach(itemResults => {
        if (movieId === itemResults.id) {
          this.setState(prevState => ({
            ...prevState,
            [targetName]: true
          }));
        }
      });
    };

    componentDidMount() {
      if (this.props.user) {
        this.checkMark("watchlist", this.props.item.id);
      }
      if (this.props.user) {
        this.checkMark("favorite", this.props.item.id);
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.user) {
        if (prevProps.watchlist !== this.props.watchlist) {
          this.checkMark("watchlist", this.props.item.id);
        }
        if (prevProps.favorite !== this.props.favorite) {
          this.checkMark("favorite", this.props.item.id);
        }
      }
      if (
        this.props.user &&
        (prevProps.filters !== this.props.filters ||
          prevProps.page !== this.props.page)
      ) {
        this.checkMark("watchlist", this.props.item.id);
        this.checkMark("favorite", this.props.item.id);
      }
      if (prevProps.user && this.props.user === null) {
        this.setState({
          ...this.state,
          favorite: false,
          watchlist: false
        });
      }
    }

    render() {
      const { item } = this.props;
      const { favorite, watchlist } = this.state;
      const poster = item.backdrop_path || item.poster_path;
      const defaultPoster = "./images/default-movie-poster.jpg";

      return (
        <Component
          item={item}
          favorite={favorite}
          watchlist={watchlist}
          poster={poster}
          defaultPoster={defaultPoster}
          handleMark={this.handleMark}
        />
      );
    }
  };
