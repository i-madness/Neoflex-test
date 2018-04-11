package space.vromanov.filmcollection.ws

import com.fasterxml.jackson.annotation.JsonInclude
import space.vromanov.filmcollection.data.Film

/**
 * Outgoing web socket message to client
 */
data class WsServerMessage(
    val code: Int,
    val message: String?
) {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    var entry: Film? = null

    @JsonInclude(JsonInclude.Include.NON_NULL)
    var entryId: Long? = null

    @JsonInclude(JsonInclude.Include.NON_NULL)
    var filmEntries: MutableIterable<Film>? = null

    constructor(code: Int) : this(code, null)

    constructor(code: Int, entry: Film) : this(code) {
        this.entry = entry
    }

    constructor(code: Int, entryId: Long) : this(code) {
        this.entryId = entryId
    }

    constructor(code: Int, filmEntries: MutableIterable<Film>) : this(code) {
        this.filmEntries = filmEntries
    }
}