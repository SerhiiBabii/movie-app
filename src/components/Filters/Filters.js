import React from "react";
import FilterSelect from "./FilterSelect";
import Checkbox from "./Checkbox";
import PageButtons from "./PageButtons";

export default class Filters extends React.Component {
  state = {
    filterItems: [
      { id: 1, title: "Популярные по убыванию", value: "popularity.desc" },
      { id: 2, title: "Популярные по возростанию", value: "popularity.asc" },
      { id: 3, title: "Рейтинг по убыванию", value: "vote_average.desc" },
      { id: 4, title: "Рейтинг по возростанию", value: "vote_average.asc" }
    ],
    filterYear: [
      { id: 1, title: 2019, value: 2019 },
      { id: 2, title: 2018, value: 2018 },
      { id: 3, title: 2017, value: 2017 },
      { id: 4, title: 2016, value: 2016 }
    ]
  };
  render() {
    const {
      filters: { sort_by, year },
      page,
      total_pages,
      genres,
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
          handleSelect={handleSelect}
          filterItems={filterItems}
        />
        <FilterSelect
          name="year"
          id="year"
          value={year}
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
        <Checkbox genres={genres} addGenre={addGenre} />
      </form>
    );
  }
}
