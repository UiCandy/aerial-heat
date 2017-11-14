import { ajax } from 'rxjs/observable/dom/ajax';

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';
export const GET_FILTERED_LIST = 'GET_FILTERED_LIST';

export function getDataRequested(url) {
  return {
    type: GET_DATA_REQUESTED,
    url
  };
}

export function getDataDone(data) {
  let selector;
  if (data.states) {
    data = data.states.filter(flight => flight[2] == 'Argentina');
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

export function getDataEpic(action$) {
  return action$.ofType(GET_DATA_REQUESTED)
    .mergeMap(action =>
      ajax.getJSON(action.url)
        .map(response => getDataDone(response))
        .catch(error => getDataFailed(error))
    );
}

