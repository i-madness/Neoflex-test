package space.vromanov.musiclist.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import space.vromanov.musiclist.data.FilmService
import space.vromanov.musiclist.data.Genre

@RestController
@RequestMapping("/films")
class FilmEntryController(@Autowired val filmService: FilmService) {
    @GetMapping("/all")
    public fun allFilms() = filmService.getAllFilms()

    @GetMapping("/genres")
    public fun allGenres() = Genre.values().map { it.displayName }

    @GetMapping("/findGenres")
    public fun findGenres(@RequestParam searchStr: String) = Genre.values()
        .filter { it.displayName.contains(searchStr.toLowerCase()) || it.name.contains(searchStr.toLowerCase()) }
        .map { it.displayName }
}