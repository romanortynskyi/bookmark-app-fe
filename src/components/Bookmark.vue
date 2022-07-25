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

    onEditClick: {
      type: Function,
    },
    onDeleteClick: {
      type: Function,
    },
    onCopyLinkClick: {
      type: Function,
    },
    onOpenInNewTabClick: {
      type: Function,
    },
    onOpenInNewWindowClick: {
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
      console.log(e)
      console.log(e.target.getBoundingClientRect())
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
      <span class="title">{{ this.title }}</span>
      <span class="link" v-if="isFocused">{{ this.link }}</span>
    </div>
    
    <IconButton icon="fa-ellipsis-vertical" :click="onMenuClick" />
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

</style>
