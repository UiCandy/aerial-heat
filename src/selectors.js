import { createSelector } from 'reselect';

const filteredList = createSelector(
    (state) => state.filterReducer.filter.toLowerCase(),
    (state) => state.dataReducer.countries,
    (filter, countries) => countries.filter(country => {
      return country.name.toLowerCase().includes(filter) ||
            country.alpha2Code.toLowerCase().includes(filter);
    })
  );

  export default filteredList;