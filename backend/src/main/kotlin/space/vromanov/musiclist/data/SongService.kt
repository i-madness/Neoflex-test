package space.vromanov.musiclist.data

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Provides all CRUD operations for Song entity
 */
@Service
class SongService(@Autowired private val songRepository: SongRepository) {
    public fun addSong(song: Song): Song {
        return songRepository.save(song)
    }

    public fun getAllSongs(): MutableIterable<Song> {
        return songRepository.findAll()
    }

    public fun getSongById(id: Long): Song? {
        return songRepository.findById(id).orElse(null)
    }

    public fun updateSong(song: Song): Song? {
        val dbSongOptional = songRepository.findById(song.id)
        if (dbSongOptional.isPresent) {
            val dbSong = dbSongOptional.get()
            dbSong.performer = song.performer
            dbSong.name = song.name
            dbSong.isListened = song.isListened
            dbSong.genre = song.genre
            return songRepository.save(dbSong)
        }
        return null
    }

    public fun deleteSong(id: Long) {
        songRepository.deleteById(id)
    }
}