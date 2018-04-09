package space.vromanov.musiclist.data

import org.springframework.data.repository.CrudRepository

interface SongRepository : CrudRepository<Song, Long> {
}