import { readFileSync } from "fs";
import { resolve } from "path";

import React from "react";
import { Flux, FluxMixin, StoreWatchMixin } from "fluxxor";
import less from "less";

import { Flex, Block, Inline, InlineBlock } from "client/components/layout";
import SpotifyClient from "client/api/spotify";
import { methods as actions } from "client/actions/actions";
import NewReleasesStore from "client/stores/new_releases";
import AlbumStore from "client/stores/album_store";
import HistoryStore from "client/stores/history_store";
import MainPanel from "client/components/main_panel";

const client = SpotifyClient.get();

const stores = {
  history: new HistoryStore({initialPage: { type: 'album', id: '54Wb4l4sZxPGTkOIuRdeRi' }}),
  newReleases: new NewReleasesStore(),
  albums: new AlbumStore()
};

const flux = new Flux(stores, actions);
flux.on("dispatch", (type, payload) => console.log("[Dispatch]", type, payload))

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
            <HistoryBar />
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
            <MainPanel />
          </Flex>
        </Flex>
        <Flex className="playback-bar-container">
          <PlaybackBar />
        </Flex>
      </Flex>
    );
  }
});

async function loadStyles() {
  let lessData = readFileSync(`${__dirname}/style/style.less`, 'utf8');
  let {css} = await less.render(lessData, {
    paths: [resolve(`${__dirname}/..`)],
    filename: 'style.less'
  });
  let node = document.createElement("style");
  node.innerHTML = css;
  document.head.appendChild(node);
}

async function bootstrap() {
  await loadStyles();
  React.render(
    <Application flux={flux} />,
    document.getElementById("app")
  );
}

setTimeout(bootstrap);
