const MODULE_NAME = "TODOS";

export const todoGetters = {
  LIST: MODULE_NAME + "/LIST",
  BY_ID: MODULE_NAME + "/BY_ID",
};

export const todoMutations = {
  ADD_TODO: MODULE_NAME + "/ADD_TODO",
  EDIT_TODO: MODULE_NAME + "/EDIT_TODO",
  REMOVE_TODO: MODULE_NAME + "/REMOVE_TODO",
};
