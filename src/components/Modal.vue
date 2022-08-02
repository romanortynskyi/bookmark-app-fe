<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div v-show="visible">
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px -4px var(--text-color);
  background-color: var(--background-color);
}
</style>