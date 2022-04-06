import { STORAGE_KEY } from "@/store/modules/todos";
import { createLogger } from "vuex";

const plugins = [];

const updateTodoLocalStorage = (store) => {
  store.subscribe((mutation, { todos }) => {
    if (todos?.todos.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.todos));
    }
  });
};

plugins.push(updateTodoLocalStorage);

if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

export default plugins;
