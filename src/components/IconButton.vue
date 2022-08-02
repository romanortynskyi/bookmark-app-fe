<script>
export default {
  props: {
    click: {
      type: Function,
    },
    icon: {
      type: String,
    },
    iconColor: {
      type: String,
    },
  },
}
</script>

<template>
  <button @click="click" ref="button">
    <FontAwesomeIcon
      :icon="`fa-solid ${icon}`"
      :style="{
        color: iconColor,
      }"
    />
  </button>
</template>

<style scoped>
button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  height: 30px;
  width: 30px;
}

button:hover {
  background-color: var(--icon-button-hover-color);
}
</style>