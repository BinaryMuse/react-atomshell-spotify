import React from "react";
import { FluxMixin, StoreWatchMixin } from "fluxxor";
import NewReleasesPage from "client/components/pages/new_releases_page";
import AlbumPage from "client/components/pages/album_page";

const MainPanel = React.createClass({
  mixins: [FluxMixin(React), StoreWatchMixin("history")],

  getStateFromFlux() {
    const historyStore = this.getFlux().store("history"),
          currentPage = historyStore.getCurrentPage();

    return {
      page: currentPage || { type: 'new-releases' }
    };
  },

  render() {
    console.log("page", this.state.page);
    switch (this.state.page.type) {
      case "new-releases":
        return <NewReleasesPage />;
      case "album":
        return <AlbumPage albumId={this.state.page.id} />;
      default:
        return <div>Unknown page: {this.state.page.type}</div>;
    }
  }
});

export default MainPanel;
