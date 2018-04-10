import { createStore, applyMiddleware, Middleware, Store } from 'redux';
import * as FilmEntryActions from '../reducers/film-entry/actions';

const webSocketInstance = new WebSocket(`ws://${window.location.host}/wsapi`);

const onMessage = (ws: WebSocket, store: Store<any>) => event => {
  
};

const webSocketMiddleware: Middleware = store => next => action => {
  switch (action.type) {
    case FilmEntryActions.ENTRY_FETCH_REQUEST:

    default:
      return next(action)
  }
};

export default webSocketMiddleware;