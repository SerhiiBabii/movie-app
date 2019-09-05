import React from "react";

const FilterItem = ({ filterItems }) => {
  return filterItems.map(item => (
    <option key={item.id} value={item.value}>
      {item.title}
    </option>
  ));
};

export default FilterItem;
