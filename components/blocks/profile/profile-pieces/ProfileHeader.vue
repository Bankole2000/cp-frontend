<template>
  <v-card tile class="elevated-light" flat>
    <!-- :color="$vuetify.theme.dark ? '#c5c5c5' : '#f0efef'" -->
    <v-app-bar
      tile
      dark
      color="#c5c5c5"
      prominent
      :src="profile ? profileWallpaper : null"
      extension-height="80"
      class="elevated-light"
    >
      <template #img="{ props }">
        <v-img v-if="profile" v-bind="props">
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                :indeterminate="loading"
                size="64"
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <!-- gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" -->
      </template>

      <template #extension>
        <div class="mb-n16 pt-6" style="width: 100%">
          <v-container>
            <v-row align="end">
              <v-col cols="12" sm="7" md="8" xl="9">
                <div class="d-flex align-end" style="width: 100%">
                  <v-avatar
                    size="150"
                    :color="$vuetify.theme.dark ? '#121212' : '#f0efef'"
                    style="border-width: 5px; border-style: solid"
                    :style="{
                      borderColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
                    }"
                  >
                    <v-img
                      :src="profileImage"
                      contain
                      :aspect-ratio="1"
                      :alt="profile ? profile.username : ''"
                    >
                      <template v-if="profile" #placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            :indeterminate="loading"
                            size="64"
                            color="primary"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-avatar>
                  <div class="mb-2 ml-2">
                    <div class="text-h6 font-weight-black mb-0">
                      <span
                        :class="
                          $vuetify.theme.dark ? 'white--text' : 'black--text'
                        "
                        >{{
                          profile ? profile.displayname : $route.params.username
                        }}</span
                      >
                    </div>
                    <div class="subtitle-1 text--secondary font-weight-regular">
                      {{ $route.params.username }}
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                  <div
                    v-if="$vuetify.breakpoint.mdAndUp && profile"
                    class="mb-4"
                  >
                    <v-btn
                      icon
                      outlined
                      :color="
                        $vuetify.theme.dark ? 'white black--text' : 'secondary'
                      "
                      ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      outlined
                      :color="
                        $vuetify.theme.dark ? 'white black--text' : 'secondary'
                      "
                      ><v-icon>mdi-chat-outline</v-icon></v-btn
                    >
                    <v-btn
                      v-if="!profile.followedByYou && !profile.sentRequest"
                      depressed
                      rounded
                      large
                      class="text-capitalize"
                      :class="
                        $vuetify.theme.dark ? 'white black--text' : 'secondary'
                      "
                      >Follow</v-btn
                    >
                    <v-hover v-else-if="profile.sentRequest" v-slot="{ hover }">
                      <v-btn
                        class="text-capitalize rounded-xl"
                        outlined
                        small
                        :loading="loading"
                        :disabled="loading"
                        :color="hover ? 'error' : ''"
                      >
                        <!-- @click.prevent="cancelFollowRequest(profile)" -->
                        {{ hover ? 'Cancel Request' : 'Request' }}
                      </v-btn>
                    </v-hover>
                    <v-hover v-else v-slot="{ hover }">
                      <v-btn
                        v-if="profile.followedByYou"
                        outlined
                        rounded
                        large
                        :color="
                          hover
                            ? 'error'
                            : $vuetify.theme.dark
                            ? 'white'
                            : 'secondary'
                        "
                        class="text-capitalize"
                      >
                        <span style="font-weight: 1.2rem">
                          {{ hover ? 'Unfollow' : 'Following' }}
                        </span>
                      </v-btn>
                    </v-hover>
                  </div>
                </div>
              </v-col>
              <v-col
                v-if="!$vuetify.breakpoint.xs"
                cols="4"
                sm="5"
                md="4"
                xl="3"
              ></v-col>
            </v-row>
          </v-container>
        </div>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  props: ['profile', 'loading'],
  computed: {
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
  },
}
</script>

<style></style>
