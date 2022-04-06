import { ref } from "vue";

export default function () {
  const modalStatus = ref(false);

  const closeModal = () => (modalStatus.value = false);
  const openModal = () => (modalStatus.value = true);
  const toggleModal = () => (modalStatus.value = !modalStatus.value);

  return {
    modalStatus,
    openModal,
    toggleModal,
    closeModal,
  };
}
