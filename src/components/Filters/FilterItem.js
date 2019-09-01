import React, { Component } from "react";

export default class FilterItem extends Component {
  render() {
    const { filterItems } = this.props;
    return filterItems.map(item => (
      <option key={item.id} value={item.value}>
        {item.title}
      </option>
    ));
  }
}
