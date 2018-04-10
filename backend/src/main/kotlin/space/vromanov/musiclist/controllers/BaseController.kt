package space.vromanov.musiclist.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import space.vromanov.musiclist.data.FilmService

@Controller
class BaseController(@Autowired val filmService: FilmService) {
    @GetMapping("/")
    public fun index() = "index.html"

    @GetMapping("/films/all")
    @ResponseBody
    public fun allFilms() = filmService.getAllFilms()
}