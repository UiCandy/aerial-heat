import { createSelector } from 'reselect';

const countriesSelector = state => state.countries;

const filter = () => {
    console.log(countriesSelector);
};
export default createSelector(
    countriesSelector,
    filter
);
