<script>
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import Modal from '../components/Modal.vue'
import BookmarkList from '../components/BookmarkList.vue'
import ContextMenu from '../components/ContextMenu.vue'
import Search from '../components/Search.vue'

export default {
  components: {
    Input,
    Button,
    Modal,
    BookmarkList,
    ContextMenu,
    Search,
  },
  data() {
    return {
      title: '',
      link: '',

      isLoadingBookmarks: true,
      allBookmarks: [],
      bookmarks: [],

      selectedBookmarkId: null,
      focusedBookmarkId: null,

      isUpdating: false,
      
      isModalVisible: false,

      contextMenuX: null,
      contextMenuY: null,
      contextMenuVisible: false,

      contextMenuItems: [
        {
          label: 'Edit',
          onClick: this.onEditClick,
        },
        {
          label: 'Delete',
          onClick: this.onDeleteClick,
        },
        {
          label: 'Copy link',
          onClick: this.onCopyLinkClick,
        },
        {
          label: 'Open in new tab',
          onClick: this.onOpenInNewTabClick,
        },
        {
          label: 'Open in new window',
          onClick: this.onOpenInNewWindowClick,
        },
      ],
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

    this.allBookmarks = bookmarks
    this.isLoadingBookmarks = false
  },

  methods: {
    resetForm() {
      this.title = ''
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
      this.isUpdating = false
      
      this.resetForm()
    },
    async onAddSubmit() {
      const { id, token } = JSON.parse(localStorage.getItem('user')) || {}

      let link

      const regexp = /^https?:\/\/.*/

      if (regexp.test(this.link)) {
        link = this.link
      }
      else {
        link = `http://${this.link}`
      }

      const body = {
        userId: id,
        title: this.title,
        link,
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
    
    async onEditSubmit() {
      const { id: userId, token } = JSON.parse(localStorage.getItem('user')) || {}

      const body = {
        userId,
        title: this.title,
        link: this.link,
      }

      const response = await fetch(`http://localhost:3000/bookmarks/${this.selectedBookmarkId}`, {
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
        if (bookmark.id === this.selectedBookmarkId) {
          return updatedBookmark
        }

        return bookmark
      })

      this.selectedBookmarkId = null
      this.isUpdating = false

      this.resetForm()
      this.isModalVisible = false
    },
    onSubmit() {
      if (this.isUpdating) {
        this.onEditSubmit()
      }
      else {
        this.onAddSubmit()
      }
    },
    onBookmarkFocus(id) {
      this.focusedBookmarkId = id
    },
    onSignOut() {
      localStorage.removeItem('user')
      this.$router.replace('/login')
    },
    onEditClick() {
      this.isUpdating = true

      const selectedBookmark = this.bookmarks.find(bookmark => bookmark.id === this.focusedBookmarkId)

      this.selectedBookmarkId = this.focusedBookmarkId

      this.title = selectedBookmark.title
      this.link = selectedBookmark.link

      this.isModalVisible = true
      this.closeContextMenu()
    },
    async onDeleteClick() {
      const { token } = JSON.parse(localStorage.getItem('user')) || {}

      await fetch(`http://localhost:3000/bookmarks/${this.focusedBookmarkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const index = this.bookmarks.findIndex(bookmark => bookmark.id === this.focusedBookmarkId)

      this.bookmarks.splice(index, 1)

      this.selectedBookmarkId = null
      this.closeContextMenu()
    },
    onCopyLinkClick() {
      const { link } = this.bookmarks.find(bookmark => bookmark.id === this.focusedBookmarkId) || {}

      navigator.clipboard.writeText(link)

      this.focusedBookmarkId = null
      this.closeContextMenu()
    },
    onOpenInNewTabClick() {
      const { link } = this.bookmarks.find(bookmark => bookmark.id === this.focusedBookmarkId) || {}
      window.open(link, '_blank')

      this.focusedBookmarkId = null
      this.closeContextMenu()
    },
    onOpenInNewWindowClick() {
      const { link } = this.bookmarks.find(bookmark => bookmark.id === this.focusedBookmarkId) || {}

      const {
        height,
        width,
      } = window.screen
      
      window.open(link, '', `width=${width},height=${height}`)

      this.focusedBookmarkId = null
      this.closeContextMenu()
    },
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
    onSearch(query) {
      if (query.length > 0) {
        const foundBookmarks = this.bookmarks.filter(bookmark => bookmark.title.includes(query) || bookmark.link.includes(query))
        this.bookmarks = foundBookmarks
      }
      else {
        this.bookmarks = this.allBookmarks
      }
    },
  },
  watch: {
    allBookmarks(newAllBookmarks) {
      this.bookmarks = newAllBookmarks
    },
  },
}

</script>

<template>
  <div class="container">
    <main class="main">
      <span v-if="isLoadingBookmarks">Loading...</span>
      <div class="content" v-else>
        <div class="top-buttons-container">
          <Button text="Add new bookmark" :click="onAddBookmark" />
          <Button text="Sign out" :click="onSignOut" />
        </div>

        <div class="search">
          <Search :onChange="onSearch" />
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
            @submit.prevent="onSubmit"
          >
            <Input type="text" v-model="title" placeholder="title" />
            <Input type="text" v-model="link" placeholder="link" />
            <Button text="OK" type="submit" />
          </form>
        </Modal>

        <BookmarkList
          :items="bookmarks"
          :focusedId="focusedBookmarkId"
          :onItemFocus="onBookmarkFocus"

          :onContextMenu="onContextMenu"
          :contextMenuX="contextMenuX"
          :contextMenuY="contextMenuY"
          :contextMenuVisible="contextMenuVisible"
        />

        <ContextMenu
          :onClickOutside="onContextMenuClickOutside"
          :left="contextMenuX"
          :top="contextMenuY"
          :items="contextMenuItems"
          :visible="contextMenuVisible"
        />

      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.main {
  height: 100vh;
}

.content {
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

.search {
  margin-bottom: 20px;
}

</style>