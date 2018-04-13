import { combineReducers } from 'redux';
import filmEntryReducer from './film-entry-reducer';

// TODO: there could be reducers for something else, e.g. just web socket connections of REST API
export default combineReducers({ entryState: filmEntryReducer });
