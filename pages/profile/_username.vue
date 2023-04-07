<template>
  <div class="visitor-profile">
    <div ref="header">
      <ProfileHeader :profile="profile" :loading="loading" />
    </div>
    <v-container v-if="profile">
      <ProfileBlockedYou v-if="profile.blockedYou" :profile="profile" />
      <ProfileYouBlocked v-else-if="profile.blockedByYou" :profile="profile" />
      <v-row v-else>
        <v-col cols="12" sm="8" xl="9">
          <v-container>
            <v-row>
              <v-col
                v-if="!$vuetify.breakpoint.smAndDown"
                cols="4"
                class="pt-8"
                xl="3"
              >
                <MobileProfileNavigation :routes="mainRoutes" />
              </v-col>
              <v-col cols="12" md="8" sm="12" class="pt-8 mt-16" xl="9">
                <div v-if="$vuetify.breakpoint.smAndDown">
                  <MobileProfileActions :profile="profile" />
                  <MobileProfileDetails
                    v-if="$vuetify.breakpoint.xs"
                    :profile="profile"
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
          <ProfileDetails :profile="profile" :visible="visible" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <ProfileNotFound />
    </v-container>
    <ProfileVisitorBottomNavigation
      v-if="$vuetify.breakpoint.smAndDown"
      :profile="profile"
      :visible="visible"
      :routes="mainRoutes"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileProfileActions from '~/components/blocks/profile/profile-pieces/MobileProfileActions.vue'
import MobileProfileDetails from '~/components/blocks/profile/profile-pieces/MobileProfileDetails.vue'
import MobileProfileNavigation from '~/components/blocks/profile/profile-pieces/MobileProfileNavigation.vue'
import ProfileDetails from '~/components/blocks/profile/profile-pieces/ProfileDetails.vue'
import ProfileHeader from '~/components/blocks/profile/profile-pieces/ProfileHeader.vue'
import ProfileBlockedYou from '~/components/blocks/profile/ProfileBlockedYou.vue'
import ProfileNotFound from '~/components/blocks/profile/ProfileNotFound.vue'
import ProfileVisitorBottomNavigation from '~/components/blocks/profile/ProfileVisitorBottomNavigation.vue'
import ProfileYouBlocked from '~/components/blocks/profile/ProfileYouBlocked.vue'
export default {
  components: {
    ProfileNotFound,
    ProfileBlockedYou,
    ProfileYouBlocked,
    ProfileVisitorBottomNavigation,
    MobileProfileDetails,
    MobileProfileActions,
    MobileProfileNavigation,
    ProfileHeader,
    ProfileDetails,
  },
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
  async asyncData(context) {
    try {
      const profile = await context.app.$axios.$get(
        `${
          context.store.getters.profilePath
        }/u/profile/${context.params.username.slice(1)}`
      )
      console.log({ profile, context })
      return {
        visible: false,
        profile: profile.data,
        notFound: false,
        loading: false,
      }
    } catch (error) {
      console.log({ error })
      return {
        visible: false,
        profile: null,
        notFound: true,
        loading: false,
      }
    }
  },
  data() {
    return {
      loading: true,
      profile: null,
    }
  },
  computed: {
    ...mapGetters({
      showLeftNav: 'ui/showMainLeftNav',
    }),
    mainRoutes() {
      if (this.profile) {
        return [
          {
            title: 'Posts',
            icon: 'mdi-post-outline',
            to: 'profile-username',
            route: `/profile/@${this.profile.username}`,
            activeRoutes: ['profile-username'],
            badgeCount: 10,
          },
          {
            title: 'Listings',
            icon: 'mdi-home-account',
            to: 'profile-username-listings',
            route: `/profile/@${this.profile.username}/listings`,
            activeRoutes: ['profile-username-listings'],
            badgeCount: 0,
          },
          // {
          //   title: 'Personal Ads',
          //   icon: 'mdi-bullhorn-outline',
          //   to: 'profile-username-ads',
          //   route: `/profile/@${this.profile.username}/ads`,
          //   activeRoutes: ['profile-username-ads'],
          //   badgeCount: 0,
          // },
          // {
          //   title: 'Services',
          //   icon: 'mdi-account-hard-hat-outline',
          //   to: 'profile-username-services',
          //   route: `/profile/@${this.profile.username}/services`,
          //   activeRoutes: ['profile-username-services'],
          //   badgeCount: 0,
          // },
          {
            title: 'Followers',
            icon: 'mdi-account-multiple-plus-outline',
            to: 'profile-username-followers',
            route: `/profile/@${this.profile.username}/followers`,
            activeRoutes: ['profile-username-followers'],
            badgeCount: 0,
          },
          {
            title: 'Following',
            icon: 'mdi-account-arrow-right-outline',
            to: 'profile-username-following',
            route: `/profile/@${this.profile.username}/following`,
            activeRoutes: ['profile-username-following'],
            badgeCount: 0,
          },
        ]
      }
      return []
    },
    profileWallpaper() {
      if (this.profile) {
        return (
          this.profile.wallpaperUrl ||
          `${this.$store.getters.profilePath}/u/wallpaper/${this.profile.username}`
        )
      }
      return `${this.$store.getters.profilePath}/u/wallpaper/${this.$route.params.username}`
    },
    profileImage() {
      if (this.profile) {
        return (
          this.profile.imageUrl ||
          `${this.$store.getters.profilePath}/u/image/${this.profile.username}`
        )
      }
      return `${this.$store.getters.profilePath}/u/image/${this.$route.params.username}`
    },
    followerCount() {
      if (this.profile) {
        return this.profile._count.followers
      }
      return 0
    },
    followingCount() {
      if (this.profile) {
        return this.profile._count.following
      }
      return 0
    },
  },
  mounted() {
    this.onElementObserved()
  },
  methods: {
    onElementObserved() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            // this.player.play();
            console.log('Is Intersecting')
            this.visible = true
          } else {
            // this.player.pause();
            console.log('NOT intersecting')
            this.visible = false
          }
        })
      })
      observer.observe(this.$refs.header)
    },
  },
}
</script>

<style></style>
