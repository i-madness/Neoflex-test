package space.vromanov.musiclist.ws

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler
import space.vromanov.musiclist.data.Film
import space.vromanov.musiclist.data.FilmService

/**
 * Bean that handles all webs socket messages for film entries.
 */
@Component
class FilmWebsocketHandler(
    @Autowired private val filmService: FilmService,
    @Autowired private val objectMapper: ObjectMapper
): TextWebSocketHandler() {
    companion object {
        // Success codes for outgoing message:
        val ALL_ENTRIES_FETCH_SUCCESS = 100
        val FILM_ADD_SUCCESS = 101
        val FILM_MODIFY_SUCCESS = 102
        val FILM_DELETE_SUCCESS = 103
        // Failure codes for outgoing message:
        val ALL_ENTRIES_FETCH_FAILURE = 200
        val FILM_ADD_FAILURE = 201
        val FILM_MODIFY_FAILURE = 202
        val FILM_DELETE_FAILURE = 203
    }

    /**
     * Contains all web socket messaging logic connected with actions with film object.
     * TODO make a class for outgoing messages which would be like { "code": 1|"OK"|"SUCCESS", "message": "success message" }
     */
    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) {
        try {
            val msg = objectMapper.readValue<WsClientMessage>(message.payload)
            when (msg.action) {
                MessageAction.ADD -> {
                    val film = filmService.addFilm(readFilmObject(message))
                    send("New film added: ${objectMapper.writeValueAsString(film)}", session)
                }
                MessageAction.MODIFY -> {
                    val film = filmService.updateFilm(readFilmObject(message))
                    send("Film updated: ${objectMapper.writeValueAsString(film)}", session)
                }
                MessageAction.DELETE -> {
                    val filmId = msg.payload.toLongOrNull(10)
                    if (filmId == null) {
                        send("Error: can't parse film's ID", session)
                    } else {
                        filmService.deleteFilm(filmId)
                        send("Successfully deleted film with id $filmId", session)
                    }
                }
                else -> send("Not implemented yet", session)
            }
        } catch (error: JsonProcessingException) {
            send("Incorrect message format. Received message: `${message.payload}`", session)
        } catch (error: Exception) {
            send("Error during message processing:\n$error", session)
        }
    }

    /**
     * A tiny shortcut to session.sendMessage(TextMessage(string))
     */
    fun send(msg: String, session: WebSocketSession) = session.sendMessage(TextMessage(msg))

    /**
     * Uses Jackson's ObjectMapper to retrieve film object from message's payload
     */
    fun readFilmObject(msg: TextMessage): Film = objectMapper.readValue<Film>(msg.payload)
}