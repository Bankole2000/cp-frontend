<template>
  <div>
    <v-text-field
      v-model="searchTerm"
      class="my-2"
      prepend-inner-icon="mdi-magnify"
      rounded
      :dense="!$vuetify.breakpoint.smAndUp"
      filled
      clearable
      hide-details
      single-line
      :style="{
        fontSize: $vuetify.breakpoint.smAndUp ? '1.4rem' : '1rem',
      }"
      :placeholder="`Search followers`"
      append-icon="mdi-send"
      @click:clear="clearSearch"
      @keypress.enter="$fetch"
      @change="() => (next ? (next = null) : null)"
    ></v-text-field>
    <v-expand-transition>
      <div v-show="!!searchTerm" class="caption text--secondary">
        <p class="mb-1">
          Searching for <strong>"{{ searchTerm }}"</strong> among your following
        </p>
      </div>
    </v-expand-transition>
    <v-divider></v-divider>
    <v-expand-transition>
      <v-progress-linear
        v-show="loading"
        indeterminate
        color="primary"
      ></v-progress-linear>
    </v-expand-transition>
    <v-list three-line class="pa-0">
      <v-list-item-group class="pa-0">
        <v-scroll-y-transition group>
          <ProfileFollowerListItem
            v-for="(follower, i) in followers"
            :key="i"
            :total="followers.length"
            :index="i"
            :follower="follower"
            @fetchMore="fetchMore"
          />
        </v-scroll-y-transition>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import ProfileFollowerListItem from '~/components/common/profiles/ProfileFollowerListItem.vue'
export default {
  name: 'ProfileFollowersList',
  components: { ProfileFollowerListItem },
  props: ['profile', 'socket'],
  data: () => ({
    tab: 0,
    items: ['Followers', 'Requests'],
    loading: false,
    followers: [],
    total: 0,
    pages: 0,
    page: 1,
    limit: 20,
    searchTerm: '',
    next: null,
    fetchOnServer: false,
  }),
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      let url
      if (this.searchTerm) {
        url = new URL(
          `${this.$store.getters.profilePath}/me/following/search?q=${
            this.searchTerm
          }&page=${this.next ? this.next : this.page}&limit=${this.limit}`
        )
      } else {
        url = new URL(
          `${this.$store.getters.profilePath}/me/following?page=${
            this.next ? this.next : this.page
          }&limit=${this.limit}`
        )
      }
      console.log({ url })
      const results = await this.$axios.$get(url.href)
      console.log({ results })
      const {
        data: { data, limit, page, pages, total, next },
      } = results
      this.followers = data
      this.limit = limit
      this.page = page
      this.total = total
      this.pages = pages
      this.next = next
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  watch: {
    searchTerm: debounce(async function (value) {
      console.log({ value })
      await this.$fetch()
    }, 500),
  },
  async mounted() {
    await this.$fetch()
    if (this.socket) {
      this.socket.on('FOLLOWED_YOU', (data) => {
        console.log('FOLLOWED_YOU')
        this.followedYou(data)
      })
      this.socket.on('UNFOLLOWED_YOU', (data) => {
        console.log('UNFOLLOWED_YOU')
        this.unfollowedYou(data)
      })
    }
  },
  methods: {
    async clearSearch(e) {
      console.log({ e, searchTerm: this.searchTerm })
      this.searchTerm = ''
      this.next = null
      await this.$fetch
    },
    async fetchMore() {
      console.log('Fetch more')
      if (this.next) {
        await this.$fetch()
      }
    },
    followedYou(data) {
      const index = this.followers.findIndex(
        (x) => x.followerId === data.followerId
      )
      console.log({ data, index })
      if (index > -1) {
        if (this.followers[index]) this.followers[index].followsYou = true
        if (this.followers[index]) this.followers[index].recievedRequest = false
      } else {
        this.followers.unshift(data)
        this.total += 1
      }
    },
    unfollowedYou(data) {
      console.log({ data })
      const index = this.followers.findIndex(
        (x) => x.followerId === data.followerId
      )
      console.log({ data, index })
      if (index > -1) {
        this.followers.splice(index, 1)
      }
      this.total -= 1
    },
  },
}
</script>

<style></style>
