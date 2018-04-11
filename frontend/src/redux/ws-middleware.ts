import { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import { isEqual } from 'lodash';
import { FilmEntry } from '../data/table-entry'
import * as FilmEntryActions from '../reducers/film-entry-actions';
import * as WebSocketStatusCodes from './ws-server-codes';
import * as WebSocketClientActions from './ws-client.actions'

let webSocketInstance: WebSocket
let webSocketUrl = process.env.NODE_ENV === 'development' ?
  'ws://localhost:8080/wsapi' : `ws://${window.location.host}/wsapi`

const onOpen = (event: any) => webSocketInstance.send(WebSocketClientActions.fetchAll());

const onMessage = (store: MiddlewareAPI<any>) => (event: any) => {
  let message = JSON.parse(event.data);
  switch (message.code) {
    // Read
    case WebSocketStatusCodes.ALL_ENTRIES_FETCH_SUCCESS:
      console.log('Fetch success:', message.filmEntries);
      store.dispatch({ type: FilmEntryActions.ENTRY_FETCH_SUCCESS, payload: message.filmEntries });
      break;
    case WebSocketStatusCodes.ALL_ENTRIES_FETCH_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_FETCH_FAILURE, payload: message.message });
      break;
    // Create
    case WebSocketStatusCodes.FILM_ADD_SUCCESS:
      store.dispatch({ type: FilmEntryActions.ENTRY_CREATE_SUCCESS, payload: message.entry });
      break;
    case WebSocketStatusCodes.FILM_ADD_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_CREATE_FAILURE, payload: message.message });
      break;
    // Update
    case WebSocketStatusCodes.FILM_MODIFY_SUCCESS:
      store.dispatch({ type: FilmEntryActions.ENTRY_MODIFY_SUCCESS, payload: message.entry });
      break;
    case WebSocketStatusCodes.FILM_MODIFY_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_MODIFY_FAILURE, payload: message.message });
      break;
    // Delete
    case WebSocketStatusCodes.FILM_DELETE_SUCCESS:
      store.dispatch({ type: FilmEntryActions.ENTRY_DELETE_SUCCESS, payload: message.entryId });
      break;
    case WebSocketStatusCodes.FILM_DELETE_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_DELETE_FAILURE, payload: message.message });
      break;
    default:
  }
};

const webSocketMiddleware: Middleware = 
    (store: MiddlewareAPI<any>) => (next: Dispatch<any>) => <A extends Action>(action: A) => {
  switch (action.type) {
    // Connections
    case FilmEntryActions.ENDPOINT_CONNECT:
      console.log('Connecting to WebSocket...');
      store.dispatch({ type: FilmEntryActions.ENDPOINT_CONNECTING });
      if (!webSocketInstance) {
        webSocketInstance = new WebSocket(webSocketUrl);
      } 
      webSocketInstance.onmessage = onMessage(store);
      webSocketInstance.onopen = onOpen;
      break;
    case FilmEntryActions.ENDPOINT_DISCONNECT:
      console.log('Disconnecting from WebSocket...');
      store.dispatch({ type: FilmEntryActions.ENDPOINT_DISCONNECTING });
      webSocketInstance.close();
      break;
    // Create
    case FilmEntryActions.ENTRY_CREATE_REQUEST:
      let createAction = <any> action;
      console.log(`Adding entry ${JSON.stringify(createAction.payload)}`)
      webSocketInstance.send(WebSocketClientActions.addEntry(createAction.payload));
      break;
    // Delete
    case FilmEntryActions.ENTRY_DELETE_REQUEST:
      let deleteAction = <any> action; // because it thinks it doesn't have payload, so... that's it
      console.log(`Deleting entry ${deleteAction.payload}`);
      webSocketInstance.send(WebSocketClientActions.deleteEntry(deleteAction.payload));
      break;
    // Modify
    case FilmEntryActions.ENTRY_MODIFY_REQUEST:
      let modifyAction = <any> action;
      let originalEntry = store.getState().entryState.filmEntries.find((e: FilmEntry) => isEqual(e.id, modifyAction.payload.id));
      if (!isEqual(originalEntry, modifyAction.payload)) {
        webSocketInstance.send(WebSocketClientActions.modifyEntry(modifyAction.payload));
      }
      break;
    default:
  }
  return next(action);
};

export default webSocketMiddleware;