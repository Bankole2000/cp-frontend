<template>
  <div class="profile-page">
    <!-- :profile-socket="profileSocket"
    :post-socket="postSocket"
    :sockets-ready="socketsReady" -->
    <nuxt-child />
  </div>
</template>

<script>
export default {
  layout: 'app',
  scrollToTop: true,
  data() {
    return {
      // visible: false,
      // profileSocket: {},
      // postSocket: {},
      // socketsReady: false,
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
    //   this.postSocket = await this.$nuxtSocket({
    //     name: 'post',
    //     reconnection: true,
    //     autoconnect: true,
    //     path: '/api/v1/post/socket',
    //   })
    //   this.notificationSocket = await this.$nuxtSocket({
    //     name: 'notification',
    //     reconnection: true,
    //     autoconnect: true,
    //     path: '/api/v1/notification/socket',
    //   })
    // },
    // async connectUser() {
    //   if (this.$store.getters['auth/isLoggedIn']) {
    //     console.log('Connecting User Socket')
    //     await this.profileSocket.emit(
    //       'USER_CONNECTED',
    //       this.$store.getters['auth/user']
    //     )
    //     await this.postSocket.emit(
    //       'USER_CONNECTED',
    //       this.$store.getters['auth/user']
    //     )
    //     await this.notificationSocket.emit(
    //       'USER_CONNECTED',
    //       this.$store.getters['auth/user']
    //     )
    //   }
    // },
  },
}
</script>

<style></style>
