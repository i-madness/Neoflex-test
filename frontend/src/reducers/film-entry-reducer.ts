import FilmEntryAction, * as FilmEntryActions from './film-entry-actions';
import { findIndex } from 'lodash';
import { FilmEntry } from '../data/table-entry';
import ApplicationError from '../data/application-error';

interface State {
  connected: boolean;
  filmEntries: Array<FilmEntry>;
  fetchFailure?: ApplicationError;
  entryCreationFailure?: ApplicationError;
  entryModificationFailure?: ApplicationError;
  entryDeleteFailure?: ApplicationError;
  clientError?: ApplicationError;
}

// Since root reducer uses this reducer's state as { entryState: datatableReducer ...} we use this wrapper
// as a state type in other modules when we need to
export interface WrappedState {
  entryState: State;
}

const initialState: State = {
  connected: false,
  filmEntries: [],
  fetchFailure: undefined,
  entryCreationFailure: undefined,
  entryModificationFailure: undefined,
  entryDeleteFailure: undefined,
  clientError: undefined
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
        fetchFailure: undefined,
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
        entryCreationFailure: undefined
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
        filmEntries: [...entries.slice(0, index), action.payload, ...entries.slice(index + 1)],
        entryModificationFailure: undefined
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
        filmEntries: state.filmEntries.filter(e => e.id !== action.payload),
        entryDeleteFailure: undefined
      };
    case FilmEntryActions.ENTRY_DELETE_FAILURE:
      return {
        ...state,
        entryDeleteFailure: action.payload
      };
    // Different errors
    case FilmEntryActions.RAISE_CLIENT_ERROR:
      return {
        ...state,
        clientError: action.payload
      };
    default:
      return state;
  }
}
