<script>
export default {
  props: {
    type: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    error: {
      type: String,
    },
  },
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  },
}
</script>

<template>
  <div class="input-container">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    >
    <span>{{ this.error }}</span>
  </div>
</template>

<style scoped>
.input-container {
  
}

input {
  border: 1px solid #242c37;
  border-radius: 999px;
  background-color: transparent;
  font: inherit;
  color: rgb(29, 29, 29);
  outline: 0;
  padding: 0.5rem 1rem;
  width: 100%;
  margin-bottom: 8px;
}

input::placeholder {
  color: #7e8ba3;
}

input:focus {
  border-color: #098d6e;
}

span {
  display: block;
  color: red;
  font-size: 14px;
  height: 21px;
  margin-bottom: 8px;
}

</style>