package space.vromanov.musiclist.ws

/**
 * Object stored in JSON form inside text message.
 */
data class WsMessage(
   val action: MessageAction,
   val payload: String
) {}