<template>
  <div>
    <div>
      <!-- Important updates / Messages -->
      <v-container>
        <!-- Maybe Some ads - Sponsored profiles / listings / posts -->
        <v-row>
          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3" xl="2">
            <div
              style="
                position: sticky;
                left: 20px;
                right: 60px;
                bottom: 5px;
                top: 80px;
              "
            >
              <ExploreNavigation />
              <!-- Ad / Sponsored Content area -->
            </div>
          </v-col>
          <v-col cols="12" md="9" xl="10">
            <!-- :profile-socket="profileSocket"
            :post-socket="postSocket"
            :sockets-ready="socketsReady" -->
            <nuxt-child />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ExploreNavigation from '~/components/blocks/ExploreNavigation.vue'
export default {
  name: 'IndexPage',
  components: { ExploreNavigation },
  layout: 'admin',
  scrollToTop: true,
  data() {
    return {
      // profileSocket: {},
      // postSocket: {},
      // notificationSocket: {},
      // chatSocket: {},
      // socketsReady: false,
      mainRoutes: [
        {
          title: 'Community',
          icon: 'mdi-account-group-outline',
          to: 'index',
          activeRoutes: ['index'],
          badgeCount: 0,
        },
        {
          title: 'Listings',
          icon: 'mdi-home-city-outline',
          to: 'index-listings',
          activeRoutes: ['index-listings'],
          badgeCount: 6,
        },
        {
          title: 'Personal Ads',
          icon: 'mdi-bullhorn-outline',
          to: 'index-people',
          activeRoutes: ['index-people'],
          badgeCount: 0,
        },
        {
          title: 'Services',
          icon: 'mdi-account-hard-hat-outline',
          to: 'index-services',
          activeRoutes: ['index-services'],
          badgeCount: 0,
        },
      ],
    }
  },
  // async mounted() {
  //   await this.connectSockets()
  //   await this.connectUser()
  //   this.socketsReady = true
  // },
  methods: {
    // async connectSockets() {
    //   this.profileSocket = await this.$nuxtSocket({
    //     name: 'profile',
    //     reconnection: true,
    //     autoconnect: true,
    //     path: '/api/v1/profile/socket',
    //   })
    // },
    // async connectUser() {
    //   if (this.$store.getters['auth/isLoggedIn']) {
    //     console.log('Connecting User Socket')
    //     await this.profileSocket.emit(
    //       'USER_CONNECTED',
    //       this.$store.getters['auth/user']
    //     )
    //   }
    // },
  },
}
</script>
