import React from "react";
import { FluxMixin } from "fluxxor";
import { RouteHandler } from "react-router";

import { Flex, Block, Inline, InlineBlock } from "client/components/layout";

import HistoryPanel from "client/components/history_panel";

let HistoryBar = React.createClass({
  displayName: "HistoryBar",
  render() { return <Inline>HistoryBar</Inline>; }
});

let SearchBar = React.createClass({
  displayName: "SearchBar",
  render() { return <Inline>SearchBar</Inline>; }
});

let ProfileBar = React.createClass({
  displayName: "ProfileBar",
  render() { return <Block style={{textAlign: "right"}}>ProfileBar</Block>; }
});

let NavigationSidebar = React.createClass({
  displayName: "NavigationSidebar",
  render() {
    return (
      <Block>
        <p>NavigationSidebar</p>
      </Block>
    );
  }
});

let CurrentTrackInfoCard = React.createClass({
  displayName: "CurrentTrackInfoCard",
  render() {
    return (
      <Block>
        <img src="http://upload.wikimedia.org/wikipedia/en/9/9c/White_Rabbit_Egypt_Central.jpg"
             width={250} />
        CurrentTrackInfoCard
      </Block>
    );
  }
});

let PlaybackBar = React.createClass({
  displayName: "PlaybackBar",
  render() {
    return (
      <Block className="playback-bar">
        Playback Bar
      </Block>
    );
  }
});

let Application = React.createClass({
  mixins: [FluxMixin(React)],

  render() {
    return (
      <Flex direction="column" style={{height: "100%"}}>
        <Flex direction="row" className="top-bar-container">
          <Flex grow={1}>
            <HistoryPanel />
            <SearchBar />
          </Flex>
          <Flex grow={1} justifyContent="flex-end">
            <ProfileBar />
          </Flex>
        </Flex>
        <Flex basis="100%">
          <Flex basis="250px" shrink={0} direction="column">
            <Flex grow={1} shrink={0} className="navigation-sidebar-container">
              <NavigationSidebar />
            </Flex>
            <Flex flex="0 0 300px" className="current-track-info-card-container">
              <CurrentTrackInfoCard />
            </Flex>
          </Flex>
          <Flex grow={1} className="main-panel-container">
            <RouteHandler />
          </Flex>
        </Flex>
        <Flex className="playback-bar-container">
          <PlaybackBar />
        </Flex>
      </Flex>
    );
  }
});

export default Application;
