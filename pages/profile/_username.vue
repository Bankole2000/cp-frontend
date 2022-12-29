<template>
  <div class="visitor-profile">
    <div ref="header">
      <v-card tile>
        <v-app-bar
          tile
          color="#6A76AB"
          dark
          prominent
          src="https://picsum.photos/1920/1080?random"
          extension-height="80"
          class="elevated-light"
        >
          <template #img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <template #extension>
            <div class="mb-n16 pt-6" style="width: 100%">
              <v-container>
                <v-row align="end">
                  <v-col cols="8">
                    <div class="d-flex align-end" style="width: 100%">
                      <v-avatar
                        size="150"
                        :color="$vuetify.theme.dark ? '#121212' : '#f0efef'"
                        style="border-width: 5px; border-style: solid"
                        :style="{
                          borderColor: $vuetify.theme.dark
                            ? '#121212'
                            : '#f0efef',
                        }"
                      >
                        <v-img
                          src="https://randomuser.me/api/portraits/men/79.jpg"
                          contain
                          :aspect-ratio="1"
                          alt="Vuetify Logo"
                        ></v-img>
                      </v-avatar>
                      <div class="mb-2 ml-2">
                        <div class="text-h6 font-weight-black mb-0">
                          <span
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                            >Display name</span
                          >
                        </div>
                        <div
                          class="subtitle-1 text--secondary font-weight-regular"
                        >
                          {{ $route.params.username }}
                        </div>
                      </div>
                      <v-spacer></v-spacer>
                      <div class="mb-4">
                        <v-btn icon outlined color="primary"
                          ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                        >
                        <v-btn icon outlined color="primary"
                          ><v-icon>mdi-email-outline</v-icon></v-btn
                        >
                        <v-btn
                          outlined
                          rounded
                          large
                          color="primary"
                          class="text-capitalize"
                          >Following</v-btn
                        >
                        <v-btn
                          outlined
                          rounded
                          large
                          color="primary"
                          class="text-capitalize"
                          >Edit Profile</v-btn
                        >
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="4"></v-col>
                </v-row>
              </v-container>
            </div>
          </template>
        </v-app-bar>
      </v-card>
    </div>
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-container>
            <v-row>
              <v-col cols="5" class="pt-8">
                <v-card
                  style="
                    position: sticky;
                    left: 20px;
                    right: 60px;
                    bottom: 5px;
                    top: 80px;
                  "
                  class="elevated-light rounded-xl mt-16"
                >
                  <v-card-text class="py-1 py-3">
                    <nuxt-link :to="`/profile/${$route.params.username}`">
                      <HoverButton
                        text="Posts"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name === 'profile-username-index',
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link
                      :to="`/profile/${$route.params.username}/listings`"
                    >
                      <HoverButton
                        text="Listings"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('listing'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link :to="`/profile/${$route.params.username}/ads`">
                      <HoverButton
                        text="Personal Ads"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('ads'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link
                      :to="`/profile/${$route.params.username}/services`"
                    >
                      <HoverButton
                        text="Services"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('services'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link
                      :to="`/profile/${$route.params.username}/followers`"
                    >
                      <HoverButton
                        text="Followers"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('followers'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link
                      :to="`/profile/${$route.params.username}/following`"
                    >
                      <HoverButton
                        text="Following"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('following'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link :to="`/profile/${$route.params.username}/saved`">
                      <HoverButton
                        text="Saved Items"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('saved'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <nuxt-link
                      :to="`/profile/${$route.params.username}/timeline`"
                    >
                      <HoverButton
                        text="Timeline"
                        :block="true"
                        :rounded="true"
                        class="mb-2"
                        :class="{
                          'elevated-light bg-gradient-right-primary-accent white--text':
                            $route.name.includes('timeline'),
                        }"
                        size="lg"
                      />
                    </nuxt-link>
                    <v-switch v-model="$vuetify.theme.dark"></v-switch>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="7" class="pt-8 mt-16">
                <nuxt-child />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col cols="4">
          <v-card
            style="
              position: sticky;
              left: 20px;
              right: 60px;
              bottom: 5px;
              top: 80px;
            "
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
                        'bg-gradient-right-primary-accent elevated-light':
                          hover,
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
                          <v-img :src="profile.avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            <div class="d-flex align-center">
                              <span
                                class="body-2 text-truncate"
                                style="max-width: 160px"
                              >
                                {{ profile.displayName }}
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
                                @{{ profile.username }}
                              </span>
                              <v-chip
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
                        <v-list-item-action>
                          <v-btn
                            class="text-capitalize rounded-xl"
                            depressed
                            :class="
                              $vuetify.theme.dark
                                ? 'white black--text'
                                : 'secondary'
                            "
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Possimus accusantium eius fuga ratione laboriosam quae
                  molestiae.
                </p>

                <!-- {{ visible }} -->
              </div>
              <div class="d-flex align-content-start flex-wrap px-2 mt-1">
                <div class="d-flex align-center mr-2">
                  <v-icon class="mr-1" size="18"
                    >mdi-briefcase-variant-outline</v-icon
                  >
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
                  <v-icon size="18" class="mr-1" color="purple"
                    >mdi-instagram</v-icon
                  >
                  <p class="mb-0">@instagramhandle</p>
                </div>
                <div class="d-flex align-center mr-2">
                  <v-icon class="mr-1" size="18" color="blue"
                    >mdi-facebook</v-icon
                  >
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      profile: {
        displayName: 'Display name',
        username: 'username',
        avatar: 'https://randomuser.me/api/portraits/men/79.jpg',
      },
    }
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

<style>
</style>