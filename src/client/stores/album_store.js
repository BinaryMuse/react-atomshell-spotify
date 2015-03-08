import Fluxxor from "fluxxor";
import { types as c } from "client/actions/actions";

const LOADING_TOKEN = Symbol("ALBUMS_LOADING_TOKEN");

const AlbumStore = Fluxxor.createStore({
  actions: {
    [c.NEW_RELEASES.SUCCESS]: "handleNewReleasesSuccess",
    [c.ALBUMS.FETCH_SUCCESS]: "handleAlbumFetchSuccess",
  },

  initialize() {
    this.state = {
      albums: {}
    };
  },

  getAlbum(id) {
    if (!this.state.albums[id]) {
      this.state.albums[id] = LOADING_TOKEN;
      this.flux.actions.albums.get(id);
      this.emit("change");
    }
    return this.state.albums[id];
  },

  handleNewReleasesSuccess({releases}) {
    releases.albums.items.forEach((item) => {
      this.state.albums[item.id] = item;
    });
    this.emit("change");
  },

  handleAlbumFetchSuccess({album}) {
    this.state.albums[album.id] = album;
    this.emit("change");
  }
});

export default AlbumStore;
export { LOADING_TOKEN };
