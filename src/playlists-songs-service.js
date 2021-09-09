const { Pool } = require('pg');

const { mapSongsTableToModel } = require('./playlists-songs-model');

class PlaylistService {
  constructor() {
    this.pool = new Pool();
  }

  async getSongsFromPlaylists(playlistId) {
    const result = await this.pool.query({
      text: `SELECT songs.id as id, songs.title as title, songs.performer as performer
      FROM playlists_songs
      JOIN songs ON songs.id = playlists_songs.song_id
      WHERE playlists_songs.playlist_id = $1`,
      values: [playlistId],
    });

    return result.rows.map(mapSongsTableToModel);
  }
}

module.exports = PlaylistService;
