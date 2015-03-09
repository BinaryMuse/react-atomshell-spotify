import React from "react";
import { FluxMixin, StoreWatchMixin } from "fluxxor";

const HistoryPanel = React.createClass({
  mixins: [FluxMixin(React), StoreWatchMixin("history")],

  getStateFromFlux() {
    const flux = this.getFlux(),
          historyStore = flux.store("history");

    return {
      canGoForward: historyStore.canGoForward(),
      canGoBack: historyStore.canGoBack()
    };
  },

  render() {
    return (
      <div>
        <button disabled={!this.state.canGoBack}
                onClick={this.goBack}>Back</button>
        <button disabled={!this.state.canGoForward}
                onClick={this.goForward}>Forward</button>
      </div>
    );
  },

  goBack() {
    this.getFlux().actions.navigation.goBack();
  },

  goForward() {
    this.getFlux().actions.navigation.goForward();
  }
});

export default HistoryPanel;
