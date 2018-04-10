package space.vromanov.musiclist.ws

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import space.vromanov.musiclist.data.FilmService

/**
 * Bean that handles all webs socket messages for film entries.
 */
@Component
class FilmWebsocketHandler(
    @Autowired private val filmService: FilmService,
    @Autowired private val objectMapper: ObjectMapper
): TextWebSocketHandler() {

    /**
     * Contains all web socket messaging logic connected with actions with film object.
     */
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        try {
            val msg = objectMapper.readValue<WsClientMessage>(message.payload)
            val routeHelper = WebSocketRouteHelper(session, msg, filmService, objectMapper)
            when (msg.action) {
                MessageAction.FETCH_ALL -> routeHelper.processFetchAllMessage()
                MessageAction.ADD       -> routeHelper.processAddFilmMessage()
                MessageAction.MODIFY    -> routeHelper.processModifyFilmMessage()
                MessageAction.DELETE    -> routeHelper.processDeleteFilmMessage()
            }
        } catch (e: JsonProcessingException) {
            session.sendMessage(TextMessage(objectMapper.writeValueAsString(
                WsServerMessage(WebSocketRouteHelper.INVALID_MESSAGE_FORMAT, "Invalid message format:\n${e.message}"))))
        } catch (e: Exception) {
            session.sendMessage(TextMessage(objectMapper.writeValueAsString(
                WsServerMessage(WebSocketRouteHelper.UNKNOWN_ERROR, "Unknown error:\n${e.message}"))))
        }
    }
}