<template>
  <v-card class="elevated-light rounded-xl mb-4 pa-0">
    <!-- <v-card-title class="px-4 pt-3 pb-1">Suggested Profiles</v-card-title> -->
    <v-card-text class="pa-0">
      <v-card-text class="pb-1 pt-3"> Suggested Profiles </v-card-text>
      <v-list two-line class="py-0">
        <v-list-item-group>
          <div v-for="(profile, i) in suggestedProfiles" :key="i">
            <v-skeleton-loader
              :boilerplate="false"
              :loading="loading"
              type="list-item-avatar-two-line"
              :tile="false"
              class="mx-auto"
            >
              <ProfilePreviewListItemSmall :profile="profile" />
            </v-skeleton-loader>
          </div>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-actions class="px-4 pt-1 d-flex justify-center">
      <a href="" class="subtitle-2">Show more</a>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProfilePreviewListItemSmall from './ProfilePreviewListItemSmall.vue'
export default {
  components: { ProfilePreviewListItemSmall },
  data: () => ({
    loading: true,
    suggestedProfiles: [
      {
        displayName: 'Jane Doe',
        username: 'janedoe',
        avatar: 'https://randomuser.me/api/portraits/women/80.jpg',
      },
      {
        displayName: 'Dude with a really long username that doesnt quite fit',
        username: 'johndoe',
        avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
      },
      {
        displayName: 'John Doe',
        username: 'personwithareallylongusername',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      },
    ],
  }),
  fetchOnServer: false,
  async fetch() {
    try {
      this.loading = true
      const { data } = await this.$axios.$get(
        `${this.$store.getters.profilePath}/u/suggested`
      )
      console.log({ data, context: this.$nuxt.context })
      this.suggestedProfiles = data
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  async mounted() {
    await this.$fetch()
    await this.connectUser()
    // this.socket.on('PULSE', (data) => {
    //   console.log({ data })
    // })
    this.socket.on('USER_CONNECTED', (data) => {
      console.log('USER_CONNECTED')
      console.log({ data })
    })
    this.socket.on('FOLLOWED_YOU', (data) => {
      console.log('FOLLOWED_YOU')
      this.followedYou(data)
    })
    this.socket.on('UNFOLLOWED_YOU', (data) => {
      console.log('UNFOLLOWED_YOU')
      this.unfollowedYou(data)
    })
    this.socket.on('YOU_FOLLOWED', (data) => {
      console.log('YOU_FOLLOWED')
      this.youFollowed(data)
    })
    this.socket.on('YOU_UNFOLLOWED', (data) => {
      console.log('YOU_UNFOLLOWED')
      this.youUnfollowed(data)
    })
  },
  async created() {
    this.socket = await this.$nuxtSocket({
      name: 'profile',
      // channel: '',
      reconnection: true,
      autoconnect: true,
      // path: `${this.$store.getters.profilePath}/socket`,
      path: '/api/v1/profile/socket',
    })
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  methods: {
    async connectUser() {
      if (this.$store.getters['auth/isLoggedIn']) {
        console.log('Emitting event')
        await this.socket.emit(
          'USER_CONNECTED',
          this.$store.getters['auth/user']
        )
      }
    },
    youFollowed(followData) {
      const index = this.suggestedProfiles.findIndex(
        (x) => x.userId === followData.followingId
      )
      this.suggestedProfiles[index].followedByYou = true
    },
    youUnfollowed(followData) {
      const index = this.suggestedProfiles.findIndex(
        (x) => x.userId === followData.followingId
      )
      this.suggestedProfiles[index].followedByYou = false
    },
    followedYou(followData) {
      const index = this.suggestedProfiles.findIndex(
        (x) => x.userId === followData.followerId
      )
      this.suggestedProfiles[index].followsYou = true
    },
    unfollowedYou(followData) {
      const index = this.suggestedProfiles.findIndex(
        (x) => x.userId === followData.followerId
      )
      this.suggestedProfiles[index].followsYou = false
    },
  },
}
</script>

<style></style>
