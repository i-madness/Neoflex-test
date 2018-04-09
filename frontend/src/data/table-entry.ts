export enum FilmGenre {
  FANTASY,
  ROMANCE,
  COMEDY,
  HORROR
}

/**
 * Describes single entry of datatable. Also this format is used in API response
 */
export interface FilmEntry {
  filmName: string;
  releaseDate: number; // unix
  grade: number;
  watched: boolean;
}