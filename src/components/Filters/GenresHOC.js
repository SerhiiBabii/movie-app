import React from "react";
import { API_URL, API_KEY_3 } from "../../api/api";

export default Component =>
  class GenresHOC extends React.Component {
    state = {
      genres: []
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

    componentDidMount() {
      this.getGenres();
    }

    componentDidUpdate(prevProps) {
      if (
        prevProps.filters.genre !== this.props.filters.genre &&
        this.props.filters.genre === ""
      ) {
        this.setState(() => ({
          ...this.state,
          genres: []
        }));
        this.getGenres();
      }
    }

    render() {
      const { addGenre } = this.props;
      return <Component genres={this.state.genres} addGenre={addGenre} />;
    }
  };
