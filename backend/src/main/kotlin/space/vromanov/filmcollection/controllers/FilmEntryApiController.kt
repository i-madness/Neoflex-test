package space.vromanov.filmcollection.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import space.vromanov.filmcollection.data.Film
import space.vromanov.filmcollection.data.FilmService
import space.vromanov.filmcollection.data.Genre
import java.util.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:3000"])
class FilmEntryApiController(@Autowired val filmService: FilmService) {
    @GetMapping("/films/all")
    public fun allFilms() = filmService.getAllFilms()

    @GetMapping("/genres/find")
    public fun findGenres(@RequestParam searchStr: String) = Genre.values()
        .filter { it.name.toLowerCase().contains(searchStr.toLowerCase()) }
        .map { it.name }

    @PutMapping("/films/rnd")
    public fun createRandomFilm() {
        val film = Film()
        val rnd = Random()
        //film.setGenres(listOf(Genre.DRAMA, Genre.COMEDY))
        film.genre = Genre.values()[rnd.nextInt(Genre.values().size-1)]
        film.name = UUID.randomUUID().toString()
        film.releaseDate = Date()
        film.timeLength = rnd.nextInt()
        film.description = UUID.randomUUID().toString()
        filmService.addFilm(film)
    }
}