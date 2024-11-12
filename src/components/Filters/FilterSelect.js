import React from "react";
import FilterItem from "./FilterItem";

const FilterSelect = ({ name, id, value, filterName, handleSelect, filterItems }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>Sort by {filterName}:</label>
      <select
        name={name}
        className="form-control"
        id={id}
        value={value}
        onChange={handleSelect}
      >
        <FilterItem filterItems={filterItems} />
      </select>
    </div>
  );
};

export default FilterSelect;
