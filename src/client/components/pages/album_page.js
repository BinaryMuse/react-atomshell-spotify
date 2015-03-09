import React from "react";
import { FluxMixin, StoreWatchMixin } from "fluxxor";
import { Link, State } from "react-router";

import { Flex, Block, Inline, InlineBlock } from "client/components/layout";
import { LOADING_TOKEN as AlbumLoadingToken } from "client/stores/album_store";

import CoverImage from "client/components/widgets/cover_image";
import TrackList from "client/components/widgets/track_list";
import LoadingIndicator from "client/components/widgets/loading_indicator";

const AlbumPage = React.createClass({
  mixins: [State, FluxMixin(React), StoreWatchMixin("albums")],

  getStateFromFlux() {
    const flux = this.getFlux(),
          albumStore = flux.store("albums"),
          album = albumStore.getAlbum(this.getParams().albumId),
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
        {this.renderAlbumDetails(this.state.album)}
        {this.renderAlbumTracks(this.state.album)}
      </Flex>
    );
  },

  renderAlbumHeader(album) {
    return (
      <Flex basis="200px" shrink={0}>
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
  },

  renderAlbumDetails(album) {
    const artist = album.artists[0];
    return (
      <Flex className="album-details-container">
        <Inline>By <Link to="artist" params={{artistId: artist.id}}>{artist.name}</Link> - {album.tracks.items.length} songs</Inline>
      </Flex>
    );
  },

  renderAlbumTracks(album) {
    return (
      <Flex>
        <TrackList tracks={album.tracks.items} />
      </Flex>
    );
  },

  renderTrack(track) {
    return (
      <tr>
        <td style={{textAlign: "right"}}>{track.track_number}</td>
        <td>{track.name}</td>
        <td>{this.msToTime(track.duration_ms)}</td>
        <td></td>
      </tr>
    );
  }
});

export default AlbumPage;
