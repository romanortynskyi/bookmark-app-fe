<script>
import IconButton from './IconButton.vue'

export default {
  components: {
    IconButton,
  },
  props: {
    onChange: {
      type: Function,
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    onClear() {
      this.value = ''
    },
  },
  watch: {
    value(newValue) {
      this.onChange(newValue)
    },
  },
}
</script>

<template>
  <div class="search-container">
    <div class="icon-container">
      <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" :style="{ color: 'var(--text-color)' }" />
    </div>

    <input
      type="text"
      class="search-input"
      v-model="value"
      :placeholder="$t('searchBookmarks')"
    />

    <IconButton
      v-if="value.length > 0"
      icon="fa-xmark"
      :click="onClear"
    />
  </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  padding: 15px;
  box-shadow: 0px 0px 8px -4px var(--text-color);
  border-radius: 20px;
}

.icon-container {
  margin-right: 10px;
}

input {
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>