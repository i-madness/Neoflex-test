package space.vromanov.filmcollection.data

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import java.util.*
import javax.persistence.*

/**
 * Entity representing film
 */
@Entity
@Table(name = "film")
class Film {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = -1

    @Column(name = "f_name")
    lateinit var name: String

    @Column(name = "f_descr")
    var description: String? = null

    @Column(name = "f_is_watched")
    var isWatched: Boolean = false

    @Column(name = "f_release_date")
    @JsonIgnore
    lateinit var releaseDate: Date

    @Transient
    @JsonProperty("releaseDate")
    fun getReleaseDateUnix() = releaseDate.time

    @Transient
    @JsonProperty("releaseDate")
    fun setReleaseDateUnix(utc: Long) {
        this.releaseDate = Date(utc)
    }

    @Column(name = "f_time_length")
    var timeLength: Int = 0

    @Column(name = "f_genre")
    @Enumerated(value = EnumType.STRING)
    var genre: Genre = Genre.NONE

    @Column(name = "f_grade")
    var grade: Int = 1
        set(grade) {
            if (grade < 1 || grade > 10) {
                throw IllegalArgumentException("Grade can't be less than 1 or greater than 10")
            }
            field = grade
        }

    // For reasons of time economy we'll leave only one genre for film
    /*fun getGenres(): List<Genre> {
        return genres.split(",").map { Genre.valueOf(it) }
    }

    fun setGenres(genres: List<Genre>) {
        this.genres = genres.joinToString(",")
    }*/
}