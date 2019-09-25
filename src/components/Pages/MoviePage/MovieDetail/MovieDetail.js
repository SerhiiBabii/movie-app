import React, { Component } from "react";
import CallApi from "../../../../api/api";
import Snippet from "../Spinner/Spinner";
import DetailTable from "./DetailTable";
// import { Col, Table } from "reactstrap";

export default class Detail extends Component {
  state = {
    details: [],
    loaded: false
  };

  componentDidMount() {
    this.updateDetails();
    // setTimeout(() => {
    //   this.updateDetails();
    // }, 2000);
  }

  getDetails = data => {
    this.setState(() => ({
      details: data,
      loaded: false
    }));
  };

  updateDetails = () => {
    CallApi.get(`/movie/${this.props.match.params.id}`, {
      params: { language: "ru-RU" }
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

// const ViewDetails = ({ data }) => {
//   return (

//   );
// };
