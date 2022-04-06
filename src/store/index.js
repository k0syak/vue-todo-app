import { createStore } from "vuex";
import todos from "./modules/todos";
import plugins from "./plugins";

const store = createStore({
  plugins,
  modules: {
    todos,
  },
});

export default store;
