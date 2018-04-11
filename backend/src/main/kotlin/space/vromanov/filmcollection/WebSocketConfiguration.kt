package space.vromanov.filmcollection

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import space.vromanov.filmcollection.ws.FilmWebSocketHandler


@Configuration
@EnableWebSocket
class WebSocketConfiguration(@Autowired val songWebsocketHandler: FilmWebSocketHandler) : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(songWebsocketHandler, "/wsapi")
    }
}