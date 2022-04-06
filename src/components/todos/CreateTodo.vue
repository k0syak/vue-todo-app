<template>
  <form class="form" @submit.prevent="submit" @keydown.enter.prevent>
    <h1>Create new ToDo</h1>

    <div class="form-control">
      <label>
        <input type="text" placeholder="Title" v-model="form.title" />
      </label>
    </div>
    <br />
    <hr />
    <br />
    <div class="form-control">
      <label>
        <input
          type="text"
          placeholder="Add new todo"
          v-model="currentText"
          @keydown.enter.prevent="addTodo"
        />
      </label>
      <button class="button" type="button" @click="addTodo">+</button>
    </div>

    <div v-for="todo in form.tasks" :key="todo.id" class="todo-item">
      <button class="button button--icon" type="button" @click="removeTodo(todo)">
        <app-icon name="bin" />
      </button>
      <label>
        {{ todo.text }}
        <input type="checkbox" v-model="todo.done" />
      </label>
    </div>

    <div class="buttons">
      <button class="button" type="button" @click="$emit('created-todo')">Cancel</button>
      <button class="button button--primary" type="submit" :disabled="!isValid">Create</button>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";

import { todoMutations } from "@/store/modules/todos/types";
import useFormTodo from "@/composable/useFormTodo";

import AppIcon from "@/components/ui/AppIcon";

export default {
  emits: ["created-todo"],
  setup(_, { emit }) {
    const store = useStore();
    const { currentText, form, isValid, addTodo, removeTodo, resetForm } = useFormTodo();

    const submit = () => {
      store.commit(todoMutations.ADD_TODO, {
        id: `${Date.now().toString()}`,
        title: form.title.trim(),
        tasks: form.tasks,
      });

      resetForm();

      emit("created-todo");
    };

    return {
      form,
      currentText,
      submit,
      isValid,
      addTodo,
      removeTodo,
    };
  },
  components: {
    AppIcon,
  },
};
</script>
