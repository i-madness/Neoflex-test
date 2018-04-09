/* import { DatatableAction, actionTypes } from './actions'*/
import { FilmEntry } from '../data/table-entry';

interface State {
  tableEntries: Array<FilmEntry>;
  fetchInProgress: boolean;
  fetchFailure?: any;
}

export default function datatableReducer(state: State = {
  tableEntries: [],
  fetchInProgress: false,
  fetchFailure: null
}) {
  return state;
}