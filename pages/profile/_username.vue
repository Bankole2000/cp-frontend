<template>
  <div class="visitor-profile">
    <div ref="header">
      <v-card tile>
        <v-app-bar
          tile
          :color="$vuetify.theme.dark ? '#121212' : '#f0efef'"
          dark
          prominent
          :src="profileWallpaper"
          extension-height="80"
          class="elevated-light"
        >
          <template #img="{ props }">
            <v-img v-bind="props"></v-img>
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
                          borderColor: $vuetify.theme.dark
                            ? '#121212'
                            : '#f0efef',
                        }"
                      >
                        <v-img
                          :src="profileImage"
                          contain
                          :aspect-ratio="1"
                          :alt="profile.username"
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
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                            >{{ profile.displayname }}</span
                          >
                        </div>
                        <div
                          class="subtitle-1 text--secondary font-weight-regular"
                        >
                          @{{ $route.params.username }}
                        </div>
                      </div>
                      <v-spacer></v-spacer>
                      <div v-if="$vuetify.breakpoint.mdAndUp" class="mb-4">
                        <v-btn icon outlined color="primary"
                          ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                        >
                        <v-btn icon outlined color="primary"
                          ><v-icon>mdi-chat-outline</v-icon></v-btn
                        >
                        <v-btn
                          outlined
                          rounded
                          large
                          color="primary"
                          class="text-capitalize"
                          >Following</v-btn
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
    </div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8" xl="9">
          <v-container>
            <v-row>
              <v-col
                v-if="!$vuetify.breakpoint.smAndDown"
                cols="5"
                class="pt-8"
                xl="3"
              >
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
                    <div v-for="(item, i) in mainRoutes" :key="i">
                      <NavButton
                        :title="item.title"
                        :icon="item.icon"
                        :to="item.to"
                        :active-routes="item.activeRoutes"
                        :badge-count="item.badgeCount"
                      />
                    </div>
                    <!-- <nuxt-link :to="`/profile/${$route.params.username}`">
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
                    <v-switch v-model="$vuetify.theme.dark"></v-switch> -->
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="7" sm="12" class="pt-8 mt-16" xl="9">
                <div v-if="$vuetify.breakpoint.smAndDown">
                  <div class="d-flex pb-4 mt-n8 justify-end">
                    <v-btn icon outlined color="primary" class="mr-2"
                      ><v-icon>mdi-dots-horizontal</v-icon></v-btn
                    >
                    <v-btn icon outlined color="primary" class="mr-2"
                      ><v-icon>mdi-email-outline</v-icon></v-btn
                    >
                    <v-btn
                      outlined
                      rounded
                      class="text-capitalize"
                      :class="
                        $vuetify.theme.dark ? 'white black--text' : 'secondary'
                      "
                      >Follow</v-btn
                    >
                  </div>
                  <v-card
                    v-if="$vuetify.breakpoint.xs"
                    class="elevated-light rounded-xl mb-4"
                  >
                    <v-card-text v-if="profile" class="pt-2">
                      <div class="px-2 pt-2">
                        <p
                          class="mb-0"
                          :class="
                            $vuetify.theme.dark ? 'white--text' : 'black--text'
                          "
                        >
                          {{
                            profile.bio
                              ? profile.bio
                              : "Hi, I'm new to Relodger 👋"
                          }}
                        </p>

                        <!-- {{ visible }} -->
                      </div>
                      <div
                        class="d-flex align-content-start flex-wrap px-2 mt-1"
                      >
                        <div class="d-flex align-center mr-2">
                          <v-icon class="mr-1" size="18"
                            >mdi-briefcase-variant-outline</v-icon
                          >
                          <p class="mb-0">Science and Tech</p>
                        </div>
                        <div class="d-flex align-center mr-2">
                          <v-icon class="mr-1" size="18"
                            >mdi-map-marker-outline</v-icon
                          >
                          <p class="mb-0">Los Angeles, CA</p>
                        </div>
                        <div class="d-flex align-center mr-2">
                          <v-icon class="mr-1" size="18"
                            >mdi-link-variant</v-icon
                          >
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
                      <div
                        class="d-flex align-content-start flex-wrap px-2 mt-1"
                      >
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
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                          >
                            {{ followerCount | count }}
                          </p>
                          <p class="mb-0">Followers</p>
                        </div>
                        <div style="flex: 1" class="d-flex align-center mr-2">
                          <p
                            class="font-weight-black mb-0 mr-1"
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                          >
                            {{ followingCount | count }}
                          </p>
                          <p class="mb-0">Following</p>
                        </div>
                        <div style="flex: 1" class="d-flex align-center mr-2">
                          <p
                            class="font-weight-black mb-0 mr-1"
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
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
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                          >
                            {{ profile.listingsCount | count }}
                          </p>
                          <p class="mb-0">Listings</p>
                        </div>
                        <div style="flex: 3" class="d-flex align-center mr-2">
                          <p
                            class="font-weight-black mb-0 mr-1"
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                          >
                            {{ profile.offersCount | count }}
                          </p>
                          <p class="mb-0">Personal Ads</p>
                        </div>
                        <div style="flex: 2" class="d-flex align-center mr-2">
                          <p
                            class="font-weight-black mb-0 mr-1"
                            :class="
                              $vuetify.theme.dark
                                ? 'white--text'
                                : 'black--text'
                            "
                          >
                            {{ Math.floor(Math.random() * 10 ** 1) | count }}
                          </p>
                          <p class="mb-0">Services</p>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
                <nuxt-child :profile="profile" />
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.smAndUp" cols="4" xl="3">
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
                        <v-list-item-action v-if="$vuetify.breakpoint.mdAndUp">
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
                  {{ profile.bio ? profile.bio : "Hi, I'm new to Relodger 👋" }}
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
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.smAndDown"
      :height="!visible ? '115px' : '49px'"
      app
    >
      <template #default>
        <div style="width: 100vw">
          <div
            :style="{
              width: showLeftNav ? '255px' : '0px',
              transition: 'all 0.2s ease-in-out',
            }"
          ></div>
          <div>
            <v-tabs
              optional
              grow
              :background-color="'deep-purple accent-4'"
              slider-color="white"
              dark
              center-active
              show-arrows
            >
              <v-tab
                v-for="(route, i) in mainRoutes"
                :key="i"
                nuxt
                exact
                :exact-active-class="'white--text font-weight-black'"
                :class="'white--text'"
                :active-class="'white--text font-weight-black'"
                :value="route.route"
                :to="route.route"
              >
                {{ route.title }}
              </v-tab>
            </v-tabs>
          </div>

          <v-scroll-y-transition>
            <div v-show="!visible">
              <v-hover v-slot="{ hover }">
                <div
                  class="mb-0 bg-gradient-right-primary-accent elevated-light"
                  style="transition: all 0.2s ease-in-out"
                  :class="{
                    grey: !hover,
                    'lighten-3': !$vuetify.theme.dark,
                    'darken-3': $vuetify.theme.dark,
                  }"
                >
                  <v-list-item
                    dense
                    :class="{
                      'white--text': !$vuetify.theme.dark,
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
                          <v-icon small color="primary" class="ml-2">
                            >mdi-checkbox-marked-circle</v-icon
                          >
                        </div>
                      </v-list-item-title>
                      <v-list-item-subtitle class="font-weight-light">
                        <div class="d-flex align-center">
                          <span
                            class="d-inline-block text-truncate"
                            :class="{
                              'white--text': !$vuetify.theme.dark,
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
                      <v-card
                        v-if="!profile.followedByYou && !profile.sentRequest"
                        class="text-capitalize elevated-light rounded-xl py-2 px-4"
                        flat
                        :class="
                          $vuetify.theme.dark
                            ? 'white black--text'
                            : 'black white--text'
                        "
                      >
                        Follow
                      </v-card>
                      <v-hover
                        v-else-if="profile.sentRequest"
                        v-slot="{ hover }"
                      >
                        <v-card
                          class="text-capitalize elevated-light rounded-xl py-2 px-4"
                          outlined
                          :color="hover ? 'error' : ''"
                          flat
                        >
                          {{ hover ? 'Cancel Request' : 'Request' }}
                        </v-card>
                      </v-hover>
                      <v-hover
                        v-else-if="profile.followedByYou"
                        v-slot="{ hover }"
                      >
                        <v-card
                          class="text-capitalize elevated-light rounded-xl py-2 px-4"
                          outlined
                          :color="hover ? 'error' : ''"
                          flat
                        >
                          {{ hover ? 'Unfollow' : 'Following' }}
                        </v-card>
                      </v-hover>
                    </v-list-item-action>
                  </v-list-item>
                </div>
              </v-hover>
            </div>
          </v-scroll-y-transition>
        </div>
      </template>
      <!-- <v-btn>
        <span>Recents</span>

        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>

        <v-icon>mdi-map-marker</v-icon>
      </v-btn> -->
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async asyncData(context) {
    try {
      const profile = await context.app.$axios.$get(
        `${context.store.getters.profilePath}/u/profile/${context.params.username}`
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
      mainRoutes: [
        {
          title: 'Posts',
          icon: 'mdi-post-outline',
          to: 'profile-index',
          route: '/profile/',
          activeRoutes: ['profile-index'],
          badgeCount: 10,
        },
        {
          title: 'Listings',
          icon: 'mdi-home-account',
          to: 'profile-index-listings',
          route: '/profile/listings',
          activeRoutes: ['profile-index-listings'],
          badgeCount: 0,
        },
        {
          title: 'Personal Ads',
          icon: 'mdi-bullhorn-outline',
          to: 'profile-index-ads',
          route: '/profile/ads',
          activeRoutes: ['profile-index-ads'],
          badgeCount: 0,
        },
        {
          title: 'Services',
          icon: 'mdi-account-hard-hat-outline',
          to: 'profile-index-services',
          route: '/profile/services',
          activeRoutes: ['profile-index-services'],
          badgeCount: 0,
        },
        {
          title: 'Followers',
          icon: 'mdi-account-multiple-plus-outline',
          to: 'profile-index-followers',
          route: '/profile/followers',
          activeRoutes: ['profile-index-followers'],
          badgeCount: 0,
        },
        {
          title: 'Following',
          icon: 'mdi-account-arrow-right-outline',
          to: 'profile-index-following',
          route: '/profile/following',
          activeRoutes: ['profile-index-following'],
          badgeCount: 0,
        },
        // {
        //   title: 'Saved Items',
        //   icon: 'mdi-bookmark-box-multiple-outline',
        //   to: 'profile-index-saved',
        //   route: '/profile/saved',
        //   activeRoutes: ['profile-index-saved'],
        //   badgeCount: 0,
        // },
        // {
        //   title: 'Timeline',
        //   icon: 'mdi-timeline-text-outline',
        //   to: 'profile-index-timeline',
        //   route: '/profile/timeline',
        //   activeRoutes: ['profile-index-timeline'],
        //   badgeCount: 0,
        // },
      ],
      //     visible: false,
      //     profile: {
      //       displayName: 'Display name',
      //       username: 'username',
      //       avatar: 'https://randomuser.me/api/portraits/men/79.jpg',
      //     },
    }
  },
  computed: {
    ...mapGetters({
      showLeftNav: 'ui/showMainLeftNav',
    }),
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
