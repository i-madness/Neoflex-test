package space.vromanov.filmcollection.ws

import space.vromanov.filmcollection.data.Genre

/**
 * Object stored in JSON form inside text info.
 */
class WsClientMessage{
    lateinit var action: MessageAction
    var payload: String = Genre.NONE.name
        set(value) {
            if (value.isNotEmpty()) {
                field = value
            }
        }
}