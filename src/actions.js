import { ajax } from 'rxjs/observable/dom/ajax';

export const GET_DATA_REQUESTED = 'GET_DATA_REQUESTED';
export const GET_DATA_DONE = 'GET_DATA_DONE';
export const GET_DATA_FAILED = 'GET_DATA_FAILED';

export function getDataRequested(url) {
  return {
    type: 'GET_DATA_REQUESTED',
    url
  };
}

export function getDataDone(data) {
  if(data.states){
    data = data.states.filter(flight => flight[2] == 'Argentina');
  }
  return {
    type: 'GET_DATA_DONE',
    payload: data
  };
}

export function getDataFailed(error) {
  return {
    type: 'GET_DATA_FAILED',
    payload: error
  };
}

export function getDataEpic(action$) {
  return action$.ofType(GET_DATA_REQUESTED)
    .mergeMap(action =>
      ajax.getJSON(action.url)
        .map(response => getDataDone(response))
        .catch(error => getDataFailed(error))
    );
}

