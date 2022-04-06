<template>
  <div>
    <slot></slot>
    <button type="button" class="button button--primary" @click="$emit('confirm', false)">
      No
    </button>
    <button type="button" class="button button--danger" @click="$emit('confirm', true)">Yes</button>
  </div>
</template>

<script>
export default {
  emits: ["confirm"],
};
</script>
