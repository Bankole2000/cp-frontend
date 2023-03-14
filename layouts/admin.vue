<template>
  <v-app id="sandbox">
    <MainLeftNav />
    <UserDashboardLeftNav />

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      class="elevated-light"
      :extension-height="showSearch ? '56px' : '0px'"
      :style="{
        backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff',
        zIndex: 6,
      }"
      app
    >
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex align-center">
              <v-expand-x-transition>
                <v-icon
                  v-show="$route.name.startsWith('dashboard')"
                  @click="toggleDashboardNav"
                  >mdi-view-dashboard-outline</v-icon
                >
              </v-expand-x-transition>
              <v-app-bar-nav-icon
                v-if="primaryDrawer.type !== 'permanent'"
                @click.stop="showLeftNav = !showLeftNav"
              ></v-app-bar-nav-icon>
              <v-toolbar-title>Relodger</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon small @click.stop="toggleSearch">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon small @click.stop="toggleFullScreen">
                <v-icon>mdi-overscan</v-icon>
              </v-btn>
              <v-switch v-model="$vuetify.theme.dark" hide-details></v-switch>
              <NotificationsMenu />
              <v-badge
                bordered
                color="error"
                content="6"
                overlap
                offset-x="20"
                offset-y="20"
              >
                <v-btn icon @click.stop="showRightNav = !showRightNav">
                  <v-icon>mdi-forum-outline</v-icon>
                </v-btn>
              </v-badge>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <template #extension>
        <v-scroll-y-transition hide-on-leave>
          <div v-show="showSearch">
            <v-container>
              <div class="d-flex align-center justify-center">
                <CountrySelectButton />
                <div>
                  <v-text-field
                    placeholder="Search By City or State"
                    rows="1"
                    prepend-inner-icon="mdi-magnify"
                    auto-grow
                    hide-details
                    filled
                    dense
                    rounded
                    single-line
                  >
                  </v-text-field>
                </div>
              </div>
            </v-container>
          </div>
        </v-scroll-y-transition>
      </template>
    </v-app-bar>
    <v-main :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'">
      <Nuxt />
      <MultiSnackBars />
      <ChatContactsModal />
    </v-main>
    <MainRightNav />
    <CreatePostModal />
    <MainBottomNav
      v-if="$route.name.startsWith('index') && $vuetify.breakpoint.smAndDown"
    />
  </v-app>
</template>

<script>
import MultiSnackBars from '~/components/shared/SnackBars.vue'
import MainLeftNav from '~/components/shared/MainLeftNav.vue'
import MainRightNav from '~/components/shared/MainRightNav.vue'
import UserDashboardLeftNav from '~/components/shared/UserDashboardLeftNav.vue'
import MainBottomNav from '~/components/shared/MainBottomNav.vue'
import CreatePostModal from '~/components/modals/CreatePostModal.vue'
import NotificationsMenu from '~/components/shared/NotificationsMenu.vue'
export default {
  name: 'Admin',
  components: {
    MultiSnackBars,
    MainLeftNav,
    MainRightNav,
    UserDashboardLeftNav,
    MainBottomNav,
    CreatePostModal,
    NotificationsMenu,
  },
  middleware: 'getUserIfLoggedIn',
  data: () => ({
    drawers: ['Default (no property)', 'Permanent', 'Temporary'],
    primaryDrawer: {
      model: null,
      type: 'default (no property)',
      clipped: false,
      floating: false,
      mini: false,
    },
    footer: {
      inset: true,
    },
    right: true,
    rightDrawer: false,
    clipped: false,
    bottomNav: 3,
    showSearch: false,
  }),
  computed: {
    showLeftNav: {
      get() {
        return this.$store.state.ui.showMainLeftNav
      },
      set(v) {
        this.$store.commit('ui/toggleUserDashboardLeftNav', false)
        return this.$store.commit('ui/toggleMainLeftNav', v)
      },
    },
    showRightNav: {
      get() {
        return this.$store.state.ui.showMainRightNav
      },
      set(v) {
        return this.$store.commit('ui/toggleMainRightNav', v)
      },
    },
    color() {
      switch (this.bottomNav) {
        case 0:
          return 'blue-grey'
        case 1:
          return 'teal'
        case 2:
          return 'brown'
        case 3:
          return 'indigo'
        default:
          return 'blue-grey'
      }
    },
  },
  mounted() {
    this.$store.commit('ui/setMessages', [])
    // setTimeout(() => {
    //   this.showSearch = true
    // }, 1000)
  },
  methods: {
    toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    },
    toggleDashboardNav() {
      this.$store.commit('ui/toggleUserDashboardLeftNav')
    },
    toggleSearch() {
      this.showSearch = !this.showSearch
    },
  },
}
</script>
