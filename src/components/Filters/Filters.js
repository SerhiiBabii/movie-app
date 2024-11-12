import React from "react";
import FilterSelect from "./FilterSelect";
import Genres from "./Genres";
import PageButtons from "./PageButtons";
import { FILTER_YEARS } from "../../constants/filters";

export default class Filters extends React.Component {

  state = {
    filterItems: [
      { id: 1, title: "Popular in descending order", value: "popularity.desc" },
      { id: 2, title: "Popular ascending", value: "popularity.asc" },
      { id: 3, title: "Rating in descending order", value: "vote_average.desc" },
      { id: 4, title: "Rating ascending", value: "vote_average.asc" }
    ],
    filterYear: FILTER_YEARS
  };

  render() {
    const {
      filters,
      filters: { sort_by, year },
      page,
      total_pages,
      handleSelect,
      changePage,
      resetFilters,
      addGenre
    } = this.props;
    const { filterItems, filterYear } = this.state;
    return (
      <form className="mb-3">
        <FilterSelect
          name="sort_by"
          id="sort_by"
          value={sort_by}
          filterName="order"
          handleSelect={handleSelect}
          filterItems={filterItems}
        />
        <FilterSelect
          name="year"
          id="year"
          value={year}
          filterName="year"
          handleSelect={handleSelect}
          filterItems={filterYear}
        />
        <PageButtons
          page={page}
          total_pages={total_pages}
          changePage={changePage}
        />
        <button
          type="button"
          className="btn btn-secondary col-12"
          onClick={resetFilters}
        >
          Reset filters
        </button>
        <Genres filters={filters} addGenre={addGenre} />
      </form>
    );
  }
}
