import React, { Component } from "react";
import Actor from "./Actor";
import Snippet from "../Spinner/Spinner";
import CallApi from "../../../../api/api";

export default class Credits extends Component {
  state = {
    actors: [],
    loaded: true
  };

  getActors = data => {
    this.setState({
      actors: data.cast, //[].concat(...data.cast)
      loaded: false
    });
  };

  updateActors = () => {
    CallApi.get(`/movie/${this.props.movieId}/credits`, {
      params: { language: "ru_RU" }
    }).then(this.getActors);
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeTab !== this.props.activeTab &&
      this.props.activeTab === "3"
    ) {
      this.updateActors();
    }
  }

  render() {
    const { actors, loaded } = this.state;
    const snippet = loaded ? <Snippet /> : null;
    const actorsList = !loaded ? <ListActors actors={actors} /> : null;
    return (
      <div>
        {snippet}
        {actorsList}
      </div>
    );
  }
}

const ListActors = ({ actors }) => {
  return (
    <div>
      {actors.map(item => {
        return <Actor key={item.cast_id} actor={item} />;
      })}
    </div>
  );
};
