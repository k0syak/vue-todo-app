<template>
  <form class="form" @submit.prevent="submit" @keydown.enter.prevent v-if="form">
    <h1>Edit ToDo</h1>

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

    <div v-for="task in form.tasks" :key="task.id" class="todo-item">
      <label>
        <input type="checkbox" v-model="task.done" />
      </label>
      <label>
        <input type="text" v-model="task.text" />
      </label>
      <button class="button button--icon" type="button" @click="removeTodo(task)">
        <app-icon name="bin" />
      </button>
    </div>

    <div class="buttons">
      <button class="button" type="button" @click="openModal">Cancel</button>
      <button class="button button--primary" type="submit" :disabled="!isValid">Update</button>
    </div>
    <br />
    <button class="button" type="button" @click="handleConfirm(true)">Cancel confirm</button>
  </form>

  <teleport to="body">
    <app-modal v-if="modalStatus" title="Confirm" @close="closeModal">
      <app-confirm @confirm="handleConfirm">
        <h2>Are you sher what you want to cancel changes?</h2>
      </app-confirm>
    </app-modal>
  </teleport>
</template>

<script>
import { computed, watchEffect, readonly } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import { todoGetters, todoMutations } from "@/store/modules/todos/types";
import useFormTodo from "@/composable/useFormTodo";
import useModal from "@/composable/useModal";

import AppModal from "@/components/ui/AppModal";
import AppConfirm from "@/components/ui/AppConfirm";
import AppIcon from "@/components/ui/AppIcon";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { currentText, form, isValid, addTodo, removeTodo } = useFormTodo();
    const { modalStatus, closeModal, openModal } = useModal();

    const id = Number(route.params.todoId);
    const todo = computed(() => {
      return store.getters[todoGetters.BY_ID](id);
    });

    const updateTodoData = () => {
      const { id, title, tasks } = todo.value;

      form.id = id;
      form.title = title;
      form.tasks = tasks;
    };

    // onMounted(() => {
    updateTodoData();

    const initialForm = readonly(form);
    // });

    watchEffect(() => {
      // works for reactivity tracking
      console.log(initialForm.tasks);
    });

    const submit = () => {
      store.commit(todoMutations.EDIT_TODO, form);
      router.push({ name: "home" });
    };

    const handleConfirm = (status) => {
      if (status) {
        // store.commit(todoMutations.REMOVE_TODO, form);
        updateTodoData();
        console.log("todo", todo.value);
        console.log("copy", initialForm);
      }

      closeModal();
    };

    return {
      todo,
      form,
      currentText,
      submit,
      isValid,
      addTodo,
      removeTodo,
      modalStatus,
      openModal,
      closeModal,
      handleConfirm,
    };
  },
  components: {
    AppIcon,
    AppModal,
    AppConfirm,
  },
};
</script>
