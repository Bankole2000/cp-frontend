<template>
  <div class="comment-list">
    <div></div>
    <div>
      <v-expand-transition>
        <div v-show="comments.length">
          <div class="px-4">
            <v-chip-group
              v-model="sort"
              mandatory
              :active-class="
                $vuetify.theme.dark ? 'yellow--text' : 'primary--text'
              "
            >
              <v-chip
                v-for="tag in sorts"
                :key="tag"
                :disabled="loading"
                :value="tag"
                class="text-capitalize"
              >
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </div>
          <v-divider></v-divider>
        </div>
      </v-expand-transition>
      <v-timeline v-if="comments.length" align-top dense class="ml-n2">
        <v-slide-y-transition group>
          <Comment
            v-for="(comment, n) in comments"
            :id="comment.id"
            :key="comment.id"
            :sockets-ready="socketsReady"
            :profile-socket="profileSocket"
            :post-author-id="postAuthorId"
            :comment="comment"
            :index="n"
          />
        </v-slide-y-transition>
      </v-timeline>
      <CommentLoader v-if="loading" />
      <v-divider v-if="!loading"></v-divider>
      <v-hover
        v-if="!loading && comments.length && comments.length < +total"
        v-slot="{ hover }"
      >
        <v-btn
          :class="{ 'elevated-light': hover }"
          class="text-capitalize"
          color="primary"
          text
          block
          @click="$fetch"
        >
          View more comments ({{ +total - comments.length }})</v-btn
        >
      </v-hover>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import Comment from './Comment.vue'
import CommentLoader from './CommentLoader.vue'
export default {
  components: {
    Comment,
    CommentLoader,
  },
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false,
    },
    postId: {
      type: String,
      required: true,
      default: '',
    },
    postSocket: {
      type: Object,
      required: true,
    },
    profileSocket: {
      type: Object,
      required: true,
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
    postAuthorId: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      loading: false,
      comments: [],
      pages: 0,
      page: 1,
      next: null,
      prev: null,
      total: null,
      limit: 10,
      sort: 'latest',
      sorts: ['latest', 'top'],
    }
  },
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      const url = new URL(
        `${this.$store.getters.postPath}/posts/${this.postId}/comments?page=${
          this.next ? this.next : this.page
        }&limit=${this.limit}&sort=${this.sort}`
      )
      const result = await this.$axios.get(url.href)
      const {
        data: {
          data: { total, limit, next, page, pages, prev, data },
        },
      } = result
      console.log({ result })
      this.total = total
      this.limit = limit
      this.next = next
      this.pages = pages
      this.prev = prev
      this.page = page
      if (this.page > 1) {
        if (this.comments.length < this.total) {
          this.comments.push(...data)
        }
      } else {
        this.comments = data
      }
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  watch: {
    async active(newVal) {
      if (newVal) {
        this.connectSockets()
        await this.$fetch()
      } else {
        this.loading = false
        this.comments = []
        this.pages = 0
        this.page = 1
        this.next = null
        this.prev = null
        this.total = null
        this.limit = 10
        this.sort = 'latest'
      }
    },
    async sort(newVal) {
      if (this.active) {
        console.log({ sort: newVal })
        this.page = 1
        this.next = null
        this.prev = null
        this.total = null
        this.limit = 10
        await this.$fetch()
      }
    },
    socketsReady(newVal) {
      if (newVal) {
        console.log({ commentsListSocketsReady: newVal })
        this.connectSockets()
      }
    },
  },
  fetchOnServer: false,
  async mounted() {
    this.connectSockets()
    await this.$fetch()
  },
  methods: {
    connectSockets() {
      if (this.postSocket.connected) {
        this.postSocket.on('COMMENT_PUBLISHED', async (data) => {
          console.log({ publishedComment: data })
          this.$emit('comment-count-changed', data?.post?._count?.comments)
          await this.getNewComment(data.id)
        })
        this.postSocket.on('COMMENT_LIKED', (data) => {
          console.log({ COMMENT_LIKED: data })
          const index = this.comments.findIndex((c) => c.id === data.commentId)
          if (index > -1) {
            if (this.$store.getters['auth/user']?.userId) {
              if (this.$store.getters['auth/user']?.userId === data.userId) {
                this.comments[index].likedByYou = true
              }
            }
            this.comments[index]._count.likedBy = data.comment._count.likedBy
          }
        })
        this.postSocket.on('COMMENT_UNLIKED', (data) => {
          console.log({ COMMENT_UNLIKED: data })
          const index = this.comments.findIndex((c) => c.id === data.commentId)
          if (index > -1) {
            if (this.$store.getters['auth/user']?.userId) {
              if (this.$store.getters['auth/user']?.userId === data.userId) {
                this.comments[index].likedByYou = false
              }
            }
            this.comments[index]._count.likedBy =
              data.comment._count.likedBy - 1
          }
        })
      }
    },
    async getNewComment(commentId) {
      const result = await this.postSocket.emitP('GET_NEW_COMMENT', {
        userId: this.$store.getters['auth/user']?.userId,
        postId: this.postId,
        commentId,
      })
      console.log({ result })
      if (result) {
        this.comments.unshift(result)
      }
    },
  },
}
</script>

<style></style>
