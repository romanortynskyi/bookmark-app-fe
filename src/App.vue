<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <h1>{{ $t('message.hello') }}</h1> -->
  <select v-model="$i18n.locale">
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  <RouterView />
  <notifications />
</template>

<style scoped>

</style>
