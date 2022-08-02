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
    }
  },
  mounted() {
    const initialIsDarkMode = this.isDarkMode() || this.getMediaPreference()
    this.setDarkMode(initialIsDarkMode)
  },
  methods: {
    onLanguageChange(index) {
      this.selectedLanguageIndex = index
    },
    setDarkMode(isDarkMode) {
      localStorage.setItem('dark-mode', isDarkMode)
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark-mode')
      }

      else {
        document.documentElement.classList.remove('dark-mode')
      }
    },
    toggleMode() {
      this.$store.commit('toggleDarkMode')
      localStorage.setItem('dark-mode', this.isDarkMode())
      this.setDarkMode(this.isDarkMode())
    },
    getMediaPreference() {
      const hasDarkPreference = window
        .matchMedia('(prefers-color-scheme: dark)')
        .matches

      return hasDarkPreference
    },
    isDarkMode() {
      return this.$store.state.isDarkMode
    },
  },
  watch: {
    selectedLanguageIndex(newSelectedLanguageIndex) {
      this.$root.$i18n.locale = this.languages[newSelectedLanguageIndex]
    },
  },
  computed: {
    modeIcon() {
      return this.isDarkMode() ? 'fa-moon' : 'fa-sun'
    },
  },
}
</script>

<template>
  <header>
    {{ this.isDarkMode() }}
    <div class="mode-toggle-container">
      <IconButton
        @click="toggleMode"
        :icon="modeIcon"
        iconColor="var(--text-color)"
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

.mode-toggle-container {
  margin-right: 20px;
}

</style>
