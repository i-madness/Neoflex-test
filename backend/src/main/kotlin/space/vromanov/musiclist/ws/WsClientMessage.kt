package space.vromanov.musiclist.ws

/**
 * Object stored in JSON form inside text message.
 */
data class WsClientMessage(
   val action: MessageAction,
   val payload: String
) {}