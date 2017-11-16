import { Observable } from 'rxjs/Observable';
import { slugify, regExp } from './helpers';

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';
export const GET_FILTERED_LIST = 'GET_FILTERED_LIST';

export function getDataRequested(url, country) {
  return {
    type: GET_DATA_REQUESTED,
    url,
    country
  };
}

export function getDataDone(data, country) {
  let selector;
  if(data.main){
    data = [data.main];
  }
  if (data.states) {
    const slug = slugify(country).split('-');
    data = data.states.filter(flight => regExp(slug).test(flight[2]));
    selector = 'flights';
  }
  else if (data[0].capital) {
    selector = 'countries';
  }
  else {
    selector = 'weather';
  }
  return {
    type: GET_DATA_DONE,
    payload: data,
    selector
  };
}

export function getDataFailed(error) {
  return {
    type: GET_DATA_FAILED,
    payload: error
  };
}

export function getFilteredList(filter) {
  return {
    type: GET_FILTERED_LIST,
    filter
  }
}

const fetchData = (url) => {
  const request = fetch(url)
    .then(response => response.json());
  return Observable.from(request);
};

export function getDataEpic(action$) {
  return action$.ofType(GET_DATA_REQUESTED)
    .mergeMap(({url, country}) =>
      fetchData(url)
        .map(response => getDataDone(response, country))
        .catch(error => getDataFailed(error))
    );
}

