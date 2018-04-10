package space.vromanov.musiclist.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class BaseController {
    @GetMapping("/")
    public fun index() = "index.html"
}