package space.vromanov.filmcollection.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import space.vromanov.filmcollection.data.Film
import space.vromanov.filmcollection.data.FilmService
import space.vromanov.filmcollection.data.Genre
import java.util.*

@RestController
@RequestMapping("/api")
class FilmEntryApiController(@Autowired val filmService: FilmService) {
    @GetMapping("/films/all")
    public fun allFilms() = filmService.getAllFilms()

    @GetMapping("/genres")
    public fun allGenres() = Genre.values().map { it.displayName }

    @GetMapping("/genres/find")
    public fun findGenres(@RequestParam searchStr: String) = Genre.values()
        .filter { it.displayName.contains(searchStr.toLowerCase()) || it.name.contains(searchStr.toLowerCase()) }
        .map { it.displayName }

    @PutMapping("/films/rnd")
    public fun createRandomFilm() {
        val film = Film()
        film.setGenres(listOf(Genre.DRAMA, Genre.COMEDY))
        film.name = UUID.randomUUID().toString()
        film.releaseDate = Date()
        film.timeLength = Random().nextInt()
        film.description = UUID.randomUUID().toString()
        filmService.addFilm(film)
    }
}