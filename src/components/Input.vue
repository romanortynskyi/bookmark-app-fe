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
  },
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  },
}
</script>

<template>
  <div class="form__field">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    >
  </div>
</template>

<style scoped>
input {
  border: 1px solid #242c37;
  border-radius: 999px;
  background-color: transparent;
  font: inherit;
  color: #7e8ba3;
  outline: 0;
  padding: 0.5rem 1rem;
  width: 100%;
}

input::placeholder {
  color: #7e8ba3;
}

.form__field {
  margin-bottom: 1rem;
}

</style>