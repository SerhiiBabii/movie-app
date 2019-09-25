import React, { Component } from "react";
import CallApi from "../../../../api/api";
import Snippet from "../Spinner/Spinner";

export default class Video extends Component {
  state = {
    video: [],
    loaded: true
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeTab !== this.props.activeTab &&
      this.props.activeTab === "2"
    ) {
      console.log("componentDidUpdate");
      this.updateVideo();
    }
  }

  getVideo = data => {
    this.setState(() => ({
      video: data.results,
      loaded: false
    }));
  };

  updateVideo = () => {
    CallApi.get(`/movie/${this.props.movieId}/videos`, {
      params: { language: "ru-RU" }
    }).then(data => {
      this.getVideo(data);
      console.log(data);
    });
  };

  render() {
    const { video, loaded } = this.state;
    const snippet = loaded ? <Snippet /> : null;
    const videoList = !loaded ? <ViewVideo data={video} /> : null;
    return (
      <div>
        {snippet}
        {videoList}
      </div>
    );
  }
}

const ViewVideo = ({ data }) => {
  return data.map(item => {
    return (
      <div key={item.id}>
        <h6>{item.name}</h6>
        <iframe
          title={item.id}
          width="720"
          height="480"
          src={`https://www.youtube.com/embed/${item.key}`}
        ></iframe>
      </div>
    );
  });
};
