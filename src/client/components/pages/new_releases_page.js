import React from "react";
import { FluxMixin, StoreWatchMixin } from "fluxxor";

import { Flex, Block, Inline, InlineBlock } from "client/components/layout";
import { LOADING_TOKEN as NewReleasesLoadingToken } from "client/stores/new_releases";

import AlbumCard from "client/components/widgets/album_card";

const NewReleasesPage = React.createClass({
  mixins: [FluxMixin(React), StoreWatchMixin("newReleases", "albums")],

  getStateFromFlux() {
    const flux = this.getFlux(),
          releases = flux.store("newReleases").getNewReleases(),
          albumStore = flux.store("albums"),
          loading = releases === NewReleasesLoadingToken;

    if (loading) {
      var albums = [];
    } else {
      var albums = releases.reduce((acc, curr) => {
        acc[curr] = albumStore.getAlbum(curr);
        return acc;
      }, {})
    }

    return {
      releases: releases,
      albums: albums,
      loading: loading
    };
  },

  render() {
    const content = this.state.loading ? this.renderLoading() : this.renderNewReleases();
    return (
      <div>
        <h1>New Releases</h1>
        {content}
      </div>
    );
  },

  renderLoading() {
    return <div>Loading...</div>;
  },

  renderNewReleases() {
    return (
      <Block>
        {this.state.releases.map(this.renderAlbumById)}
      </Block>
    );
  },

  renderAlbumById(albumId) {
    const album = this.state.albums[albumId],
          artist = album.artists && album.artists[0],
          cardAlbum = { name: album.name, id: album.id },
          imageUrl = album.images[1].url;

    const props = {
      key: album.id,
      image: imageUrl,
      album: cardAlbum,
      onAlbumClick: this.browseToAlbum.bind(null, album.id)
    };

    if (artist) {
      props.artist = { name: artist.name, id: artist.id };
      props.onArtistClick = this.browseToArtist.bind(null, artist.id);
    }

    return (
      <InlineBlock key={album.id} style={{margin: "0 20px 20px 0"}}>
        <AlbumCard {...props} />
      </InlineBlock>
    );
  },

  browseToAlbum(albumId) {
    this.getFlux().actions.navigation.showAlbum(albumId);
  },

  browseToArtist(artistId) {
    this.getFlux().actions.navigation.showArtist(artistId);
  }
});

export default NewReleasesPage;
