import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import webSocketMiddleware from './ws-middleware';

export default createStore(rootReducer, applyMiddleware(webSocketMiddleware));