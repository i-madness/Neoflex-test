import { FilmEntry } from '../data/table-entry'

export const fetchAll = () => JSON.stringify({ action: 'FETCH_ALL' });
export const addEntry = (payload: FilmEntry) => JSON.stringify({ action: 'ADD', payload });
export const modifyEntry = (payload: FilmEntry) => JSON.stringify({ action: 'MODIFY', payload });
export const deleteEntry = (payload: number) => JSON.stringify({ action: 'DELETE', payload });