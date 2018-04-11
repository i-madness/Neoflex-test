import { FilmEntry } from '../data/table-entry'

export const fetchAll = () => JSON.stringify({ action: 'FETCH_ALL' });

export const addEntry = (payload: FilmEntry) => {
  delete payload.id;
  return JSON.stringify({ action: 'ADD', payload: JSON.stringify(payload) });
}

export const modifyEntry = (payload: FilmEntry) => JSON.stringify({ action: 'MODIFY', payload: JSON.stringify(payload) });

export const deleteEntry = (payload: number) => JSON.stringify({ action: 'DELETE', payload });