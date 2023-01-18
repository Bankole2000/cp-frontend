<template>
  <div class="main-bottom-nav">
    <!-- :color="color" -->
    <v-bottom-navigation
      v-model="bottomNav"
      :background-color="color"
      :inset="true"
      grow
      shift
      height="56px"
      app
      @change="changeBottomNav"
    >
      <div
        :style="{
          width: showLeftNav ? '255px' : '0px',
          transition: 'all 0.2s ease-in-out',
        }"
      ></div>
      <!-- <template v-slot>
        <div class="d-flex">
          <v-btn>
            <span>Community</span>
            <v-icon>mdi-google-circles-communities</v-icon>
          </v-btn>
          <v-btn>
            <span>Community</span>
            <v-icon>mdi-google-circles-communities</v-icon>
          </v-btn>
          <v-btn>
            <span>Community</span>
            <v-icon>mdi-google-circles-communities</v-icon>
          </v-btn>
          <v-btn>
            <span>Community</span>
            <v-icon>mdi-google-circles-communities</v-icon>
          </v-btn>
          <v-btn>
            <span>Profile</span>
            <v-avatar size="40" color="white">
              <img :src="profileImage" />
            </v-avatar>
          </v-btn>
        </div>
      </template> -->
      <v-btn>
        <span>Community</span>
        <v-icon>mdi-google-circles-communities</v-icon>
      </v-btn>

      <v-btn>
        <span>Listings</span>
        <v-icon>mdi-home-city-outline</v-icon>
      </v-btn>

      <v-btn>
        <span>People</span>
        <v-icon>mdi-account-group-outline</v-icon>
      </v-btn>

      <v-btn>
        <span>Services</span>
        <v-icon>mdi-account-hard-hat-outline</v-icon>
      </v-btn>
      <!-- <v-btn>
        <span>Profile</span>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn> -->
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      bottomNav: 0,
      routes: [
        'index',
        'index-listings',
        'index-people',
        'index-services',
        'profile-index',
      ],
    }
  },
  computed: {
    ...mapGetters({
      profileImage: 'user/profileImage',
      showLeftNav: 'ui/showMainLeftNav',
    }),
    // showLeftNav() {
    //   return this.$store.state.showMainLeftNav
    // },
    color() {
      switch (this.bottomNav) {
        case 0:
          return 'primary'
        case 1:
          return 'info'
        case 2:
          return 'accent'
        case 3:
          return 'warning'
        case 4:
          return 'success'
        default:
          return 'blue-grey'
      }
    },
  },
  methods: {
    changeBottomNav(e) {
      console.log({ e })
      this.$router.push({ name: this.routes[e] })
    },
  },
}
</script>

<style>
</style>