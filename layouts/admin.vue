<template>
  <v-app id="sandbox">
    <MainLeftNav />
    <UserDashboardLeftNav />

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      class="elevated-light"
      :extension-height="showSearch ? '56px' : '0px'"
      :style="{ backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff' }"
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
              <!-- <v-badge
                bordered
                color="error"
                content="6"
                overlap
                offset-x="20"
                offset-y="20"
                class="mx-1"
              >
                <v-btn icon>
                  <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
              </v-badge> -->
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
      <!-- <div>
        <v-switch v-model="$vuetify.theme.dark"></v-switch>
      </div> -->

      <!-- <div>
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
        >
        </v-textarea>
      </div> -->
      <!-- <template #extension>
        <div>
          <v-toolbar dark color="teal">
           
            <v-autocomplete
              cache-items
              class="mx-4"
              flat
              hide-no-data
              hide-details
              label="What state are you from?"
              solo-inverted
            ></v-autocomplete>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </div>
      </template> -->
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
      <!-- <template #extension>
        <v-tabs grow show-arrows>
          <v-tab>
            <v-icon>mdi-post-outline</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-home-account</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-bullhorn-outline</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-account-hard-hat-outline</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-account-arrow-left-outline</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-account-arrow-right-outline</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-bookmark-box-multiple-outline</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>mdi-timeline-text-outline</v-icon>
          </v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>
    <!-- <v-toolbar color="white" floating dense extense>
      <v-flex xs12 sm12 md12>
        <v-text-field hide-details single-line full-width></v-text-field>
      </v-flex>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar> -->
    <v-main :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'">
      <Nuxt />
      <MultiSnackBars />
      <!-- <v-container>
        <v-row>
          <v-col cols="12">
            <div
              class="bg-gradient-right-primary elevated-light pa-4 rounded-lg"
            >
              something
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="10">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <span>Scheme</span>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      primary
                      label="Dark"
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" md="6">
                    <span>Drawer</span>
                    <v-radio-group v-model="primaryDrawer.type" column>
                      <v-radio
                        v-for="drawer in drawers"
                        :key="drawer"
                        :label="drawer"
                        :value="drawer.toLowerCase()"
                        primary
                      ></v-radio>
                    </v-radio-group>
                    <v-switch
                      v-model="primaryDrawer.clipped"
                      label="Clipped"
                      primary
                    ></v-switch>
                    <v-switch
                      v-model="primaryDrawer.floating"
                      label="Floating"
                      primary
                    ></v-switch>
                    <v-switch
                      v-model="primaryDrawer.mini"
                      label="Mini"
                      primary
                    ></v-switch>
                  </v-col>
                  <v-col cols="12" md="6">
                    <span>Footer</span>
                    <v-switch
                      v-model="footer.inset"
                      label="Inset"
                      primary
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text>Cancel</v-btn>
                <v-btn text color="primary">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container> -->
      <ChatContactsModal />
    </v-main>
    <!-- :temporary="false" -->
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      fixed
      :clipped="clipped"
      :style="{ backgroundColor: $vuetify.theme.dark ? '#272727' : '#ffffff' }"
      app
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <MainRightNav />
    <!-- <v-footer
      :inset="true"
      class="elevated-light"
      :absolute="$vuetify.breakpoint.smAndDown"
      :style="{ backgroundColor: $vuetify.theme.dark ? '#1e1e1e' : '#ffffff' }"
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
    <!-- :width="showLeftNav ? 'calc(100vw - 255px)' : '100vw'" -->
    <!-- <v-bottom-navigation
      v-model="bottomNav"
      :inset="true"
      :background-color="color"
      grow
      shift
      app
    >
      <div
        :style="{
          width: showLeftNav ? '255px' : '0px',
          transition: 'all 0.2s ease-in-out',
        }"
      ></div>
      <v-btn>
        <span>Video</span>
        <v-icon>mdi-television-play</v-icon>
      </v-btn>

      <v-btn>
        <span>Music</span>
        <v-icon>mdi-music-note</v-icon>
      </v-btn>

      <v-btn>
        <span>Book</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>

      <v-btn>
        <span>Image</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
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
        // if (this.$route.path.includes('/dashboard')) {
        //   if (
        //     this.$store.state.ui.showMainLeftNav &&
        //     this.$store.state.ui.showUserDashboardLeftNav
        //   ) {
        //     // this.$store.commit('ui/toggleMainLeftNav')
        //     return this.$store.commit('ui/toggleUserDashboardLeftNav')
        //   }
        //   if (
        //     this.$store.state.ui.showMainLeftNav &&
        //     !this.$store.state.ui.showUserDashboardLeftNav
        //   ) {
        //     return this.$store.commit('ui/toggleUserDashboardLeftNav', true)
        //   }
        //   if (
        //     !this.$store.state.ui.showMainLeftNav &&
        //     this.$store.state.ui.showUserDashboardLeftNav
        //   ) {
        //     return this.$store.commit('ui/toggleUserDashboardLeftNav')
        //   }
        //   if (
        //     !this.$store.state.ui.showMainLeftNav &&
        //     !this.$store.state.ui.showUserDashboardLeftNav
        //   ) {
        //     this.$store.commit('ui/toggleMainLeftNav', true)
        //     return this.$store.commit('ui/toggleUserDashboardLeftNav', true)
        //   }
        // }
        // if (this.$route.path.includes('/dashboard')) {
        //   if (
        //     this.$store.state.ui.showMainLeftNav &&
        //     !this.$store.state.ui.showUserDashboardLeftNav
        //   ) {
        //     return this.$store.commit('ui/toggleMainLeftNav')
        //   }
        //   if (!this.$store.state.ui.showMainLeftNav) {
        //     this.$store.commit('ui/toggleMainLeftNav')
        //   }
        //   return this.$store.commit('ui/toggleUserDashboardLeftNav')
        // }
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
