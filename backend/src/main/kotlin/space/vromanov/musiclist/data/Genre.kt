package space.vromanov.musiclist.data

/**
 * Lists all genres film could possibly have.
 * TODO (It also could have been an another table...)
 */
enum class Genre(val displayName: String) {
    NONE("-"),
    FANTASY("fantasy"),
    COMEDY("comedy"),
    DRAMA("drama"),
    SCI_FI("science fiction"),
    HORROR("horror")
}