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
  background-image: linear-gradient(160deg, #8ceabb 0%, #378f7b 100%);
  color: #fff;
  outline: none;
  border: none;
  border-radius: 999px;
  padding: 15px;
  cursor: pointer;
}

</style>