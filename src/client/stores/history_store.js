import Fluxxor from "fluxxor";
import { types as c } from "client/actions/actions";

const HistoryStore = Fluxxor.createStore({
  actions: {
    [c.NAVIGATION.GO]: "handleNavigationGo",
    [c.NAVIGATION.GO_BACK]: "handleGoBack",
    [c.NAVIGATION.GO_FORWARD]: "handleGoForward"
  },

  initialize(options) {
    this.state = {
      history: [],
      currentIndex: null,
      goingForward: false
    };

    this.router = options.router;
    this.location = options.location;

    this.location.addChangeListener((change) => {
      switch (change.type) {
        case "push":
          if (this.state.goingForward) {
            this.state.goingForward = false;
          } else {
            this.pushHistory(change.path);
          }
          break;
        case "pop":
          this.popHistory();
          break;
      }
    });

    this.initHistory(this.location.getCurrentPath());
  },

  getCurrentPage() {
    return this.state.history[this.state.currentIndex];
  },

  canGoBack() {
    return this.state.currentIndex > 0;
  },

  canGoForward() {
    return this.state.currentIndex < this.state.history.length - 1;
  },

  initHistory(path) {
    this.state.history = [path];
    this.state.currentIndex = 0;
    this.emit("change");
  },

  pushHistory(path) {
    this.state.history.length = this.state.currentIndex + 1;
    this.state.history.push(path);
    this.state.currentIndex++;
    this.emit("change");
  },

  popHistory() {
    this.state.currentIndex--;
    this.emit("change");
  },

  handleNavigationGo({name, params}) {
    this.router.transitionTo(name, params);
  },

  handleGoBack() {
    if (this.canGoBack()) {
      this.router.goBack();
    }
  },

  handleGoForward() {
    if (this.canGoForward()) {
      this.state.currentIndex++;
      this.state.goingForward = true;
      const path = this.state.history[this.state.currentIndex];
      this.router.transitionTo(path);
      this.emit("change");
    }
  }
});

export default HistoryStore;
