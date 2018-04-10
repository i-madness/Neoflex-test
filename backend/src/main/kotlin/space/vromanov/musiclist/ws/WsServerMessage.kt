package space.vromanov.musiclist.ws

/**
 * Outgoing web socket message to client
 */
data class WsServerMessage(
    val code: Int,
    val message: String
) {}