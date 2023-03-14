<template>
  <div>
    <v-row v-if="unpublished > 0">
      <v-col cols="12">
        <v-expand-transition>
          <v-alert type="info" class="mb-0" text>
            You have <strong>{{ unpublished }}</strong> unpublished posts
          </v-alert>
        </v-expand-transition>
      </v-col>
    </v-row>
    <client-only>
      <v-row
        v-if="$vuetify.breakpoint.xl"
        v-masonry
        item-selector="[class*='col-']"
        class="masonry-container"
        :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'"
      >
        <v-col v-for="(post, i) in posts" :key="i" cols="12" xl="6">
          <PostCardItem
            :post="post"
            :index="i"
            :total="total"
            @fetch-more="fetchMore"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col v-for="(post, i) in posts" :key="i" cols="12" xl="6">
          <PostCardItem :post="post" />
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
import PostCardItem from '~/components/blocks/posts/PostCardItem.vue'

export default {
  components: {
    ClientOnly,
    PostCardItem,
  },
  props: ['profile'],
  data: () => ({
    loading: false,
    posts: [],
    total: 0,
    pages: 0,
    page: 1,
    limit: 20,
    next: null,
    likedByUser: false,
    unpublished: 0,
  }),
  fetchOnServer: false,
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      const url = new URL(
        `${this.$store.getters.postPath}/me/posts?page=${
          this.next ? this.next : this.page
        }&limit=${this.limit}`
      )
      const result = await this.$axios.$get(url.href)
      console.log({ result })
      const {
        data: { total, limit, next, page, pages, prev, data, unpublished },
      } = result
      this.total = total
      this.limit = limit
      this.next = next
      this.pages = pages
      this.prev = prev
      this.page = page
      this.unpublished = unpublished
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
    }
  },
  async mounted() {
    console.log('mounted')
    await this.$fetch()
    console.log({ context: this.$config })
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
    async fetchMore() {
      if (this.next) {
        await this.$fetch()
      }
    },
  },
}
</script>

<style></style>
