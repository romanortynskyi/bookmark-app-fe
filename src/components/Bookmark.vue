<script>
import vClickOutside from 'click-outside-vue3'

import IconButton from '../components/IconButton.vue'

export default {
  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    link: {
      type: String,
    },

    isFocused: {
      type: Boolean,
    },
    onFocus: {
      type: Function,
    },

    onContextMenu: {
      type: Function,
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    IconButton,
  },
  methods: {
    onContainerClick() {
      this.onFocus(this.id)
    },
    onMenuClick(e) {
      const { right, top } = this.$refs.iconButton.$refs.button.getBoundingClientRect()
  
      // 145 is the width of context menu + 15 * 2 (padding)
      this.onContextMenu({
        contextMenuX: right - 175,
        contextMenuY: top,
        id: this.id,  
      })
    },
    _onContextMenu(e) {
      this.onContextMenu({
        contextMenuX: e.clientX,
        contextMenuY: e.clientY,
        id: this.id,  
      })
    },
  },
}
</script>

<template>
  <div
    :class="{
      container: true,
      focused: isFocused,
    }"
    @click="onContainerClick"
    @contextmenu.prevent="_onContextMenu"
  >
    <div class="left">
      <img
        :src="`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${this.link}&size=16`"
        class="favicon"
      />
      <span class="title">{{ this.title }}</span>
      <span class="link" v-if="isFocused">{{ this.link }}</span>
    </div>
    
    <IconButton ref="iconButton" icon="fa-ellipsis-vertical" :click="onMenuClick" />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.container.focused {
  background-color: rgb(232, 240, 254);
}

.left {
  display: flex;
  align-items: center;
}

.favicon {
  margin-right: 16px;
}

.title {
  margin-right: 10px;
}

.link {
  max-width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: rgb(149,154,163);
}

span {
  cursor: default;
}

</style>
