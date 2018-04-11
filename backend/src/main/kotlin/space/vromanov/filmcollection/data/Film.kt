package space.vromanov.filmcollection.data

import java.util.*
import javax.persistence.*

/**
 * Entity representing film
 */
@Entity
@Table(name = "film")
class Film {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = -1

    @Column(name = "f_name")
    lateinit var name: String

    @Column(name = "f_descr")
    var description: String? = null

    @Column(name = "f_is_watched")
    var isWatched: Boolean = false

    @Column(name = "f_release_date")
    lateinit var releaseDate: Date

    @Column(name = "f_time_length")
    var timeLength: Int = 0

    @Column(name = "f_genre")
    @Enumerated(value = EnumType.STRING)
    var genre: Genre = Genre.NONE

    // For reasons of time economy we'll leave only one genre for film
    /*fun getGenres(): List<Genre> {
        return genres.split(",").map { Genre.valueOf(it) }
    }

    fun setGenres(genres: List<Genre>) {
        this.genres = genres.joinToString(",")
    }*/
}