<script>
import { RouterView } from 'vue-router'
import Select from './components/Select.vue'
import IconButton from './components/IconButton.vue'
export default {
  components: {
    RouterView,
    Select,
    IconButton
},
  data() {
    return {
      languages: [
        'en',
        'uk',
      ],
      tabindex: 0,
      selectedLanguageIndex: 0,
      userTheme: 'light-theme',
    }
  },
  mounted() {
    const initialUserTheme = this.getTheme() || this.getMediaPreference()
    this.setTheme(initialUserTheme)
  },
  methods: {
    onLanguageChange(index) {
      this.selectedLanguageIndex = index
    },
    setTheme(theme) {
      localStorage.setItem('user-theme', theme)
      this.userTheme = theme
      document.documentElement.className = theme
    },
    toggleTheme() {
      const activeTheme = localStorage.getItem('user-theme')

      if (activeTheme === 'light-theme') {
        this.setTheme('dark-theme')
      }
      
      else {
        this.setTheme('light-theme')
      }
    },
    getMediaPreference() {
      const hasDarkPreference = window
        .matchMedia('(prefers-color-scheme: dark)')
        .matches

      if (hasDarkPreference) {
        return 'dark-theme'
      }

      else {
        return 'light-theme'
      }
    },
    getTheme() {
      return localStorage.getItem('user-theme')
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
  <header>
    <div class="theme-toggle-container">
      <IconButton
        @click="toggleTheme"
        :icon="userTheme === 'light-theme' ? 'fa-moon' : 'fa-sun'"
      />
    </div>
    
    <!-- <h1>{{ $t('message.hello') }}</h1> -->

    <Select
      :options="languages"
      :tabindex="tabindex"
      :selectedIndex="selectedLanguageIndex"
      :onChange="onLanguageChange"
    />
  </header>
  <RouterView />
  <notifications />
</template>

<style scoped>
h1 {
  color: var(--text-color);
}

header {
  display: flex;
  align-items: center;
  position: absolute;
  padding: 20px;
  right: 0;
}

.theme-toggle-container {
  margin-right: 20px;
}

</style>
