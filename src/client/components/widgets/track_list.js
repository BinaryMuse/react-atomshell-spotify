import React from "react";
import { FluxMixin, StoreWatchMixin } from "fluxxor";

const identity = (x) => x;

const msToTime = (ms) => {
  const numSec = ms / 1000,
        numMin = Math.floor(numSec / 60),
        numSecRemain = Math.ceil(numSec % 60);

  let secondText = `${numSecRemain}`;
  if (secondText.length < 2) secondText = `0${secondText}`;

  return `${numMin}:${secondText}`;
}

const columns = {
  track_number: ['track_number', '#', identity],
  track_name: ['name', 'Track', identity],
  duration: ['duration_ms', 'Time', msToTime]
};

const TrackList = React.createClass({
  propTypes: {
    tracks: React.PropTypes.arrayOf(
      React.PropTypes.object
    ).isRequired,
    columns: React.PropTypes.arrayOf(
      React.PropTypes.string
    )
  },

  getDefaultProps() {
    return {
      columns: ['track_number', 'track_name', 'duration']
    };
  },

  render() {
    return (
      <table className="track-list">
        <thead>
          {this.props.columns.map(this.renderHeader)}
        </thead>
        <tbody>
          {this.props.tracks.map(this.renderTrack)}
        </tbody>
      </table>
    );
  },

  renderHeader(headerCode) {
    return (
      <th key={headerCode} className={'head-' + headerCode}>
        {columns[headerCode][1]}
      </th>
    );
  },

  renderTrack(track) {
    return (
      <tr key={track.id}>
      {this.props.columns.map((col) => {
        const prop = columns[col][0],
              transform = columns[col][2],
              val = transform(track[prop]);
        return <td key={col} className={'col-' + col}>{val}</td>;
      })}
      </tr>
    );
  }
});

export default TrackList;
