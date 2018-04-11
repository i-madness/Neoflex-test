package space.vromanov.filmcollection.controllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class BaseController {
    @GetMapping("/a")
    public fun index() = "index.html"
}