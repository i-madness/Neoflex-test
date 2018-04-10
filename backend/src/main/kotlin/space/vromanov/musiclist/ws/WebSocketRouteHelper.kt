package space.vromanov.musiclist.ws

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import org.slf4j.LoggerFactory
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import space.vromanov.musiclist.data.Film
import space.vromanov.musiclist.data.FilmService

/**
 * A wrapper to message processing business logic. It helps to resolve logic "routes" i.e.
 * react with certain behaviour on certain action type of client message.
 */
data class WebSocketRouteHelper(private val session: WebSocketSession, private val message: WsClientMessage,
                                private val filmService: FilmService, private val objectMapper: ObjectMapper) {
    companion object {
        val LOGGER = LoggerFactory.getLogger(WebSocketRouteHelper::class.java)!!

        // Success codes for outgoing message:
        val ALL_ENTRIES_FETCH_SUCCESS = 100
        val FILM_ADD_SUCCESS = 101
        val FILM_MODIFY_SUCCESS = 102
        val FILM_DELETE_SUCCESS = 103
        // Failure codes for outgoing message:
        val ALL_ENTRIES_FETCH_FAILURE = 200
        val FILM_NOT_FOUND = 201
        val FILM_ADD_FAILURE = 202
        val FILM_MODIFY_FAILURE = 203
        val FILM_DELETE_FAILURE = 204
        val INVALID_MESSAGE_FORMAT = 298
        val UNKNOWN_ERROR = 299
    }

    fun processFetchAllMessage() {
        try {
            val allFilms = filmService.getAllFilms()
            LOGGER.info("Fetched ${allFilms.count()} film entries")
            sendEntriesMessage(ALL_ENTRIES_FETCH_SUCCESS, allFilms)
        } catch (e: JsonProcessingException) {
            LOGGER.error("Invalid message format", e)
            sendMessage(INVALID_MESSAGE_FORMAT, "Invalid message format:\n${e.message}")
        } catch (e: Exception) {
            sendMessage(ALL_ENTRIES_FETCH_FAILURE, e.message)
        }
    }

    fun processAddFilmMessage() {
        try {
            val film = filmService.addFilm(readFilmObject(message))
            LOGGER.info("Film [${film.name}] added to database")
            sendMessage(FILM_ADD_SUCCESS)
        } catch (e: JsonProcessingException) {
            LOGGER.error("Invalid message format", e)
            sendMessage(INVALID_MESSAGE_FORMAT, "Invalid message format:\n${e.message}")
        } catch (e: Exception) {
            LOGGER.error("Error during film adding execution", e)
            sendMessage(FILM_ADD_FAILURE, e.message)
        }
    }

    fun processModifyFilmMessage() {
        try {
            val msgFilmObject = readFilmObject(message)
            val film = filmService.updateFilm(msgFilmObject)
            if (film == null) {
                LOGGER.error("Film [${msgFilmObject.name}] not found")
                sendMessage(FILM_NOT_FOUND, "Film ${msgFilmObject.name} not found")
            } else {
                LOGGER.info("Film [${film.name}] updated")
                sendMessage(FILM_MODIFY_SUCCESS)
            }
        } catch (e: JsonProcessingException) {
            LOGGER.error("Invalid message format", e)
            sendMessage(INVALID_MESSAGE_FORMAT, "Invalid message format:\n${e.message}")
        } catch (e: Exception) {
            LOGGER.error("Error during film modification execution", e)
            sendMessage(FILM_MODIFY_FAILURE, e.message)
        }
    }

    fun processDeleteFilmMessage() {
        try {
            val filmId = message.payload.toLongOrNull(10)
            if (filmId != null) {
                filmService.deleteFilm(filmId)
                LOGGER.info("Film [id=$filmId] deleted")
                sendMessage(FILM_DELETE_SUCCESS)
            } else {
                LOGGER.error("Can't parse film entry's ID to remove: ${message.payload}")
                sendMessage(INVALID_MESSAGE_FORMAT, "Can't parse film entry's ID to remove: ${message.payload}")
            }
        } catch (e: JsonProcessingException) {
            LOGGER.error("Invalid message format", e)
            sendMessage(INVALID_MESSAGE_FORMAT, "Invalid message format:\n${e.message}")
        } catch (e: Exception) {
            LOGGER.error("Error during film modification execution", e)
            sendMessage(FILM_DELETE_FAILURE, e.message)
        }
    }

    /**
     * A tiny shortcut to session.sendMessage(TextMessage(string))
     */
    private fun send(msg: String) = session.sendMessage(TextMessage(msg))

    /**
     * Sends JSON message to client
     */
    private fun sendMessage(code: Int, message: String?) = send(objectMapper.writeValueAsString(WsServerMessage(code, message)))

    /**
     * Sends JSON message to client (just code)
     */
    private fun sendMessage(code: Int) = send(objectMapper.writeValueAsString(WsServerMessage(code)))

    /**
     * Sends JSON message containing collection of Film entries
     */
    private fun sendEntriesMessage(code: Int, filmEntries: MutableIterable<Film>) = send(objectMapper.writeValueAsString(WsServerMessage(code, filmEntries)))

    /**
     * Uses Jackson's ObjectMapper to retrieve film object from message's payload
     */
    private fun readFilmObject(msg: WsClientMessage): Film = objectMapper.readValue<Film>(msg.payload)

}