import FilmEntryAction, * as FilmEntryActions from './film-entry-actions';
import { FilmEntry } from '../data/table-entry';

interface State {
  connected: boolean;
  filmEntries: Array<FilmEntry>;
  fetchInProgress: boolean;
  fetchFailure?: any;
}

// Since root reducer has this reducer's value as {entryState: datatableReducer ...} we use this wrapper
// as a state type in other modules
export interface WrappedState {
  entryState: State
}

const initialState: State = {
  connected: false,
  filmEntries: [],
  fetchInProgress: false,
  fetchFailure: null
};

export default function datatableReducer(state: State = initialState, action: FilmEntryAction): State {
  switch (action.type) {
    // ============ Web Socket connection actions ============
    case FilmEntryActions.ENDPOINT_CONNECTING:
      return {
        ...state,
        connected: true,

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
        fetchInProgress: false,
        fetchFailure: null,
        filmEntries: action.payload
      };
    case FilmEntryActions.ENTRY_FETCH_FAILURE:
      return {
        ...state,
        fetchInProgress: false,
        fetchFailure: action.payload
      };
    default:
      return state;
  }
  
}