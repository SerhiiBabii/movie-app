import React from "react";
import FilterItem from "./FilterItem";

const FilterSelect = ({ name, id, value, handleSelect, filterItems }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>Сортировать по:</label>
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
