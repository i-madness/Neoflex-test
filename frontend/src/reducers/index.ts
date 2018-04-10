import { combineReducers } from 'redux';
import filmEntryReducer from './film-entry/film-entry-reducer'

export default combineReducers({ filmEntries: filmEntryReducer })