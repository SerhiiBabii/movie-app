import React from "react";

export default class MovieItem extends React.Component {
  render() {
    const { item } = this.props;
    const poster = item.backdrop_path || item.poster_path;
    const defaultPoster = "./images/default-movie-poster.jpg";
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
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
      </div>
    );
  }
}
