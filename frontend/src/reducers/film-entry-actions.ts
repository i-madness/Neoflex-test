import { Action } from 'redux'

/* Websocket connection actions */
export const ENDPOINT_CONNECT = 'ENDPOINT_CONNECT';
export const ENDPOINT_CONNECTING = 'ENDPOINT_CONNECTING';
export const ENDPOINT_DISCONNECT = 'ENDPOINT_DISCONNECT';
export const ENDPOINT_DISCONNECTING = 'ENDPOINT_DISCONNECTING';

/* Entry fetch actions */
export const ENTRY_FETCH_SUCCESS = 'ENTRY_FETCH_SUCCESS';
export const ENTRY_FETCH_FAILURE = 'ENTRY_FETCH_FAILURE';

/* Entry C-U-D actions */
export const ENTRY_CREATE_REQUEST = 'ENTRY_CREATE_REQUEST';
export const ENTRY_CREATE_SUCCESS = 'ENTRY_CREATE_SUCCESS';
export const ENTRY_CREATE_FAILURE = 'ENTRY_CREATE_FAILURE';

export const ENTRY_MODIFY_REQUEST = 'ENTRY_MODIFY_REQUEST';
export const ENTRY_MODIFY_SUCCESS = 'ENTRY_MODIFY_SUCCESS';
export const ENTRY_MODIFY_FAILURE = 'ENTRY_MODIFY_FAILURE';

export const ENTRY_DELETE_REQUEST = 'ENTRY_DELETE_REQUEST';
export const ENTRY_DELETE_SUCCESS = 'ENTRY_DELETE_SUCCESS';
export const ENTRY_DELETE_FAILURE = 'ENTRY_DELETE_FAILURE';

export default interface FilmEntryAction extends Action {
  payload?: any;
  type: string;
}