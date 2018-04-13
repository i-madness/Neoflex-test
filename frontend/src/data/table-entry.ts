/**
 * Describes single entry of datatable. Also this format is used in API response
 */
export interface FilmEntry {
  id: number;
  name: string;
  description: string; // -> textarea
  grade: number;
  watched: boolean; // -> checkbox
  releaseDate: number; // unix time value -> datepicker
  timeLength: number; // minutes; might be switched to differrent duration
  genre: string; // -> choose from dropdown
}
