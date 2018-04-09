package space.vromanov.musiclist.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import space.vromanov.musiclist.data.SongService

@Controller
class BaseController(@Autowired val songService: SongService) {
    @GetMapping("/")
    public fun index() = "index.html"

    @GetMapping("/songs/all")
    @ResponseBody
    public fun allSongs() = songService.getAllSongs()
}