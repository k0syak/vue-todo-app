import { computed, reactive, ref } from "vue";

export default function () {
  const currentText = ref();
  const form = reactive({
    id: "",
    title: "",
    tasks: [],
  });

  const addTodo = () => {
    if (currentText.value.trim()) {
      form.tasks.push({
        id: form.tasks.length + 1,
        text: currentText.value,
        done: false,
      });

      currentText.value = "";
    }
  };

  const removeTodo = (todo) => {
    form.tasks.splice(form.tasks.indexOf(todo), 1);
  };

  const isValid = computed(() => {
    return form.title.trim() && form.title.length > 3 && form.tasks.length;
  });

  const resetForm = () => {
    form.id = "";
    form.title = "";
    form.tasks = [];
  };

  return {
    currentText,
    form,
    addTodo,
    removeTodo,
    resetForm,
    isValid,
  };
}
