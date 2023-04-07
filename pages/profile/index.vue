<template>
  <div>
    <div ref="header">
      <ProfileHeader
        :profile="profile"
        :profile-image="profileImage"
        :profile-loaded="profileLoaded"
        :profile-wallpaper="profileWallpaper"
        @showEditProfileModal="showEditProfileModal = true"
      />
    </div>
    <v-container :fluid="$vuetify.breakpoint.mdAndDown">
      <v-row>
        <v-col cols="12" sm="8" xl="9">
          <v-container :fluid="$vuetify.breakpoint.mdAndDown">
            <v-row>
              <v-col
                v-if="!$vuetify.breakpoint.smAndDown"
                cols="4"
                class="pt-8"
                xl="3"
              >
                <ProfileNavigation :routes="mainRoutes" />
              </v-col>
              <v-col cols="12" md="8" sm="12" class="pt-8 mt-16" xl="9">
                <div v-if="$vuetify.breakpoint.smAndDown">
                  <MobileProfileActions
                    :profile="profile"
                    @showEditProfileModal="showEditProfileModal = true"
                  />
                  <MobileProfileDetails
                    v-if="$vuetify.breakpoint.xs"
                    :profile="profile"
                    :follower-count="followerCount"
                    :following-count="followingCount"
                  />
                </div>
                <!-- :profile-socket="profileSocket"
                :post-socket="postSocket"
                :sockets-ready="socketsReady" -->
                <nuxt-child :profile="profile" style="margin-bottom: 50vh" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4" xl="3">
          <ProfileDetails
            :profile="profile"
            :follower-count="followerCount"
            :following-count="followingCount"
            :profile-image="profileImage"
            :visible="visible"
            @showEditProfileModal="showEditProfileModal = true"
          />
        </v-col>
      </v-row>
    </v-container>
    <ProfileBottomNavigation
      :profile="profile"
      :visible="visible"
      :routes="mainRoutes"
      :profile-image="profileImage"
      :show-left-nav="showLeftNav"
      @showEditProfileModal="showEditProfileModal = true"
    />
    <ProfileEditModal
      :dialog="showEditProfileModal"
      @close="showEditProfileModal = false"
    />
    <ListingPreviewModal />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileProfileActions from '~/components/blocks/profile/own-profile/own-profile-pieces/MobileProfileActions.vue'
import MobileProfileDetails from '~/components/blocks/profile/own-profile/own-profile-pieces/MobileProfileDetails.vue'
import ProfileBottomNavigation from '~/components/blocks/profile/own-profile/ProfileBottomNavigation.vue'
import ProfileDetails from '~/components/blocks/profile/own-profile/ProfileDetails.vue'
import ProfileHeader from '~/components/blocks/profile/own-profile/ProfileHeader.vue'
import ProfileNavigation from '~/components/blocks/profile/own-profile/ProfileNavigation.vue'
import ProfileEditModal from '~/components/modals/ProfileEditModal.vue'
export default {
  components: {
    ProfileEditModal,
    ProfileHeader,
    ProfileNavigation,
    MobileProfileDetails,
    ProfileDetails,
    ProfileBottomNavigation,
    MobileProfileActions,
  },
  layout: 'admin',
  props: {
    // profileSocket: {
    //   type: Object,
    //   required: true,
    // },
    // postSocket: {
    //   type: Object,
    //   required: true,
    // },
    // socketsReady: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
  },
  // scrollToTop: true,
  data() {
    return {
      visible: false,
      bottomNav: 'profile-index',
      // listenersActive: false,
      showEditProfileModal: false,
      profileSocket: {},
      // socket: null,
      mainRoutes: [
        {
          title: 'Posts',
          icon: 'mdi-post-outline',
          to: 'profile-index',
          route: '/profile/',
          activeRoutes: ['profile-index'],
          badgeCount: 999999999,
        },
        {
          title: 'Listings',
          icon: 'mdi-home-account',
          to: 'profile-index-listings',
          route: '/profile/listings',
          activeRoutes: ['profile-index-listings'],
          badgeCount: 999999999,
        },
        // {
        //   title: 'Personals',
        //   icon: 'mdi-bullhorn-outline',
        //   to: 'profile-index-ads',
        //   route: '/profile/ads',
        //   activeRoutes: ['profile-index-ads'],
        //   badgeCount: 999999999,
        // },
        // {
        //   title: 'Services',
        //   icon: 'mdi-account-hard-hat-outline',
        //   to: 'profile-index-services',
        //   route: '/profile/services',
        //   activeRoutes: ['profile-index-services'],
        //   badgeCount: 999999999,
        // },
        {
          title: 'Followers',
          icon: 'mdi-account-multiple-plus-outline',
          to: 'profile-index-followers',
          route: '/profile/followers',
          activeRoutes: ['profile-index-followers'],
          badgeCount: 999999999,
        },
        {
          title: 'Following',
          icon: 'mdi-account-arrow-right-outline',
          to: 'profile-index-following',
          route: '/profile/following',
          activeRoutes: ['profile-index-following'],
          badgeCount: 999999999,
        },
        {
          title: 'Saved',
          icon: 'mdi-bookmark-box-multiple-outline',
          to: 'profile-index-saved',
          route: '/profile/saved',
          activeRoutes: ['profile-index-saved'],
          badgeCount: 999999999,
        },
        {
          title: 'Timeline',
          icon: 'mdi-timeline-text-outline',
          to: 'profile-index-timeline',
          route: '/profile/timeline',
          activeRoutes: ['profile-index-timeline'],
          badgeCount: 999999999,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      profile: 'user/profile',
      profileImage: 'user/profileImage',
      profileWallpaper: 'user/profileWallpaper',
      followerCount: 'user/followerCount',
      followingCount: 'user/followingCount',
      showLeftNav: 'ui/showMainLeftNav',
    }),
    profileLoaded() {
      return Boolean(this.profile)
    },
  },
  // watch: {
  //   async socketsReady(newVal) {
  //     if (newVal) {
  //       await this.startSocketListeners()
  //     }
  //   },
  // },
  mounted() {
    this.onElementObserved()
    // this.connectSockets()
    // if (this.socketsReady) {
    //   await this.startSocketListeners()
    // }
  },
  methods: {
    // async startSocketListeners() {
    //   if (this.listenersActive) return
    //   await this.profileSocket.on('USER_CONNECTED', (data) => {
    //     console.log('USER_CONNECTED')
    //     console.log({ data })
    //   })
    //   this.listenersActive = true
    // },
    // connectSockets() {
    //   this.profileSocket = this.$nuxtSocket({
    //     name: 'profile',
    //     reconnection: true,
    //     autoconnect: true,
    //     path: '/api/v1/profile/socket',
    //   })
    //   if (this.$store.getters['auth/isLoggedIn']) {
    //     // console.log('Connecting User Socket')
    //     this.profileSocket.emit(
    //       'USER_CONNECTED',
    //       this.$store.getters['auth/user']
    //     )
    //   }
    // },
    onElementObserved() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            console.log('Is Intersecting')
            this.visible = true
          } else {
            console.log('NOT intersecting')
            this.visible = false
          }
        })
      })
      observer.observe(this.$refs.header)
    },
    changeTab(e) {
      console.log({ e })
      this.bottomNav = e
      console.log({ tab: this.bottomNav })
    },
  },
}
</script>

<style></style>
