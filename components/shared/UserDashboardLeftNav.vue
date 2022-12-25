<template>
  <v-navigation-drawer
    v-model="nav"
    :style="{
      backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff',
      minHeight: '100%',
      border: 'none',
      zIndex: 8,
      minWidth: $vuetify.breakpoint.smAndDown ? '80vw' : '',
    }"
    absolute
    class="elevated-light"
    overflow
  >
    <div>
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
                src="https://randomuser.me/api/portraits/women/85.jpg"
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
    </div>
    <div class="ml-4 mr-8">
      <v-hover v-slot="{ hover }">
        <v-card
          flat
          class="py-4 mb-4 d-flex pl-6"
          :class="{
            'elevated-light': hover || $route.name === 'dashboard',
            primary: $route.name == 'dashboard',
          }"
          style="
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
          "
          @click="openMainNav"
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
                $route.name == 'dashboard' ? 'white--text font-weight-bold' : ''
              "
            >
              Back
            </p>
          </div>
        </v-card>
      </v-hover>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
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
      this.$store.commit('ui/toggleMainLeftNav', true)
    },
  },
}
</script>

<style scoped>
.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none;
}
</style>