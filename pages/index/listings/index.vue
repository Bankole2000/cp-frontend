<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="7" xl="8">
        <v-row>
          <v-col v-for="i in 6" :key="`${i}-b`" cols="12" xl="6">
            <ListingCardItem class="mb-4" />
          </v-col>
        </v-row>
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
            <v-card-text>Card Text</v-card-text>
          </v-card>
          <v-card class="elevated-light rounded-xl mb-4">
            <v-card-title>Trending</v-card-title>
          </v-card>
          <SuggestedProfilesCard
            :profile-socket="profileSocket"
            :sockets-ready="socketsReady"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'admin',
  props: {},
  data() {
    return {
      postSocket: {},
      profileSocket: {},
      socketsReady: false,
    }
  },
  methods: {
    async connectSockets() {
      this.profileSocket = this.$nuxtSocket({
        name: 'profile',
        reconnection: true,
        autoconnect: true,
        path: '/api/v1/profile/socket',
      })
      this.postSocket = this.$nuxtSocket({
        name: 'post',
        reconnection: true,
        autoconnect: true,
        path: '/api/v1/post/socket',
      })
      if (this.$store.getters['auth/isLoggedIn']) {
        console.log('Connecting User Socket')
        await this.profileSocket.emitP(
          'USER_CONNECTED',
          this.$store.getters['auth/user']
        )
        await this.postSocket.emitP(
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
