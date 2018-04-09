package space.vromanov.musiclist.data

import javax.persistence.*

@Entity
@Table(name = "song")
class Song {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = -1

    @Column(name = "s_name")
    lateinit var name: String

    @Column(name = "s_performer")
    lateinit var performer: String

    @Column(name = "s_is_listened")
    var isListened: Boolean = false

    @Column(name = "s_genre")
    @Enumerated(value = EnumType.STRING)
    var genre: Genre = Genre.NONE
}