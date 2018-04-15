package space.vromanov.filmcollection.ws

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import space.vromanov.filmcollection.data.FilmService

/**
 * Bean that handles all webs socket messages for film entries.
 */
@Component
class FilmWebSocketHandler(
    @Autowired private val filmService: FilmService,
    @Autowired private val objectMapper: ObjectMapper
): TextWebSocketHandler() {
    companion object {
        val LOGGER = LoggerFactory.getLogger(FilmWebSocketHandler::class.java)!!
    }

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
                WsServerMessage(WebSocketRouteHelper.INVALID_MESSAGE_FORMAT, "Invalid info format:\n${e.message}"))))
        } catch (e: Exception) {
            session.sendMessage(TextMessage(objectMapper.writeValueAsString(
                WsServerMessage(WebSocketRouteHelper.UNKNOWN_ERROR, "Unknown error:\n${e.message}"))))
        }
    }

    override fun afterConnectionEstablished(session: WebSocketSession) {
        LOGGER.info("Established web socket connection [session id: ${session.id}]")
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        LOGGER.info("Closed web socket connection [session id: ${session.id}]")
    }
}