<template>
  <v-card v-if="$vuetify.breakpoint.xs" class="elevated-light rounded-xl mb-4">
    <v-card-text v-if="profile" class="pt-2">
      <div class="px-2 pt-2">
        <p
          class="mb-0"
          :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
        >
          {{ profile.bio ? profile.bio : "Hi, I'm new to Relodger 👋" }}
        </p>

        <!-- {{ visible }} -->
      </div>
      <div class="d-flex align-content-start flex-wrap px-2 mt-1">
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18">mdi-briefcase-variant-outline</v-icon>
          <p class="mb-0">Science and Tech</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18">mdi-map-marker-outline</v-icon>
          <p class="mb-0">Los Angeles, CA</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18">mdi-link-variant</v-icon>
          <p class="mb-0">link.to.website</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18">mdi-balloon</v-icon>
          <p class="mb-0">Born September 1, 2001</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18">mdi-calendar</v-icon>
          <p class="mb-0">Joined April 2022</p>
        </div>
      </div>
      <v-divider class="mx-3 my-1"></v-divider>
      <div class="d-flex align-content-start flex-wrap px-2 mt-1">
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18" color="blue lighten-2"
            >mdi-twitter</v-icon
          >
          <p class="mb-0">@twitterhandle</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon size="18" class="mr-1" color="purple">mdi-instagram</v-icon>
          <p class="mb-0">@instagramhandle</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18" color="blue">mdi-facebook</v-icon>
          <p class="mb-0">facebookname</p>
        </div>
        <div class="d-flex align-center mr-2">
          <v-icon class="mr-1" size="18" color="blue darken-1"
            >mdi-linkedin</v-icon
          >
          <p class="mb-0">linkedin.link/profile</p>
        </div>
      </div>
      <v-divider class="mx-3 my-1"></v-divider>
      <div class="d-flex align-center px-2 mt-1">
        <div style="flex: 1" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ followerCount | count }}
          </p>
          <p class="mb-0">Followers</p>
        </div>
        <div style="flex: 1" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ followingCount | count }}
          </p>
          <p class="mb-0">Following</p>
        </div>
        <div style="flex: 1" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ profile.postCount | count }}
          </p>
          <p class="mb-0">Posts</p>
        </div>
      </div>

      <div class="d-flex align-center px-2 mt-1">
        <div style="flex: 2" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ profile.listingsCount | count }}
          </p>
          <p class="mb-0">Listings</p>
        </div>
        <div style="flex: 3" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ profile.offersCount | count }}
          </p>
          <p class="mb-0">Personal Ads</p>
        </div>
        <div style="flex: 2" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ Math.floor(Math.random() * 10 ** 1) | count }}
          </p>
          <p class="mb-0">Services</p>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['profile'],
  computed: {
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
}
</script>

<style></style>
