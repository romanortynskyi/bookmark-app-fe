<script>
import vClickOutside from 'click-outside-vue3'

import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import Modal from '../components/Modal.vue'
import BookmarkList from '../components/BookmarkList.vue'

export default {
  components: {
    Input,
    Button,
    Modal,
    BookmarkList,
  },
  directives: {
    clickOutside: vClickOutside.directive, 
  },
  data() {
    return {
      title: '',
      description: '',
      link: '',
      bookmarks: [],
      selectedBookmark: null,
      focusedBookmarkId: null,
      isLoadingBookmarks: true,
      isModalVisible: false,

      contextMenuX: null,
      contextMenuY: null,
      contextMenuVisible: false,
    }
  },
  async mounted() {
    const { id, token } = JSON.parse(localStorage.getItem('user')) || {}

    if (!token) {
      this.$router.replace('/login')
    }

    const bookmarksResponse = await fetch(`http://localhost:3000/users/${id}/bookmarks`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const bookmarks = await bookmarksResponse.json()

    this.bookmarks = bookmarks
    this.isLoadingBookmarks = false
  },

  methods: {
    resetForm() {
      this.title = ''
      this.description = ''
      this.link = ''
    },
    closeContextMenu() {
      this.contextMenuX = null
      this.contextMenuY = null
      this.contextMenuVisible = false
    },
    async onAddBookmark() {
      this.isModalVisible = true
    },
    async onCloseModal() {
      this.isModalVisible = false
      
      this.resetForm()
    },
    async onAdd() {
      const { id, token } = JSON.parse(localStorage.getItem('user')) || {}

      const body = {
        userId: id,
        title: this.title,
        description: this.description,
        link: this.link,
      }

      const response = await fetch('http://localhost:3000/bookmarks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const newBookmark = await response.json()

      this.bookmarks.push(newBookmark)
      this.resetForm()
      this.isModalVisible = false
    },
    async onDelete(id) {
      const { token } = JSON.parse(localStorage.getItem('user')) || {}

      await fetch(`http://localhost:3000/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const index = this.bookmarks.findIndex(bookmark => bookmark.id === id)

      this.bookmarks.splice(index, 1)
    },
    async onEdit(id) {
      const selectedBookmark = this.bookmarks.find(bookmark => bookmark.id === id)
      this.selectedBookmark = Object.assign({}, selectedBookmark)
    },
    async onCancelEdit() {
      this.selectedBookmark = null
    },
    async onSubmitEdit() {
      const { id: userId, token } = JSON.parse(localStorage.getItem('user')) || {}

      const {
        id,
        title,
        description,
        link,
      } = this.selectedBookmark

      const body = {
        userId,
        title,
        description,
        link,
      }

      const response = await fetch(`http://localhost:3000/bookmarks/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const updatedBookmark = await response.json()

      this.bookmarks = this.bookmarks.map(bookmark => {
        if (bookmark.id === id) {
          return updatedBookmark
        }

        return bookmark
      })

      this.selectedBookmark = null
    },
    onBookmarkFocus(id) {
      this.focusedBookmarkId = id
    },
    onSignOut() {
      localStorage.removeItem('user')
      this.$router.replace('/login')
    },
    onEditClick() {
      console.log('90')
    },
    onDeleteClick() {},
    onCopyLinkClick() {},
    onOpenInNewTabClick() {},
    onOpenInNewWindowClick() {},
    onContextMenu(params) {
      const {
        contextMenuX,
        contextMenuY,
        id,
      } = params

      this.contextMenuX = contextMenuX
      this.contextMenuY = contextMenuY
      this.focusedBookmarkId = id
      this.contextMenuVisible = true
    },
    onContextMenuClickOutside() {
      this.closeContextMenu()
    },
  }
}

</script>

<template>
  <main class="main">
    <span v-if="isLoadingBookmarks">Loading...</span>
    <div class="container" v-else>
      <div class="top-buttons-container">
        <Button text="Add new bookmark" :click="onAddBookmark" />
        <Button text="Sign out" :click="onSignOut" />
      </div>

      <Modal :visible="isModalVisible">
        <button
          class="modal-close-btn"
          @click="onCloseModal"
        >
          CLOSE
        </button>
        <form
          class="form"
          @submit.prevent="onAdd"
        >
          <Input type="text" v-model="title" placeholder="title" />
          <Input type="text" v-model="description" placeholder="description" />
          <Input type="text" v-model="link" placeholder="link" />
          <Button text="OK" type="submit" />
        </form>
      </Modal>

      <BookmarkList
        :items="bookmarks"
        :focusedId="focusedBookmarkId"
        :onItemFocus="onBookmarkFocus"

        :onEditClick="onEditClick"
        :onDeleteClick="onDeleteClick"
        :onCopyLinkClick="onCopyLinkClick"
        :onOpenInNewTabClick="onOpenInNewTabClick"
        :onOpenInNewWindowClick="onOpenInNewWindowClick"

        :onContextMenu="onContextMenu"
        :contextMenuX="contextMenuX"
        :contextMenuY="contextMenuY"
        :contextMenuVisible="contextMenuVisible"
      />

      <ul
        v-click-outside="onContextMenuClickOutside"
        v-if="contextMenuVisible"
        class="contextmenu"
        :style="{
          left: `${contextMenuX}px`,
          top: `${contextMenuY}px`,
        }"
      >
        <li @click.stop="onEditClick">
          <span>
            Edit
          </span>
        </li>
        <li @click.stop="onDeleteClick">
          <span>
            Delete
          </span>
        </li>
        <li @click.stop="onCopyLinkClick">
          <span>
            Copy link
          </span>
        </li>
        <li @click.stop="onOpenInNewTabClick">
          <span>
            Open in new tab
          </span>
        </li>
        <li @click.stop="onOpenInNewWindowClick">
          <span>
            Open in new window
          </span>
        </li>
      </ul>

    </div>
  </main>
</template>

<style scoped>
.main {
  height: 100vh;
}

.container {
  height: 100%;
  width: 100%;
}

.top-buttons-container {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}

.modal-close-btn {
  margin-left: 70%;
}

.form {
  margin-top: 20px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
}

.delete-btn-container {
  margin-right: 20px;
}

.contextmenu {
  position: absolute;
  background-color: white;
}

</style>