package space.vromanov.musiclist

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MusicListApplication

fun main(args: Array<String>) {
    runApplication<MusicListApplication>(*args)
}
