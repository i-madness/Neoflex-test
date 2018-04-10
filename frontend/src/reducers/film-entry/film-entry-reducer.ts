import FilmEntryAction, * as FilmEntryActions from './actions';
import { FilmEntry } from '../../data/table-entry';

interface State {
  connected: boolean;
  filmEntries: Array<FilmEntry>;
  fetchInProgress: boolean;
  fetchFailure?: any;
}

const initialState: State = {
  connected: false,
  filmEntries: [],
  fetchInProgress: false,
  fetchFailure: null
}

export default function datatableReducer(state: State = initialState, action: FilmEntryAction): State {
  switch (action.type) {
    // ============ Web Socket connection actions ============
    case FilmEntryActions.ENDPOINT_CONNECT:
      return {
        ...state,
        connected: true,

      }
    case FilmEntryActions.ENDPOINT_DISCONNECT:
      return {
        ...state,
        connected: false
      }
    // ================= Film entry actions ==================
    case FilmEntryActions.ENTRY_FETCH_REQUEST:
      return {
        ...state,
        fetchInProgress: true,
        fetchFailure: null
      }
    case FilmEntryActions.ENTRY_FETCH_SUCCESS:
      return {
        ...state,
        fetchInProgress: false,
        fetchFailure: null,
        filmEntries: action.payload
      }
    case FilmEntryActions.ENTRY_FETCH_FAILURE:
      return {
        ...state,
        fetchInProgress: false,
        fetchFailure: action.payload
      }
    default:
      return state;
  }
  
}