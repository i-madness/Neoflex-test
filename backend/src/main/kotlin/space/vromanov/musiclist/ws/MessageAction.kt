package space.vromanov.musiclist.ws

/**
 * Defines list of possible action name which helps WebsocketHandler to figure out possible logic route for message.
 */
enum class MessageAction {
    ADD,
    MODIFY,
    DELETE
}