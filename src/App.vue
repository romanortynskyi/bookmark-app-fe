<script>
import { RouterView } from 'vue-router'
import Select from './components/Select.vue'
export default {
  components: {
    RouterView,
    Select,
  },
  data() {
    return {
      languages: [
        'en',
        'uk',
      ],
      tabindex: 0,
      selectedLanguageIndex: 0,
    }
  },
  methods: {
    onLanguageChange(index) {
      this.selectedLanguageIndex = index
    },
  },
  watch: {
    selectedLanguageIndex(newSelectedLanguageIndex) {
      this.$root.$i18n.locale = this.languages[newSelectedLanguageIndex]
    },
  },
}
</script>

<template>
  <!-- <h1>{{ $t('message.hello') }}</h1> -->
  <div class="select-container">
    <Select
      :options="languages"
      :tabindex="tabindex"
      :selectedIndex="selectedLanguageIndex"
      :onChange="onLanguageChange"
    />
  </div>
  <RouterView />
  <notifications />
</template>

<style scoped>
.select-container {
  position: absolute;
  padding: 20px;
  right: 0;
}
</style>
