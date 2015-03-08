import Fluxxor from "fluxxor";
import { types as c } from "client/actions/actions";

const LOADING_TOKEN = Symbol("NEW_RELEASES_LOADING_TOKEN");

const NewReleasesStore = Fluxxor.createStore({
  actions: {
    [c.NEW_RELEASES.SUCCESS]: "handleNewReleasesSuccess"
  },

  initialize() {
    this.state = {
      releases: undefined
    };
  },

  getNewReleases() {
    if (!this.state.releases) {
      this.state.releases = LOADING_TOKEN;
      this.flux.actions.newReleases.get();
      this.emit("change");
    }
    return this.state.releases;
  },

  handleNewReleasesSuccess({releases}) {
    this.waitFor(["albums"], () => {
      if (releases.albums.offset === 0) {
        this.state.releases = releases.albums.items.map((album) => album.id);
      } else {
        const moreReleases = releases.albums.items.map((album) => album.id);
        this.state.releases = this.state.releases.concat(moreReleases);
      }
      this.emit("change");
    });
  }
});

export default NewReleasesStore;
export { LOADING_TOKEN };
