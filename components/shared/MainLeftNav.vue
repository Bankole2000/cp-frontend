<template>
  <v-navigation-drawer
    v-model="nav"
    :style="{
      backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff',
      minHeight: '100%',
      border: 'none',
      minWidth: $vuetify.breakpoint.smAndDown ? '80vw' : '',
    }"
    class="elevated-light"
    app
    overflow
  >
    <div style="min-height: 100vh">
      <v-img
        :aspect-ratio="16 / 9"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
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
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                alt="John"
              />
            </v-avatar>
            <div class="heading font-weight-black">Display name</div>
            <div class="subheading">@username</div>
            <div class="d-flex align-center mt-4">
              <div>
                <span>999</span>
                <span class="text--secondary">Following</span>
              </div>
              <v-spacer></v-spacer>
              <div>
                <span>999</span>
                <span class="text--secondary">Followers</span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-img>
      <!-- <v-list
        style="
          background-image: url('https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg');
          background-size: cover;
        "
      >
        <v-list-item class="px-2">
          <v-list-item-avatar size="56">
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Sandra Adams
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

      <!-- <v-divider></v-divider> -->
      <div class="mt-16">
        <div v-for="(item, i) in mainRoutes" :key="i" class="ml-4 mr-8">
          <v-hover v-slot="{ hover }">
            <v-card
              :to="{ name: item.route }"
              flat
              class="py-3 mb-4 d-flex pl-6"
              :class="{
                'elevated-light': hover || $route.name.includes(item.route),
                primary: $route.name.includes(item.route),
              }"
              style="
                border-radius: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
              "
            >
              <div class="d-flex align-center">
                <!-- <DynamicIcon
                v-if="mainRoutes[currentValue] <= item.minValue"
                :icon="item.icon"
                :color="$route.name == item.route ? 'white' : '#888888'"
                :size="24"
              /> -->
                <!-- <v-icon v-else color="success">mdi-check-circle</v-icon> -->
                <p
                  class="mb-0 ml-2"
                  :class="
                    $route.name.includes(item.route)
                      ? 'white--text font-weight-bold'
                      : ''
                  "
                >
                  {{ item.title }}
                </p>
              </div>
            </v-card>
          </v-hover>
        </div>
        <div class="ml-4 mr-8">
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
                <!-- <DynamicIcon
                v-if="mainRoutes[currentValue] <= item.minValue"
                :icon="item.icon"
                :color="$route.name == item.route ? 'white' : '#888888'"
                :size="24"
              /> -->
                <!-- <v-icon v-else color="success">mdi-check-circle</v-icon> -->
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
        </div>
        <div class="ml-4 mr-8">
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
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
// import { mapActions } from 'vuex';
export default {
  data: () => ({
    type: 'default (no property)',
    clipped: false,
    floating: false,
    mini: false,
    mainRoutes: [
      {
        title: 'Explore',
        step: 'profile',
        minValue: 1,
        icon: 'mdi-compass-outline',
        route: 'index',
        to: '/',
      },
      {
        title: 'Notifications',
        icon: 'mdi-view-dashboard',
        to: '/notifications',
        route: 'notifications',
      },
      {
        title: 'Profile',
        icon: 'mdi-account-multiple',
        to: '/profile',
        route: 'profile-index',
      },
      {
        title: 'Create',
        icon: 'mdi-account-multiple',
        to: '/roles',
      },
      // {
      //   title: 'Dashboard',
      //   icon: 'mdi-account-multiple',
      //   to: '/roles',
      // },
    ],
  }),
  computed: {
    nav: {
      get() {
        return this.$store.getters['ui/showMainLeftNav']
      },
      set(val) {
        // if (this.$route.path.includes('dashboard')) {
        //   console.log('Not changing main Nav')
        //   return
        // }
        console.log('Setting main Nav')
        return this.$store.commit('ui/toggleMainLeftNav', val)
      },
    },
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
      await this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none;
}
</style>