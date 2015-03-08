import Fluxxor from "fluxxor";
import { types as c } from "client/actions/actions";

const HistoryStore = Fluxxor.createStore({
  actions: {
    [c.NAVIGATION.SHOW]: "handleNavigationShow"
  },

  initialize(options) {
    this.state = {
      history: [],
      currentIndex: null
    };

    if (options.initialPage) {
      this.state.history = [options.initialPage];
      this.state.currentIndex = 0;
    }
  },

  getCurrentPage() {
    return this.state.history[this.state.currentIndex];
  },

  handleNavigationShow({type, id}) {
    if (this.state.currentIndex !== null) {
      this.state.history.length = this.state.currentIndex + 1;
    }

    this.state.history.push({type, id});
    this.state.currentIndex++;

    this.emit("change");
  }
});

export default HistoryStore;
