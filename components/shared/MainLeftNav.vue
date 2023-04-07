<template>
  <v-navigation-drawer
    v-model="nav"
    :style="{
      backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff',
      minHeight: '100%',
      border: 'none',
      minWidth: $vuetify.breakpoint.smAndDown ? '80vw' : '',
      zIndex: 7,
    }"
    class="elevated-light"
    app
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
            <div class="d-flex align-center mt-4">
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
            </div>
          </v-col>
        </v-row>
      </v-img>
      <div class="mt-16">
        <div v-if="isLoggedIn" class="ml-4 mr-8">
          <div v-for="(item, i) in mainRoutes" :key="i">
            <NavButton
              :title="item.title"
              :icon="item.icon"
              :to="item.to"
              :active-routes="item.activeRoutes"
              :badge-count="item.badgeCount"
            />
          </div>
        </div>
        <div v-else class="ml-4 mr-8">
          <div v-for="(item, i) in notLoggedInRoutes" :key="i">
            <NavButton
              :title="item.title"
              :icon="item.icon"
              :to="item.to"
              :active-routes="item.activeRoutes"
              :badge-count="item.badgeCount"
            />
          </div>
        </div>

        <!-- <div class="ml-4 mr-8">
          <v-hover v-slot="{ hover }">
            <v-card
              flat
              class="py-3 mb-4 d-flex pl-6"
              :class="{
                'elevated-light': hover || $route.name === 'dashboard',
                primary: $route.name == 'dashboard',
              }"
              style="
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              "
              @click="goToUserDashboard"
            >
              <div class="d-flex align-center">
                <p
                  class="mb-0 ml-2"
                  :class="
                    $route.name == 'dashboard'
                      ? 'white--text font-weight-bold'
                      : ''
                  "
                >
                  Dashboard
                </p>
              </div>
            </v-card>
          </v-hover>
        </div> -->
        <CreateButton
          v-if="isLoggedIn"
          @show-create-post-modal="$emit('show-create-post-modal')"
        />
        <!-- <div class="ml-4 mr-8">
          <v-hover v-slot="{ hover }">
            <v-card
              flat
              class="py-3 mb-4 d-flex pl-6"
              :class="{
                'elevated-light': hover,
              }"
              style="
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              "
              @click="logout"
            >
              <div class="d-flex align-center">
                <p class="mb-0 ml-2">Logout</p>
              </div>
            </v-card>
          </v-hover>
        </div> -->
      </div>
      <v-spacer></v-spacer>
      <ProfileButton />
    </div>
  </v-navigation-drawer>
</template>

<script>
// import { mapActions } from 'vuex';
import { mapGetters } from 'vuex'
import CreateButton from '../common/CreateButton.vue'
import NavButton from '../common/NavButton.vue'
import ProfileButton from '../common/ProfileButton.vue'

export default {
  components: { CreateButton, NavButton, ProfileButton },
  data: () => ({
    type: 'default (no property)',
    clipped: false,
    floating: false,
    mini: false,
    mainRoutes: [
      {
        title: 'Explore',
        icon: 'mdi-compass-rose',
        to: 'index',
        activeRoutes: [
          'index',
          'index-listings',
          'index-people',
          'index-services',
        ],
        badgeCount: 0,
      },
      {
        title: 'Notifications',
        icon: 'mdi-bell-badge-outline',
        to: 'notifications',
        activeRoutes: ['notifications'],
        badgeCount: 6,
      },
      {
        title: 'Profile',
        icon: 'mdi-account-box-outline',
        to: 'profile-index',
        activeRoutes: [
          'profile-index',
          'profile-index-listings',
          'profile-index-ads',
          'profile-index-services',
        ],
        badgeCount: 0,
      },
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: 'dashboard-index',
        activeRoutes: [
          'dashboard',
          'dashboard-index',
          'dashboard-index-listings',
          'dashboard-index-personals',
          'dashboard-index-posts',
          'dashboard-index-services',
        ],
        badgeCount: 0,
      },
    ],
    notLoggedInRoutes: [
      {
        title: 'Explore',
        icon: 'mdi-compass-rose',
        to: 'index',
        activeRoutes: [
          'index',
          'index-listings',
          'index-people',
          'index-services',
        ],
        badgeCount: 0,
      },
      {
        title: 'Login / Register',
        icon: 'mdi-account-box-outline',
        to: 'auth',
        activeRoutes: ['auth'],
        badgeCount: 0,
      },
    ],
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      profileImage: 'user/profileImage',
      profile: 'user/profile',
      profileWallpaper: 'user/profileWallpaper',
      followerCount: 'user/followerCount',
      followingCount: 'user/followingCount',
    }),
    nav: {
      get() {
        return this.$store.getters['ui/showMainLeftNav']
      },
      set(val) {
        console.log('Setting main Nav')
        return this.$store.commit('ui/toggleMainLeftNav', val)
      },
    },
  },
  mounted() {
    console.log({ breakpoint: this.$vuetify.breakpoint })
  },
  methods: {
    // ...mapActions({
    //   logout: 'auth/logout',
    // }),
    goToUserDashboard() {
      this.$store.commit('ui/toggleUserDashboardLeftNav', true)
      this.$router.push({ name: 'dashboard' })
    },
    async logout() {
      const result = await this.$store.dispatch('auth/logout')
      console.log({ result })
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none;
}
</style>
