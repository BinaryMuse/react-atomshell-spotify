import { readFileSync } from "fs";
import { resolve } from "path";

import less from "less";
import React from "react";
import { Flux } from "fluxxor";
import Router, { Route, DefaultRoute, NotFoundRoute } from "react-router";

import { Block } from "client/components/layout";
import { methods as actions } from "client/actions/actions";

import NewReleasesStore from "client/stores/new_releases";
import AlbumStore from "client/stores/album_store";
import HistoryStore from "client/stores/history_store";

import Application from "client/components/application";
import NewReleasesPage from "client/components/pages/new_releases_page";
import AlbumPage from "client/components/pages/album_page";

const NotFound = React.createClass({
  render() {
    return <Block>Not found</Block>;
  }
});

const routes = (
  <Route path="/" name="home" handler={Application}>
    <DefaultRoute handler={NewReleasesPage} />
    <Route name="album" path="/album/:albumId" handler={AlbumPage} />
    <Route name="artist" path="/artist/:artistId" handler={NotFound} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

async function loadStyles() {
  const lessData = readFileSync(`${__dirname}/style/style.less`, 'utf8');
  const {css} = await less.render(lessData, {
    paths: [resolve(`${__dirname}/..`)],
    filename: 'style.less'
  });
  const node = document.createElement("style");
  node.innerHTML = css;
  document.head.appendChild(node);
}

async function bootstrap() {
  await loadStyles();

  const locationProvider = Router.HashLocation;

  const router = Router.create({
    routes: routes,
    location: locationProvider
  });

  const stores = {
    history: new HistoryStore({router: router, location: locationProvider}),
    newReleases: new NewReleasesStore(),
    albums: new AlbumStore()
  };

  const flux = new Flux(stores, actions);
  flux.on("dispatch", (type, payload) => console.log("[Dispatch]", type, payload))

  router.run((Handler, state) => {
    React.render(
      <Handler flux={flux} />,
      document.getElementById("app")
    );
  });
}

bootstrap();
