<template>
  <div class="profile-followers">
    <v-container fluid>
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-tabs v-model="tab" grow background-color="transparent">
            <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-tabs-items v-model="tab" style="background-color: transparent">
            <v-tab-item
              :value="items.indexOf('Followers')"
              style="background-color: transparent"
            >
              <ProfileFollowersList :profile="profile" :socket="socket" />
            </v-tab-item>
            <v-tab-item
              :value="items.indexOf('Requests')"
              style="background-color: none"
            >
              <ProfileFollowerRequestsList
                :profile="profile"
                :socket="socket"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { debounce } from 'lodash'
// import ProfileFollowerListItem from '~/components/common/profiles/ProfileFollowerListItem.vue'
import ProfileFollowersList from '~/components/common/profiles/ProfileFollowersList.vue'
import ProfileFollowerRequestsList from '~/components/common/profiles/ProfileFollowerRequestsList.vue'
export default {
  components: {
    // ProfileFollowerListItem,
    ProfileFollowersList,
    ProfileFollowerRequestsList,
  },
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
          `${this.$store.getters.profilePath}/me/followers/search?q=${
            this.searchTerm
          }&page=${this.next ? this.next : this.page}&limit=${this.limit}`
        )
      } else {
        url = new URL(
          `${this.$store.getters.profilePath}/me/followers?page=${
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
      this.limit = limit
      this.page = page
      this.total = total
      this.pages = pages
      this.next = next
      if (this.page > 1) {
        if (this.followers.length < this.total) {
          this.followers.push(...data)
        }
      } else {
        this.followers = data
      }
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
    this.socket.on('FOLLOWED_YOU', (data) => {
      console.log('FOLLOWED_YOU')
      this.followedYou(data)
    })
    this.socket.on('UNFOLLOWED_YOU', (data) => {
      console.log('UNFOLLOWED_YOU')
      this.unfollowedYou(data)
    })
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
