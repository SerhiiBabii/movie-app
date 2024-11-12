import React, { Component } from "react";
import Snippet from "../Spinner/Spinner";
import CallApi from "../../../../api/api";

export default class Video extends Component {
  state = {
    video: [],
    loaded: true
  };

  componentDidMount() {
    this.updateVideo();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.activeTab !== this.props.activeTab &&
      this.props.activeTab === "2"
    ) {
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
    CallApi.get(`/movie/${this.props.match.params.id}/videos`, {
      params: { language: "en-US" }
    }).then(data => {
      this.getVideo(data);
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
