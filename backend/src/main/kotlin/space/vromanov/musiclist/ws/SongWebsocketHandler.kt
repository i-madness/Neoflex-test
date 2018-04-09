package space.vromanov.musiclist.ws

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import space.vromanov.musiclist.data.Song
import space.vromanov.musiclist.data.SongService

@Component
class SongWebsocketHandler(
    @Autowired private val songService: SongService,
    @Autowired private val objectMapper: ObjectMapper
): TextWebSocketHandler() {
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        try {
            val msg = objectMapper.readValue<WsMessage>(message.payload)
            when (msg.action) {
                MessageAction.ADD -> {
                    val song = songService.addSong(objectMapper.readValue<Song>(msg.payload))
                    send("New song added: ${objectMapper.writeValueAsString(song)}", session)
                }
                else -> send("Not implemented yet", session)
            }
        } catch (error: JsonProcessingException) {
            send("Incorrect message format. Received message: `${message.payload}`", session)
        }
    }

    fun send(msg: String, session: WebSocketSession) {
        session.sendMessage(TextMessage(msg))
    }
}