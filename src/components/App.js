import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import { API_URL, API_KEY_3 } from "../api/api";

const initialState = {
  filters: {
    sort_by: "popularity.desc",
    year: 2019
  },
  page: 1,
  genres: [],
  genre: ""
};
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...initialState,
      total_pages: ""
    };
  }

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
    this.getGenres();
    this.setState({
      ...initialState
    });
  };

  getGenres = () => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-Ru`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          genres: data.genres
        });
      });
  };

  toggleGenre = (array, item) => {
    const index = array.findIndex(el => el === item);
    const newArr = [...array.slice(0, index), ...array.slice(index + 1)];

    return newArr;
  };

  addGenre = e => {
    const id = e.target.name;
    let arr = [...this.state.genre];
    if (this.state.genre.includes(id)) {
      arr = this.toggleGenre(arr, id);
    } else {
      arr = [...arr, id];
    }
    this.setState(() => ({
      ...this.state,
      page: 1,
      genre: arr
    }));
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const { filters, page, total_pages, genres, genre } = this.state;
    return (
      <div className="container">
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
                  genres={genres}
                  genre={genre}
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
              genre={genre}
              currentTotalPages={this.currentTotalPages}
            />
          </div>
        </div>
      </div>
    );
  }
}
