import React, { Component } from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import CallApi from "../api/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppContext = React.createContext();

const initialState = {
  filters: {
    sort_by: "popularity.desc",
    year: 2019,
    genre: ""
  },
  page: 1
};
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      ...initialState,
      user: null,
      session_id: null,
      total_pages: "",
      showModal: false,
      watchlist: [],
      favorite: []
    };
  }

  updateUser = user => {
    this.updateUserId(user.id);
    this.setState({
      user
    });
  };

  updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 259200
    });
    this.setState({
      session_id
    });
  };

  updateUserId = user_id => {
    cookies.set("user_id", user_id, {
      path: "/",
      maxAge: 259200
    });
  };

  onLogOut = () => {
    CallApi.delete("/authentication/session", {
      params: { session_id: this.state.session_id }
    });
    cookies.remove("session_id");
    cookies.remove("user_id");
    this.setState({
      ...this.state,
      user: null,
      session_id: null,
      watchlist: [],
      favorite: []
    });
  };

  handleSelect = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [name]: value
      },
      page: 1
    }));
  };

  changePage = page => {
    this.setState({
      ...this.state,
      page
    });
  };

  currentTotalPages = e => {
    this.setState({
      ...this.state,
      total_pages: e
    });
  };

  resetFilters = e => {
    this.setState({
      ...initialState
    });
  };

  toggleGenre = (array, item) => {
    const index = array.findIndex(el => el === item);
    const newArr = [...array.slice(0, index), ...array.slice(index + 1)];

    return newArr;
  };

  addGenre = e => {
    const id = e.target.name;
    let arr = [...this.state.filters.genre];
    if (this.state.filters.genre.includes(id)) {
      arr = this.toggleGenre(arr, id);
    } else {
      arr = [...arr, id];
    }
    this.setState(() => ({
      ...this.state,
      page: 1,
      filters: {
        ...this.state.filters,
        genre: arr
      }
    }));
  };

  getMovieWatchlist = (user_id, session_id) => {
    CallApi.get(`/account/${user_id}/watchlist/movies`, {
      params: { session_id: session_id, language: "ru-RU" }
    }).then(watchlist => {
      this.setState({
        ...this.state,
        watchlist: watchlist
      });
    });
  };

  getMovieFavorite = (user_id, session_id) => {
    CallApi.get(`/account/${user_id}/favorite/movies`, {
      params: { session_id: session_id, language: "ru-RU" }
    }).then(favorite => {
      this.setState({
        ...this.state,
        favorite: favorite
      });
    });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...this.state,
      showModal: !prevState.showModal
    }));
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if (session_id) {
      CallApi.get("/account", { params: { session_id: session_id } }).then(
        user => {
          this.updateUser(user);
        }
      );
      this.setState({
        ...this.state,
        session_id
      });
      const user_id = cookies.get("user_id");
      if (user_id && session_id) {
        this.getMovieFavorite(user_id, session_id);
        this.getMovieWatchlist(user_id, session_id);
      }
    }
  }

  render() {
    const {
      filters,
      page,
      total_pages,
      user,
      session_id,
      showModal
    } = this.state;
    return (
      <AppContext.Provider
        value={{
          user: user,
          filters: filters,
          onLogOut: this.onLogOut,
          updateUser: this.updateUser,
          updateSessionId: this.updateSessionId,
          session_id: session_id,
          getMovieFavorite: this.getMovieFavorite,
          getMovieWatchlist: this.getMovieWatchlist,
          watchlist: this.state.watchlist,
          favorite: this.state.favorite,
          showModal: showModal,
          toggleModal: this.toggleModal
        }}
      >
        <div className="container">
          <Header user={user} />
          <div className="row mt-4">
            <div className="col-4">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h3>Фильтры:</h3>
                  <Filters
                    filters={filters}
                    handleSelect={this.handleSelect}
                    page={page}
                    total_pages={total_pages}
                    changePage={this.changePage}
                    resetFilters={this.resetFilters}
                    addGenre={this.addGenre}
                  />
                </div>
              </div>
            </div>
            <div className="col-8">
              <MoviesList
                filters={filters}
                page={page}
                total_pages={total_pages}
                currentTotalPages={this.currentTotalPages}
                user={user}
                getMovieFavorite={this.getMovieFavorite}
                getMovieWatchlist={this.getMovieWatchlist}
                session_id={session_id}
              />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}
