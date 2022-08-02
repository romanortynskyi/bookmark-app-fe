<script>
import Bookmark from './Bookmark.vue'

export default {
  props: {
    items: {
      type: Array,
    },
    focusedId: {
      type: Number,
    },
    onItemFocus: {
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
  components: {
    Bookmark,
  },
}
</script>

<template>
  <ul>
    <li
      v-for="bookmark in items"
      :key="bookmark.id"
    >
      <Bookmark
        :id="bookmark.id"
        :title="bookmark.title"
        :link="bookmark.link"

        :isFocused="focusedId === bookmark.id"
        :onFocus="onItemFocus"

        :onEditClick="onEditClick"
        :onDeleteClick="onDeleteClick"
        :onCopyLinkClick="onCopyLinkClick"
        :onOpenInNewTabClick="onOpenInNewTabClick"
        :onOpenInNewWindowClick="onOpenInNewWindowClick"

        :onContextMenu="onContextMenu"
      />
    </li>
  </ul>
</template>

<style scoped>
ul {
  box-shadow: 0px 0px 8px -4px var(--text-color);
  border-radius: 20px;
}

li:first-of-type {
  padding-top: 15px;
}

li:last-of-type {
  padding-bottom: 15px;
}
</style>