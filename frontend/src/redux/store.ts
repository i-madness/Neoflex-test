import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import webSocketMiddleware from './ws-middleware';

// TODO: also middleware / reducers for REST API

export default createStore(rootReducer, applyMiddleware(webSocketMiddleware));
