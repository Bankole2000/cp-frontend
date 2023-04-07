<template>
  <div>
    <client-only>
      <v-row
        v-if="$vuetify.breakpoint.xl"
        v-masonry
        item-selector="[class*='col-']"
        class="masonry-container"
        :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'"
      >
        <v-col v-for="(post, i) in posts" :key="i" cols="12" xl="6">
          <PostCard
            :post="post"
            :index="i"
            :total="posts.length"
            :profile-socket="profileSocket"
            :post-socket="postSocket"
            :sockets-ready="socketsReady"
            :repost-count="post.repostCount"
            @fetch-more="fetchMore"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(post, i) in posts" :key="i" cols="12" xl="6">
          <PostCard
            :post="post"
            :index="i"
            :total="posts.length"
            :profile-socket="profileSocket"
            :post-socket="postSocket"
            :sockets-ready="socketsReady"
            :repost-count="post.repostCount"
            @fetch-more="fetchMore"
          />
        </v-col>
      </v-row>
    </client-only>
    <v-row v-if="loading">
      <v-col v-for="i in 4" :key="i" cols="12" xl="6">
        <v-skeleton-loader
          :boilerplate="false"
          class="rounded-xl elevated-light mb-4"
          type="list-item-avatar-two-line, list-item-three-line, image, card-heading"
        >
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ClientOnly from 'vue-client-only'
import PostCard from '~/components/blocks/posts/PostCardItem.vue'
export default {
  components: {
    ClientOnly,
    PostCard,
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    loading: false,
    posts: [],
    total: 0,
    pages: 0,
    page: 1,
    limit: 20,
    next: null,
    likedByUser: false,
    listenersActive: false,
    profileSocket: {},
    postSocket: {},
    socketsReady: false,
  }),
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      const url = new URL(
        `${this.$store.getters.postPath}/u/${
          this.profile.username
        }/posts?page=${this.next ? this.next : this.page}&limit=${this.limit}`
      )
      const result = await this.$axios.$get(url.href)
      console.log({ result })
      const {
        data: { total, limit, next, page, pages, prev, data },
      } = result
      this.total = total
      this.limit = limit
      this.next = next
      this.pages = pages
      this.prev = prev
      this.page = page
      if (this.page > 1) {
        if (this.posts.length < this.total) {
          this.posts.push(...data)
        }
      } else {
        this.posts = data
      }
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
      if (this.$store.getters['ui/showGlobalLoader']) {
        this.$store.commit(
          'ui/showGlobalLoader',
          { show: false },
          { root: true }
        )
        console.log({
          globalLoader: this.$store.getters['ui/showGlobalLoader'],
        })
      }
    }
  },
  watch: {
    socketsReady(newVal) {
      if (newVal) {
        this.startSocketListeners()
      }
    },
  },
  async mounted() {
    await this.$fetch()
    await this.connectSockets()
    if (this.socketsReady) {
      this.startSocketListeners()
    }
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    startSocketListeners() {
      this.postSocket.on('POST_LIKED', (data) => {
        console.log({ data })
        const index = this.posts.findIndex((p) => p.id === data.postId)
        if (index > -1) {
          if (this.$store.getters['auth/user']?.userId) {
            if (this.$store.getters['auth/user']?.userId === data.userId) {
              this.posts[index].likedByYou = true
            }
          }
          this.posts[index]._count.likedBy = data.post._count.likedBy
        }
        const reposts = this.posts.filter(
          (p) => !p.caption && !p.postMedia.length && p.repostId === data.postId
        )
        console.log({ reposts, data })
        if (reposts.length) {
          reposts.forEach((r) => {
            const index = this.posts.findIndex((p) => p.repostId === r.repostId)
            if (this.$store.getters['auth/user']?.userId) {
              if (this.$store.getters['auth/user']?.userId === data.userId) {
                this.posts[index].likedByYou = true
              }
            }
            this.posts[index].repost._count.likedBy = data.post._count.likedBy
          })
        }
      })
      this.postSocket.on('POST_UNLIKED', (data) => {
        console.log({ data })
        const index = this.posts.findIndex((p) => p.id === data.postId)
        if (index > -1) {
          if (this.$store.getters['auth/user']?.userId) {
            if (this.$store.getters['auth/user']?.userId === data.userId) {
              this.posts[index].likedByYou = false
            }
          }
          this.posts[index]._count.likedBy = data.post._count.likedBy - 1
        }
        const reposts = this.posts.filter(
          (p) => !p.caption && !p.postMedia.length && p.repostId === data.postId
        )
        console.log({ reposts, data })
        if (reposts.length) {
          reposts.forEach((r) => {
            const index = this.posts.findIndex((p) => p.repostId === r.repostId)
            if (this.$store.getters['auth/user']?.userId) {
              if (this.$store.getters['auth/user']?.userId === data.userId) {
                this.posts[index].likedByYou = false
              }
            }
            this.posts[index].repost._count.likedBy =
              data.post._count.likedBy - 1
          })
        }
      })
      this.postSocket.on('GET_REPOST_COUNT', (data) => {
        console.log('Got repost count', data.postId)
        const index = this.posts.findIndex((p) => p.id === data.postId)
        console.log({ data, index })
        if (index > -1) {
          this.posts[index].repostCount = data.count
        }
        const reposts = this.posts.filter((p) => p.repostId === data.postId)
        if (reposts.length) {
          reposts.forEach((r) => {
            const index = this.posts.findIndex((p) => p.repostId === r.repostId)
            this.posts[index].repostCount = data.count
          })
        }
      })
      this.postSocket.on('POST_REPOSTED', (data) => {
        const index = this.posts.findIndex((p) => p.id === data.repostId)
        if (index > -1) {
          this.posts[index].repostCount = data.repostCount.count
          if (this.$store.getters['auth/user']?.userId === data.createdBy) {
            this.posts[index].repostedByYou = true
          }
        }
        const repostIndex = this.posts.findIndex(
          (p) => p.repostId === data.repostId
        )
        if (repostIndex > -1) {
          this.posts[repostIndex].repostCount = data.repostCount.count
          if (this.$store.getters['auth/user']?.userId === data.createdBy) {
            this.posts[repostIndex].repostedByYou = true
          }
        }
        console.log({ data })
      })
      this.postSocket.on('REPOST_UNDONE', (data) => {
        const index = this.posts.findIndex((p) => p.id === data.id)
        if (index > -1) {
          this.posts.splice(index, 1)
        }
        const repostIndex = this.posts.findIndex((p) => p.id === data.repostId)
        if (repostIndex > -1) {
          this.posts[repostIndex].repostCount = data.repostCount.count
          if (this.$store.getters['auth/user']?.userId === data.createdBy) {
            this.posts[repostIndex].repostedByYou = false
          }
        }
        console.log({ data })
      })
    },
    async fetchMore() {
      if (this.posts.length < this.total) {
        console.log('fetching more')
        await this.$fetch()
      }
    },
    async connectSockets() {
      this.profileSocket = await this.$nuxtSocket({
        name: 'profile',
        reconnection: true,
        autoconnect: true,
        path: '/api/v1/profile/socket',
      })
      this.postSocket = await this.$nuxtSocket({
        name: 'post',
        reconnection: true,
        autoconnect: true,
        path: '/api/v1/post/socket',
      })
      if (this.$store.getters['auth/isLoggedIn']) {
        console.log('Connecting User Socket')
        await this.profileSocket.emit(
          'USER_CONNECTED',
          this.$store.getters['auth/user']
        )
        await this.postSocket.emit(
          'USER_CONNECTED',
          this.$store.getters['auth/user']
        )
      }
      this.socketsReady = true
    },
  },
}
</script>

<style></style>
