<template>
  <v-card
    style="position: sticky; left: 20px; right: 60px; bottom: 5px; top: 80px"
    class="elevated-light rounded-xl"
  >
    <v-card-text class="pt-2">
      <v-scroll-y-transition>
        <div v-show="!visible" class="rounded-xl">
          <v-hover v-slot="{ hover }">
            <div
              class="rounded-xl mt-2 mb-0"
              style="transition: all 0.2s ease-in-out"
              :class="{
                'bg-gradient-right-primary-accent elevated-light': hover,
                grey: !hover,
                'lighten-3': !$vuetify.theme.dark,
                'darken-3': $vuetify.theme.dark,
              }"
            >
              <v-list-item
                dense
                :class="{
                  'white--text': hover && !$vuetify.theme.dark,
                }"
              >
                <v-list-item-avatar size="40" class="mr-2">
                  <v-img :src="profileImage"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <div class="d-flex align-center">
                      <span
                        class="body-2 text-truncate"
                        style="max-width: 160px"
                      >
                        {{ profile.displayname }}
                      </span>
                      <v-icon small color="primary"
                        >mdi-checkbox-marked-circle</v-icon
                      >
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle class="font-weight-light">
                    <div class="d-flex align-center">
                      <span
                        class="d-inline-block text-truncate"
                        :class="{
                          'white--text': hover && !$vuetify.theme.dark,
                        }"
                        style="max-width: 100px"
                      >
                        @{{ profile ? profile.username : '' }}
                      </span>
                      <v-chip
                        v-if="profile.followsYou"
                        label
                        x-small
                        class="bg-secondary-lt px-1 ml-2"
                      >
                        <span class="text--secondary">Follows you</span>
                      </v-chip>
                    </div>
                  </v-list-item-subtitle>
                  <!-- <v-list-item-subtitle>
                            <div class="d-flex align-center mt-0">
                              <v-icon x-small class="mr-1">mdi-finance</v-icon>
                              <span class="text--disabled caption"
                                >Promoted</span
                              >
                            </div>
                          </v-list-item-subtitle> -->
                </v-list-item-content>
                <v-list-item-action v-if="$vuetify.breakpoint.mdAndUp">
                  <v-btn
                    class="text-capitalize rounded-xl"
                    depressed
                    :class="
                      $vuetify.theme.dark ? 'white black--text' : 'secondary'
                    "
                    @click="follow"
                  >
                    follow
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </div>
          </v-hover>
        </div>
      </v-scroll-y-transition>
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
            {{ Math.floor(Math.random() * 10 ** 6) | count }}
          </p>
          <p class="mb-0">Followers</p>
        </div>
        <div style="flex: 1" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ Math.floor(Math.random() * 10 ** 2) | count }}
          </p>
          <p class="mb-0">Following</p>
        </div>
        <div style="flex: 1" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ Math.floor(Math.random() * 10 ** 3) | count }}
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
            {{ Math.floor(Math.random() * 10 ** 2) | count }}
          </p>
          <p class="mb-0">Listings</p>
        </div>
        <div style="flex: 3" class="d-flex align-center mr-2">
          <p
            class="font-weight-black mb-0 mr-1"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
          >
            {{ Math.floor(Math.random() * 10 ** 2) | count }}
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
  props: ['profile', 'visible'],
  computed: {
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
  methods: {
    follow() {
      console.log('Follow')
    },
  },
}
</script>

<style></style>
