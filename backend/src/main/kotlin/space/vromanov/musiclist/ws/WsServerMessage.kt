package space.vromanov.musiclist.ws

import com.fasterxml.jackson.annotation.JsonInclude
import space.vromanov.musiclist.data.Film

/**
 * Outgoing web socket message to client
 */
data class WsServerMessage(
    val code: Int,
    val message: String?
) {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    var filmEntries: MutableIterable<Film>? = null

    constructor(code: Int) : this(code, null)

    constructor(code: Int, filmEntries: MutableIterable<Film>) : this(code) {
        this.filmEntries = filmEntries
    }
}