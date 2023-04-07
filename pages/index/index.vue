<template>
  <div class="index">
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" xl="8">
          <ClientOnly>
            <v-row
              v-if="$vuetify.breakpoint.xl"
              v-masonry
              item-selector="[class*='col-']"
              class="masonry-container"
              :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'"
            >
              <v-col
                v-for="(post, i) in posts"
                :key="`${i}-b`"
                cols="12"
                xl="12"
              >
                <PostCard
                  :post="post"
                  :index="i"
                  :total="posts.length"
                  :profile-socket="profileSocket"
                  :post-socket="postSocket"
                  :sockets-ready="socketsReady"
                  :repost-count="post.repostCount"
                  class="mb-4"
                />
              </v-col>
            </v-row>
            <v-row v-else :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'">
              <v-col v-for="(post, i) in posts" :key="i" cols="12" xl="6">
                <PostCard
                  :post="post"
                  :index="i"
                  :total="posts.length"
                  :profile-socket="profileSocket"
                  :post-socket="postSocket"
                  :sockets-ready="socketsReady"
                  :repost-count="post.repostCount"
                  class="mb-4"
                />
              </v-col>
            </v-row>
          </ClientOnly>
          <v-row v-if="loading">
            <v-col
              v-for="i in $vuetify.breakpoint.xl ? 4 : 2"
              :key="i"
              cols="12"
              xl="6"
            >
              <v-skeleton-loader
                :boilerplate="false"
                class="rounded-xl elevated-light mb-4"
                type="list-item-avatar-two-line, list-item-three-line, image, card-heading"
              >
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col v-for="i in 6" :key="`${i}-b`" cols="12" xl="6">
              <PostCardItem class="mb-4" />
            </v-col>
          </v-row> -->
        </v-col>
        <v-col v-if="$vuetify.breakpoint.smAndUp" cols="5" xl="4">
          <div
            style="
              position: sticky;
              left: 20px;
              right: 60px;
              bottom: 5px;
              top: 80px;
            "
          >
            <v-card class="elevated-light rounded-xl mb-4">
              <v-card-title>
                <div class="d-flex align-center">
                  <CountrySelectButton />
                  <v-textarea
                    placeholder="Search By City or State"
                    rows="1"
                    prepend-inner-icon="mdi-magnify"
                    auto-grow
                    hide-details
                    filled
                    dense
                    rounded
                    single-line
                  ></v-textarea>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pb-0 pt-2">Trending Tags</v-card-text>
              <v-card-text class="pt-0 pb-2">
                <v-chip-group column>
                  <v-chip
                    v-for="tag in tags"
                    :key="tag"
                    :color="randomColor()"
                    small
                    label
                    close
                  >
                    #{{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
            <!-- <v-card class="elevated-light rounded-xl mb-4">
              <v-card-title>Trending</v-card-title>
            </v-card> -->
            <SuggestedProfilesCard
              :profile-socket="profileSocket"
              :sockets-ready="socketsReady"
            />
            <div>
              <v-card-text class="pt-0 pb-1">
                Terms of Service &middot; Privacy Policy &middot; Cookie Policy
              </v-card-text>
              <v-card-text class="pt-0 pb-1">
                Accessibility &middot; Ads Info &middot; About &middot; Support
              </v-card-text>
              <v-card-text class="pt-0 pb-1">
                For Businesses &middot; For Developers &middot; Suggestions
              </v-card-text>
              <v-card-text class="pt-0 pb-1">
                &copy; 2021, AppName, Inc.
              </v-card-text>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
  scrollToTop: true,
  props: {},
  data() {
    return {
      profileSocket: {},
      postSocket: {},
      socketsReady: false,
      loading: false,
      posts: [],
      total: 0,
      pages: 0,
      page: 1,
      limit: 20,
      next: null,
      tags: [
        'Work',
        'Food',
        'Art',
        'Tech',
        'sports',
        'Drawers',
        'Shopping',
        'Home Improvement',
        // 'Vacation',
        // 'Canary',
        // 'Postgraduate',
        // 'Anadromous',
        // 'Heehaw',
        // 'Inceptive',
        // 'Circumlocution',
        // 'Creative Writing',
      ],
    }
  },
  async fetch() {
    console.log({ globalLoader: this.$store.getters['ui/showGlobalLoader'] })
    if (this.loading) return
    try {
      this.loading = true
      const url = new URL(
        `${this.$store.getters.postPath}/posts?page=${
          this.next ? this.next : this.page
        }&limit=${this.limit}`
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
  async mounted() {
    console.log({ breakpoint: this.$vuetify.breakpoint })
    await this.connectSockets()
    await this.$fetch()
    console.log({ context: this.$config })
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
  methods: {
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

    scrollToTop() {
      this.$vuetify.goTo(0)
    },
    randColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    randomColor() {
      const colors = ['primary', 'secondary', 'info', 'warning']
      return colors[Math.floor(Math.random() * colors.length)]
    },
  },
}
</script>

<style></style>
