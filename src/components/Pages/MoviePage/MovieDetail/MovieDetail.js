import React, { Component } from "react";
import DetailTable from "./DetailTable";
import Snippet from "../Spinner/Spinner";
import CallApi from "../../../../api/api";

export default class Detail extends Component {
  state = {
    details: [],
    loaded: false
  };

  componentDidMount() {
    this.updateDetails();
  }

  getDetails = data => {
    this.setState(() => ({
      details: data,
      loaded: false
    }));
  };

  updateDetails = () => {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: { language: "en-US" }
    }).then(data => {
      this.getDetails(data);
    });
  };

  render() {
    const { details, loaded } = this.state;
    const snippet = loaded ? <Snippet /> : null;
    const detailsList = !loaded ? <DetailTable details={details} /> : null;
    return (
      <div>
        {snippet}
        {detailsList}
      </div>
    );
  }
}
