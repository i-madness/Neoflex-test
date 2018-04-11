export enum FilmGenre {
  NONE,
  FANTASY,
  COMEDY,
  DRAMA,
  SCI_FI,
  HORROR
}

/**
 * Describes single entry of datatable. Also this format is used in API response
 */
export interface FilmEntry {
  id: number;
  name: string;
  description: string; // -> textarea
  grade: number;
  isWatched: boolean;  // -> checkbox
  releaseDate: number; // unix time value -> datepicker
  timeLength: number;  // minutes; might be switched to differrent duration
  genre: FilmGenre; // -> choose from dropdown
}