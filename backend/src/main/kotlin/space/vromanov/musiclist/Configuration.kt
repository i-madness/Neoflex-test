package space.vromanov.musiclist

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.web.socket.config.annotation.EnableWebSocket
import org.springframework.web.socket.config.annotation.WebSocketConfigurer
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry
import space.vromanov.musiclist.ws.SongWebsocketHandler


@Configuration
@EnableWebSocket
class Configuration(@Autowired val songWebsocketHandler: SongWebsocketHandler) : WebSocketConfigurer {
    override fun registerWebSocketHandlers(registry: WebSocketHandlerRegistry) {
        registry.addHandler(songWebsocketHandler, "/wsapi")
    }
}