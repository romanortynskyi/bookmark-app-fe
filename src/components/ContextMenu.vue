<script>
import vClickOutside from 'click-outside-vue3'

export default {
  props: {
    onClickOutside: {
      type: Function,
    },
    left: {
      type: Number,
    },
    top: {
      type: Number,
    },
    items: {
      type: Array,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
}
</script>

<template>
  <ul
    v-click-outside="onClickOutside"
    v-if="visible"
    class="contextmenu"
    :style="{
      left: `${left}px`,
      top: `${top}px`,
    }"
  >

    <li
      v-for="item in items"
      :key="item.label"
      @click.stop="item.onClick"
    >
      <span>
        {{ item.label }}
      </span>
    </li>
    
  </ul>
</template>

<style scoped>
.contextmenu {
  position: absolute;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 8px -4px #000000;
}

.contextmenu li {
  padding: 15px;
  cursor: pointer;
}

.contextmenu li:first-of-type {
  margin-top: 15px;
}

.contextmenu li:last-of-type {
  margin-bottom: 15px;
}

.contextmenu li:hover {
  background-color: #ccc;
}

</style>