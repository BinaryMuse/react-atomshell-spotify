import React from "react";
import { Block, Inline, InlineBlock } from "client/components/layout";
import CoverImage from "client/components/widgets/cover_image";

const AlbumCard = React.createClass({
  propTypes: {
    image: React.PropTypes.string.isRequired,
    album: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired
    }).isRequired,
    artist: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired
    }),
    width: React.PropTypes.number,
    onAlbumClick: React.PropTypes.func,
    onArtistClick: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      width: 200,
      onAlbumClick: () => {},
      onArtistClick: () => {}
    };
  },

  render() {
    return (
      <InlineBlock style={{width: this.props.width}} className="album-card">
        <Block>
          <CoverImage src={this.props.image} size={this.props.width}
                      style={{cursor: "pointer"}}
                      onClick={this.onAlbumClick} />
        </Block>
        <Block className="info-portion" style={{height: 65}}>
          <Block className="album-link-container">
            <a href='#' onClick={this.onAlbumClick}>
              {this.props.album.name}
            </a>
          </Block>
          {
            this.props.artist ?
            <Block className="artist-link-container">
            <a href='#' onClick={this.onArtistClick}>
              {this.props.artist.name}
            </a>
            </Block> :
            null
          }
        </Block>
      </InlineBlock>
    );
  },

  onAlbumClick(evt) {
    evt.preventDefault();
    this.props.onAlbumClick(this.props.album.id);
  },

  onArtistClick(evt) {
    evt.preventDefault();
    this.props.onArtistClick(this.props.artist.id);
  }
});

export default AlbumCard;
