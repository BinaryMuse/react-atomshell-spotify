import React from "react";
import { FluxMixin, StoreWatchMixin } from "fluxxor";
import LoadingIndicator from "client/components/widgets/loading_indicator";

import { Flex, Block, Inline, InlineBlock } from "client/components/layout";
import CoverImage from "client/components/widgets/cover_image";
import { LOADING_TOKEN as AlbumLoadingToken } from "client/stores/album_store";

const AlbumPage = React.createClass({
  propTypes: {
    albumId: React.PropTypes.string.isRequired
  },

  mixins: [FluxMixin(React), StoreWatchMixin("albums")],

  getStateFromFlux() {
    const flux = this.getFlux(),
          albumStore = flux.store("albums"),
          album = albumStore.getAlbum(this.props.albumId),
          loading = album === AlbumLoadingToken;

    return {
      album: album,
      loading: loading
    };
  },

  render() {
    const content = this.state.loading ? this.renderLoading() : this.renderAlbum();

    return content;
  },

  renderLoading() {
    return <LoadingIndicator />;
  },

  renderAlbum() {
    return (
      <Flex basis="100%" direction="column">
        {this.renderAlbumHeader(this.state.album)}
      </Flex>
    );
  },

  renderAlbumHeader(album) {
    return (
      <Flex basis="200px">
        <Flex basis="200px" style={{marginRight: 20}}>
          <CoverImage src={album.images[1].url} size={200} />
        </Flex>
        <Flex direction="column" grow={1}>
          <Flex basis="100%" grow={1} direction="column">
            <h2 className="page-type">Album</h2>
            <h1>{album.name}</h1>
          </Flex>
          <Flex>
            <Flex direction="row">
              <button>Play</button>
              <button>Save</button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
});

export default AlbumPage;
