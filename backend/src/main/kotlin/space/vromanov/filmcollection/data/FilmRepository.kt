package space.vromanov.filmcollection.data

import org.springframework.data.repository.CrudRepository

/**
 * Repository bean for all persistence operations for Film entity.
 */
interface FilmRepository : CrudRepository<Film, Long> {

}