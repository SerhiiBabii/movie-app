export function getFilterYear(startYear, endYear) {
  const filterYear = [];

  for (let i = startYear; i <= endYear; i++) {
    filterYear.push({ id: i, title: i, value: i });
  }

  return filterYear;
}