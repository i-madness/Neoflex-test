package space.vromanov.musiclist.ws

data class WsMessage(
   val action: MessageAction,
   val payload: String
) {}