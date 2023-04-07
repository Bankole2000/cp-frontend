<template>
  <v-card tile flat class="elevated-light">
    <v-app-bar
      :color="$vuetify.theme.dark ? '#121212' : '#f0efef'"
      tile
      prominent
      :src="profileWallpaper"
      extension-height="80"
      class="elevated-light"
    >
      <template #img="{ props }">
        <v-img v-show="profileLoaded" v-bind="props">
          <!-- gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" -->
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                size="64"
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
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
                      v-show="profileLoaded"
                      :src="`${profileImage}?w=500`"
                      contain
                      :aspect-ratio="1"
                      :alt="profileLoaded ? profile.username : ''"
                    >
                      <template #placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
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
                        v-if="profileLoaded"
                        :class="
                          $vuetify.theme.dark ? 'white--text' : 'black--text'
                        "
                        >{{ profile.displayname }}</span
                      >
                    </div>
                    <div
                      v-if="profileLoaded"
                      class="subtitle-1 text--secondary font-weight-regular"
                    >
                      @{{ profile.username }}
                    </div>
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="$vuetify.breakpoint.mdAndUp" class="mb-4">
                    <v-btn icon outlined color="primary"
                      ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                    >
                    <v-btn icon outlined color="primary"
                      ><v-icon>mdi-email-outline</v-icon></v-btn
                    >
                    <!-- <v-btn
                          outlined
                          rounded
                          large
                          color="primary"
                          class="text-capitalize"
                          >Following</v-btn
                        > -->
                    <v-btn
                      outlined
                      rounded
                      large
                      color="primary"
                      class="text-capitalize"
                      @click="showEditProfileModal"
                      >Edit Profile</v-btn
                    >
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
  props: ['profile', 'profileLoaded', 'profileImage', 'profileWallpaper'],
  computed: {},
  methods: {
    showEditProfileModal() {
      this.$emit('showEditProfileModal')
    },
  },
}
</script>

<style></style>
