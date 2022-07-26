<script>
export default {
  props: {
    text: {
      type: String,
    },
    type: {
      type: String,
      default: 'button',
    },
    click: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <button
    :type="type"
    @click="click"
    :disabled="disabled"
  >
    {{ this.text }}
  </button>
</template>

<style scoped>
button {
  background-color: #29db82;
  transition: all .2s linear;
  color: #fff;
  outline: none;
  border: none;
  border-radius: 999px;
  padding: 15px;
  margin-bottom: 6rem;
  border: 1px solid transparent;
}

button:not(:disabled) {
  cursor: pointer;
}

button:disabled {
  background-color: #8ceabb;
}

button:not(:disabled):hover {
  background-color: #378f7b;
}

button:not(:disabled):focus {
  border: 1px solid #098d6e;
}

</style>