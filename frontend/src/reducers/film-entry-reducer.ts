import FilmEntryAction, * as FilmEntryActions from './film-entry-actions';
import { findIndex } from 'lodash';
import { FilmEntry } from '../data/table-entry';

interface State {
  connected: boolean;
  filmEntries: Array<FilmEntry>;
  fetchFailure?: any;
  entryCreationFailure?: any;
  entryModificationFailure?: any;
  entryDeleteFailure?: any;
}

// Since root reducer uses this reducer's state as { entryState: datatableReducer ...} we use this wrapper
// as a state type in other modules when we need to
export interface WrappedState {
  entryState: State;
}

const initialState: State = {
  connected: false,
  filmEntries: [],
  fetchFailure: null,
  entryCreationFailure: null,
  entryModificationFailure: null,
  entryDeleteFailure: null
};

export default function datatableReducer(state: State = initialState, action: FilmEntryAction): State {
  switch (action.type) {
    // ============ Web Socket connection actions ============
    case FilmEntryActions.ENDPOINT_CONNECTING:
      return {
        ...state,
        connected: true
      };
    case FilmEntryActions.ENDPOINT_DISCONNECT:
      return {
        ...state,
        connected: false
      };
    // ================= Film entry actions ==================
    case FilmEntryActions.ENTRY_FETCH_SUCCESS:
      return {
        ...state,
        fetchFailure: null,
        filmEntries: action.payload
      };
    case FilmEntryActions.ENTRY_FETCH_FAILURE:
      return {
        ...state,
        fetchFailure: action.payload
      };
    // Create
    case FilmEntryActions.ENTRY_CREATE_SUCCESS:
      return {
        ...state,
        filmEntries: [...state.filmEntries, action.payload],
        entryCreationFailure: null
      };
    case FilmEntryActions.ENTRY_CREATE_FAILURE:
      return {
        ...state,
        entryCreationFailure: action.payload
      };
    // Modify
    case FilmEntryActions.ENTRY_MODIFY_SUCCESS:
      let entries = state.filmEntries;
      let index = findIndex(entries, e => e.id === action.payload.id);
      return {
        ...state,
        filmEntries: [...entries.slice(0, index), action.payload, ...entries.slice(index + 1)]
      };
    case FilmEntryActions.ENTRY_MODIFY_FAILURE:
      return {
        ...state,
        entryModificationFailure: action.payload
      };
    // Delete
    case FilmEntryActions.ENTRY_DELETE_SUCCESS:
      return {
        ...state,
        filmEntries: state.filmEntries.filter(e => e.id !== action.payload)
      };
    case FilmEntryActions.ENTRY_DELETE_FAILURE:
      return {
        ...state,
        entryDeleteFailure: action.payload
      };
    default:
      return state;
  }
}
