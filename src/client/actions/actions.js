import SpotifyClient from "client/api/spotify";
import keyMirror from "client/key_mirror";

const client = SpotifyClient.get();

const types = keyMirror({
  NEW_RELEASES: {
    SUCCESS: null
  },

  ALBUMS: {
    FETCH_SUCCESS: null
  },

  NAVIGATION: {
    SHOW: null
  }
});

const c = types;

async function getFullAlbumDetails(albumIds) {
  const data = await client.get(`/albums?ids=${albumIds}`);
  return data.albums;
}

const methods = {
  newReleases: {
    async get() {
      let data = await client.get("/browse/new-releases?country=US"),
          page = 1;

      let albumIds = data.albums.items.map((album) => album.id);
      data.albums.items = await getFullAlbumDetails(albumIds);

      this.dispatch(c.NEW_RELEASES.SUCCESS, {releases: data});

      while (data.albums.next && page < 1) {
        page++;
        data = await client.get(data.albums.next);
        albumIds = data.albums.items.map((album) => album.id);
        data.albums.items = await getFullAlbumDetails(albumIds);
        this.dispatch(c.NEW_RELEASES.SUCCESS, {releases: data});
      }
    }
  },

  albums: {
    async get(albumId) {
      const data = await client.get(`/albums/${albumId}`);
      this.dispatch(c.ALBUMS.FETCH_SUCCESS, {album: data});
    }
  },

  navigation: {
    showNewReleases() {
      this.dispatch(c.NAVIGATION.SHOW, {type: 'new-releases'});
    },

    showAlbum(albumId) {
      this.dispatch(c.NAVIGATION.SHOW, {type: 'album', id: albumId});
    },

    showArtist(artistId) {
      this.dispatch(c.NAVIGATION.SHOW, {type: 'artist', id: artistId});
    }
  }
};

export { types as types, methods as methods };
