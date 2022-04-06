<template>
  <div class="home">
    <button class="button" @click="openCreateModal">Create New Todo</button>
    <div v-if="todos.length">
      <div class="card" v-for="todo in todos" :key="todo.id">
        <h2>{{ todo.title }}</h2>
        <ul>
          <li v-for="item in todo.tasks.slice(0, 2)" :key="item.id">{{ item.text }}</li>
        </ul>
        <router-link
          v-slot="{ navigate }"
          custom
          :to="{ name: 'edit', params: { todoId: todo.id } }"
        >
          <button class="button" @click="navigate">Edit</button>
        </router-link>
        <button @click="openConfirmModal(todo)" type="button" class="button button--warning">
          Delete
        </button>
      </div>
    </div>
    <div class="" v-else>First need to create Todos</div>

    <teleport to="body">
      <app-modal v-if="modalStatus" title="Confirm" @close="closeModal">
        <app-confirm @confirm="handleConfirm">
          <h2>Are you sher what you want to delete this todo?</h2>
        </app-confirm>
      </app-modal>
    </teleport>

    <teleport to="body">
      <app-modal v-if="modalCreateStatus" @close="closeCreateModal">
        <create-todo @created-todo="closeCreateModal" />
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { todoGetters, todoMutations } from "@/store/modules/todos/types";
import useModal from "@/composable/useModal";

import AppModal from "@/components/ui/AppModal";
import AppConfirm from "@/components/ui/AppConfirm";
import CreateTodo from "@/components/todos/CreateTodo";

export default {
  components: { AppModal, AppConfirm, CreateTodo },
  setup() {
    const store = useStore();
    const { modalStatus, closeModal, openModal } = useModal();
    const {
      modalStatus: modalCreateStatus,
      closeModal: closeCreateModal,
      openModal: openCreateModal,
    } = useModal();
    const selectedTodo = ref();

    const todos = computed(() => store.getters[todoGetters.LIST]);

    const openConfirmModal = (todo) => {
      openModal();
      selectedTodo.value = todo;
    };

    const handleConfirm = (status) => {
      if (status) {
        store.commit(todoMutations.REMOVE_TODO, selectedTodo.value);
      }

      closeModal();
    };

    return {
      modalStatus,
      closeModal,
      todos,
      selectedTodo,
      openConfirmModal,
      handleConfirm,
      modalCreateStatus,
      closeCreateModal,
      openCreateModal,
    };
  },
};
</script>
