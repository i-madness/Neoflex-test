/*
 Values that are going to be inserted to Film table when application is started.
*/
INSERT INTO film (id, f_name, f_descr, f_release_date, f_is_watched, f_time_length, f_genre, f_grade) VALUES
  (1, 'film1', 'There was a time...', parsedatetime('26-11-2007', 'dd-MM-yyyy'), TRUE, 95, 'COMEDY', 8),
  (2, 'film2', 'Sample description', parsedatetime('13-06-2014', 'dd-MM-yyyy'), FALSE, 121, 'DRAMA', 7),
  (3, 'film3', 'Lorem ipsum dolor sit amet', parsedatetime('30-09-2010', 'dd-MM-yyyy'), TRUE, 85, 'HORROR', 10)
;