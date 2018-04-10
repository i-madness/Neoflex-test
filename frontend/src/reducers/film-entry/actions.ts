export const ENDPOINT_CONNECT = 'ENDPOINT_CONNECT';
export const ENDPOINT_DISCONNECT = 'ENDPOINT_DISCONNECT';
export const ENTRY_FETCH_REQUEST = 'ENTRY_FETCH_REQUEST';
export const ENTRY_FETCH_SUCCESS = 'ENTRY_FETCH_SUCCESS';
export const ENTRY_FETCH_FAILURE = 'ENTRY_FETCH_FAILURE';

export default interface FilmEntryAction {
  payload: any;
  type: string;
}