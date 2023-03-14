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
      :placeholder="`Search follow requests`"
      append-icon="mdi-send"
      @click:clear="clearSearch"
      @keypress.enter="$fetch"
      @change="() => (next ? (next = null) : null)"
    ></v-text-field>
    <v-expand-transition>
      <div v-show="!!searchTerm" class="caption text--secondary">
        <p class="mb-1">
          Searching <strong>"{{ searchTerm }}"</strong> among your follow
          requests
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
        <v-scroll-y-transition group> </v-scroll-y-transition>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'ProfileFollowerRequestsList',
  props: ['profile', 'socket'],
  data: () => ({
    loading: false,
    followers: [],
    total: 0,
    pages: 0,
    page: 1,
    limit: 20,
    searchTerm: '',
    next: null,
  }),
  fetchOnServer: false,
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      let url
      if (this.searchTerm) {
        url = new URL(
          `${
            this.$store.getters.profilePath
          }/me/follow-requests/sent/search?q=${this.searchTerm}&page=${
            this.next ? this.next : this.page
          }&limit=${this.limit}`
        )
      } else {
        url = new URL(
          `${this.$store.getters.profilePath}/me/follow-requests/sent?page=${
            this.next ? this.next : this.page
          }&limit=${this.limit}`
        )
      }
      console.log({ url })
      const results = await this.$axios.$get(url.href)
      console.log({ results })
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
  methods: {
    async clearSearch(e) {
      console.log({ e, searchTerm: this.searchTerm })
      this.searchTerm = ''
      this.next = null
      await this.$fetch()
    },
  },
}
</script>

<style></style>
