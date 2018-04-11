import { combineReducers } from 'redux';
import filmEntryReducer from './film-entry-reducer';

export default combineReducers({ entryState: filmEntryReducer });