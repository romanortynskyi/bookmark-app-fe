<script>
export default {
  props: {
    click: {
      type: Function,
    },
    icon: {
      type: String,
    },
  },
}
</script>

<template>
  <button @click="click">
    <FontAwesomeIcon :icon="`fa-solid ${icon}`" />
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
  background-color: #ccc;
}
</style>