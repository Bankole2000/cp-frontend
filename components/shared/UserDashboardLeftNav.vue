<template>
  <v-navigation-drawer
    v-model="nav"
    :style="{
      backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff',
      minHeight: '100%',
      border: 'none',
      zIndex: 8,
      minWidth: $vuetify.breakpoint.smAndDown ? '80vw' : '',
      zIndex: 7,
    }"
    absolute
    fixed
    class="elevated-light"
    overflow
  >
    <div
      style="
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
      "
    >
      <v-img
        :aspect-ratio="16 / 9"
        style="flex-grow: 0"
        :src="profileWallpaper"
      >
        <v-row
          align="start"
          class="px-4 pb-4 pt-0 my-0 fill-height"
          :class="
            $vuetify.theme.dark
              ? 'bg-gradient-top-dark'
              : 'bg-gradient-top-light'
          "
        >
          <v-col>
            <v-avatar size="50" class="mb-2">
              <img :src="profileImage" alt="John" />
            </v-avatar>
            <div v-if="profile">
              <div class="heading font-weight-black">
                {{ profile.displayname }}
              </div>
              <div class="subheading">@{{ profile.username }}</div>
            </div>
            <!-- <div class="d-flex align-center mt-4">
              <div>
                <span class="font-weight-black">{{
                  followingCount | count
                }}</span>
                <span class="text--secondary">Following</span>
              </div>
              <v-spacer></v-spacer>
              <div>
                <span class="font-weight-black">{{
                  followerCount | count
                }}</span>
                <span class="text--secondary">Followers</span>
              </div>
            </div> -->
          </v-col>
        </v-row>
      </v-img>
      <div class="mt-16">
        <div v-if="isLoggedIn" class="ml-4 mr-8">
          <NavButton
            title="Home"
            icon="mdi-arrow-left"
            to="index"
            :active-routes="[]"
            :badge-count="null"
            @click="nav = false"
          />
          <div v-for="(item, i) in mainRoutes" :key="i">
            <NavButton
              :title="item.title"
              :icon="item.icon"
              :to="item.to"
              :active-routes="item.activeRoutes"
              :badge-count="item.badgeCount"
            />
          </div>
          <NavButton
            title="Admin"
            icon="mdi-security"
            to="dashboard-admin"
            :active-routes="[]"
            :badge-count="null"
            @click="nav = false"
          />
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import NavButton from '../common/NavButton.vue'

export default {
  components: { NavButton },
  data() {
    return {
      mainRoutes: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard-outline',
          to: 'dashboard-index',
          route: '/dashboard/',
          activeRoutes: ['dashboard-index'],
          badgeCount: 0,
        },
        {
          title: 'Posts',
          icon: 'mdi-post-outline',
          to: 'dashboard-index-posts',
          route: '/dashboard/posts',
          activeRoutes: ['dashboard-index-posts'],
          badgeCount: 0,
        },
        {
          title: 'Listings',
          icon: 'mdi-home-account',
          to: 'dashboard-index-listings',
          activeRoutes: ['dashboard-index-listings'],
          badgeCount: 6,
        },
        {
          title: 'Bookings',
          icon: 'mdi-calendar',
          to: 'dashboard-index-bookings',
          activeRoutes: ['dashboard-index-bookings'],
          badgeCount: 6,
        },
        {
          title: 'Services',
          icon: 'mdi-account-box-outline',
          to: 'dashboard-index-services',
          activeRoutes: ['dashboard-index-services'],
          badgeCount: 0,
        },
        {
          title: 'Personal Ads',
          icon: 'mdi-view-dashboard-outline',
          to: 'dashboard-index-personals',
          activeRoutes: ['dashboard-index-personals'],
          badgeCount: 0,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      showMainNav: 'ui/showMainLeftNav',
      isLoggedIn: 'auth/isLoggedIn',
      profileImage: 'user/profileImage',
      profile: 'user/profile',
      profileWallpaper: 'user/profileWallpaper',
    }),
    nav: {
      get() {
        return this.$store.getters['ui/showUserDashboardLeftNav']
      },
      set(val) {
        return this.$store.commit('ui/toggleUserDashboardLeftNav', val)
      },
    },
  },
  methods: {
    openMainNav() {
      this.$store.commit('ui/toggleUserDashboardLeftNav', false)
      // if (!this.showMainNav) {
      //   this.$store.commit('ui/toggleMainLeftNav', true)
      // }
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none;
}
</style>
