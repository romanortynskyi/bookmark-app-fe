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
  },
}
</script>

<template>
  <button
    :type="type"
    @click="click"
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
  cursor: pointer;
  margin-bottom: 6rem;
  border: 1px solid transparent;
}

button:disabled {
  background-color: #8ceabb;
}

button:hover {
  background-color: #378f7b;
}

button:focus {
  border: 1px solid #098d6e;
}

</style>