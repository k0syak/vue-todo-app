import { todoMutations, todoGetters } from "./types";

export const STORAGE_KEY = "test-vue-todo";

const defaultTodos = [
  {
    id: 1,
    title: "By food",
    tasks: [
      { id: 1, text: "Watter", done: false },
      { id: 2, text: "Bread", done: false },
      { id: 3, text: "Milk", done: true },
    ],
  },
  {
    id: 2,
    title: "Learning",
    tasks: [
      { id: 1, text: "Reading", done: false },
      { id: 2, text: "Watch video", done: true },
      { id: 3, text: "Curses", done: false },
    ],
  },
  {
    id: 3,
    title: "Sport",
    tasks: [
      { id: 1, text: "Ride a bike", done: false },
      { id: 2, text: "Running", done: true },
      { id: 3, text: "Horizontal bars", done: false },
    ],
  },
];

const getDefaultState = () => ({
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) ?? defaultTodos,
});

// initial state
const state = getDefaultState();

// mutations
const mutations = {
  [todoMutations.ADD_TODO](state, todo) {
    state.todos.push(todo);
  },

  [todoMutations.REMOVE_TODO](state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  [todoMutations.EDIT_TODO](state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1, todo);
  },
};

export default {
  state,
  getters: {
    [todoGetters.LIST]: (state) => state.todos,
    [todoGetters.BY_ID](state) {
      return (id) => state.todos.find((todo) => todo.id === id);
    },
  },
  mutations,
};
