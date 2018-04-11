package space.vromanov.filmcollection.data

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Provides all CRUD operations for Film entity
 */
@Service
class FilmService(@Autowired private val filmRepository: FilmRepository) {
    public fun addFilm(film: Film): Film {
        return filmRepository.save(film)
    }

    public fun getAllFilms(): MutableIterable<Film> {
        return filmRepository.findAll()
    }

    public fun getFilmById(id: Long): Film? {
        return filmRepository.findById(id).orElse(null)
    }

    public fun updateFilm(film: Film): Film? {
        val dbFilmOptional = filmRepository.findById(film.id)
        if (dbFilmOptional.isPresent) {
            val dbFilm = dbFilmOptional.get()
            dbFilm.name = film.name
            dbFilm.description = film.description
            dbFilm.isWatched = film.isWatched
            dbFilm.releaseDate = film.releaseDate
            dbFilm.setGenres(film.getGenres())
            return filmRepository.save(dbFilm)
        }
        return null
    }

    public fun deleteFilm(id: Long) {
        filmRepository.deleteById(id)
    }
}