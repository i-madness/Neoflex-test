export interface DatatableAction {
  payload: any;
  type: string;
}

export const actionTypes = {
  DATA_FETCH_REQUEST: 'DATA_FETCH_REQUEST',
  DATA_FETCH_SUCCESS: 'DATA_FETCH_SUCCESS',
  DATA_FETCH_FAILURE: 'DATA_FETCH_FAILURE'
};

export function createAction(payload: any, type: string): DatatableAction {
  return {
    payload,
    type
  };
}