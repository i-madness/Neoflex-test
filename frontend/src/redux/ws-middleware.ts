import { Middleware, MiddlewareAPI } from 'redux';
import * as FilmEntryActions from '../reducers/film-entry-actions';
import * as WebSocketStatusCodes from './ws-server-codes';
import * as WebSocketClientActions from './ws-client.actions'

let webSocketInstance: WebSocket

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
      store.dispatch({ type: FilmEntryActions.ENTRY_CREATE_SUCCESS });
      break;
    case WebSocketStatusCodes.FILM_ADD_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_CREATE_FAILURE, payload: message.message });
      break;
    // Update
    case WebSocketStatusCodes.FILM_MODIFY_SUCCESS:
      store.dispatch({ type: FilmEntryActions.ENTRY_MODIFY_SUCCESS });
      break;
    case WebSocketStatusCodes.FILM_MODIFY_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_MODIFY_FAILURE, payload: message.message });
      break;
    // Delete
    case WebSocketStatusCodes.FILM_DELETE_SUCCESS:
      store.dispatch({ type: FilmEntryActions.ENTRY_DELETE_SUCCESS });
      break;
    case WebSocketStatusCodes.FILM_DELETE_FAILURE:
      store.dispatch({ type: FilmEntryActions.ENTRY_DELETE_FAILURE, payload: message.message });
      break;
    default:
  }
};

const webSocketMiddleware: Middleware = store => next => action => {
  switch (action.type) {
    case FilmEntryActions.ENDPOINT_CONNECT:
      console.log('Connecting to WebSocket...');
      store.dispatch({ type: FilmEntryActions.ENDPOINT_CONNECTING });
      if (!webSocketInstance) {
        webSocketInstance = new WebSocket(`ws://${window.location.host}/wsapi`);
      } 
      webSocketInstance.onmessage = onMessage(store);
      webSocketInstance.onopen = onOpen;
      break;
    case FilmEntryActions.ENDPOINT_DISCONNECT:
      console.log('Disconnecting from WebSocket...');
      store.dispatch({ type: FilmEntryActions.ENDPOINT_DISCONNECTING });
      webSocketInstance.close();
      break;
    default:
  }
  return next(action);
};

export default webSocketMiddleware;