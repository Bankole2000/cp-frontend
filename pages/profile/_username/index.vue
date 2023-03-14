<template>
  <div>
    <client-only>
      <v-row
        v-masonry
        item-selector="[class*='col-']"
        class="masonry-container"
      >
        <v-col cols="12" xl="6">
          <v-card class="elevated-light rounded-xl mb-4 pa-0">
            <v-card-title class="pt-1 px-0 pb-0">
              <div class="px-4 my-n2">
                <span class="caption font-weight-light text--secondary"
                  >@username reposted</span
                >
                <span class="caption font-weight-light text--secondary"
                  >&starf; pinned</span
                >
              </div>
              <v-list-item class="px-2">
                <v-list-item-avatar class="mx-2" size="40" color="grey">
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                  ></v-img
                ></v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    <span
                      class="font-weight-bold"
                      :class="{
                        'secondary--text': !$vuetify.theme.dark,
                        'white--text': $vuetify.theme.dark,
                      }"
                      >Display name</span
                    >
                    <span class="text--secondary font-weight-regular">
                      &bull; {{ $moment(Date.now()).fromNow() }}</span
                    >
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="font-weight-regular">
                    <span
                      :class="{
                        'secondary--text': !$vuetify.theme.dark,
                        'white--text': $vuetify.theme.dark,
                      }"
                      >@username</span
                    >
                    <span class="caption">&bull; Sponsored</span>
                    <span class="caption">&bull; Location</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="ma-0">
                  <v-btn icon class="ma-2">
                    <v-icon size="32">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card-title>
            <!-- <v-divider></v-divider> -->
            <v-card-text class="pb-3 pt-0">
              <p
                class="mb-0"
                :class="{
                  'secondary--text': !$vuetify.theme.dark,
                  'white--text': $vuetify.theme.dark,
                }"
              >
                <!-- <strong>@username</strong>&nbsp;  -->
                Lorem ipsum dolor, sit amet consectetur abc def adipisicing
                elit. Placeat culpa facere tenetur cumque ut. abc def ced
                Deserunt fugit hic odit excepturi aliquid?
              </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <div style="position: relative">
                <div
                  class="d-flex"
                  style="position: absolute; top: 0; z-index: 1; width: 100%"
                >
                  <v-btn class="ma-4" depressed>Sponsored</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn icon dark color="primary" class="my-4">
                    <v-icon size="32"> mdi-share-variant </v-icon>
                  </v-btn>
                  <v-btn icon dark color="primary" class="ma-4">
                    <v-icon size="32"> mdi-heart-outline </v-icon>
                  </v-btn>
                </div>
                <v-carousel
                  :continuous="false"
                  :cycle="false"
                  :show-arrows="true"
                  hide-delimiter-background
                  height="auto"
                >
                  <v-carousel-item v-for="i in 3" :key="i">
                    <!-- @load="$redrawVueMasonry()" -->
                    <v-img
                      src="https://picsum.photos/720/600?random"
                      :aspect-ratio="1.2"
                      cover
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
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </div>
              <v-card-text>
                <v-card outlined class="rounded-xl">
                  <v-card-title class="px-2 py-0">
                    <v-list-item class="px-0">
                      <v-list-item-avatar class="mx-2" size="30" color="grey">
                        <v-img
                          src="https://cdn.vuetifyjs.com/images/lists/3.jpg"
                        ></v-img
                      ></v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-subtitle class="caption mb-n1">
                          <span
                            class="font-weight-bold"
                            :class="{
                              'secondary--text': !$vuetify.theme.dark,
                              'white--text': $vuetify.theme.dark,
                            }"
                            >Display name</span
                          >
                          <span class="text--secondary font-weight-regular">
                            &bull; {{ $moment(Date.now()).fromNow() }}</span
                          >
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          class="font-weight-regular caption"
                        >
                          <span
                            :class="{
                              'secondary--text': !$vuetify.theme.dark,
                              'white--text': $vuetify.theme.dark,
                            }"
                            >@username</span
                          >
                          <span class="caption">&bull; Sponsored</span>
                          <span class="caption">&bull; Location</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <!-- <v-list-item-action class="ma-0">
                      <v-btn icon class="ma-2">
                        <v-icon size="32">mdi-dots-horizontal</v-icon>
                      </v-btn>
                    </v-list-item-action> -->
                    </v-list-item>
                  </v-card-title>

                  <v-card-text class="pt-0">
                    <p class="caption mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugiat, ex.
                    </p>
                  </v-card-text>
                  <v-card-text class="pt-0 d-flex align-start">
                    <div style="flex: 1" class="flex-shrink">
                      <v-img
                        class="rounded-lg"
                        :aspect-ratio="1.2"
                        src="https://picsum.photos/180/150?random"
                      >
                      </v-img>
                    </div>
                    <div style="flex: 4" class="flex-grow pl-4">
                      <p class="caption mb-0">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fugiat, ex.
                      </p>
                    </div>
                  </v-card-text>
                  <v-card-text class="pa-0 rounded-xl">
                    <v-img
                      class="rounded-b-xl"
                      :aspect-ratio="1.2"
                      src="https://picsum.photos/360/300?random"
                    ></v-img>
                  </v-card-text>
                </v-card>
              </v-card-text>
              <div class="d-flex align-center px-4 py-2">
                <div style="flex: 1" class="mr-3">
                  <v-hover v-slot="{ hover }">
                    <div
                      class="d-flex align-center justify-start"
                      style="cursor: pointer"
                    >
                      <v-btn
                        icon
                        class="mr-1"
                        small
                        :class="
                          hover && $vuetify.theme.dark
                            ? 'bg-primary-dk'
                            : hover && !$vuetify.theme.dark
                            ? 'bg-primary-lt'
                            : ''
                        "
                        :color="hover ? 'primary' : ''"
                      >
                        <v-icon size="24">mdi-chat-outline</v-icon>
                      </v-btn>
                      <span
                        class="font-weight-regular"
                        :class="hover ? 'primary--text' : ''"
                        >{{ 999999 | count }}</span
                      >
                    </div>
                  </v-hover>
                </div>
                <div style="flex: 1" class="mr-3">
                  <v-hover v-slot="{ hover }">
                    <div
                      class="d-flex align-center justify-start"
                      style="cursor: pointer"
                    >
                      <v-btn
                        icon
                        class="mr-1"
                        small
                        :class="
                          hover && $vuetify.theme.dark
                            ? 'bg-success-dk'
                            : hover && !$vuetify.theme.dark
                            ? 'bg-success-lt'
                            : ''
                        "
                        :color="hover ? 'success' : ''"
                      >
                        <v-icon size="24">mdi-repeat-variant</v-icon>
                      </v-btn>
                      <span
                        class="font-weight-regular"
                        :class="hover ? 'success--text' : ''"
                        >{{ 999999 | count }}</span
                      >
                    </div>
                  </v-hover>
                </div>
                <div style="flex: 1" class="mr-3">
                  <v-hover v-slot="{ hover }">
                    <div
                      class="d-flex align-center justify-start"
                      style="cursor: pointer"
                    >
                      <v-btn
                        icon
                        :class="
                          hover && $vuetify.theme.dark
                            ? 'bg-error-dk'
                            : hover && !$vuetify.theme.dark
                            ? 'bg-error-lt'
                            : ''
                        "
                        class="mr-1"
                        small
                        :color="hover ? 'error' : ''"
                      >
                        <v-icon v-if="likedByUser" size="24">mdi-heart</v-icon>
                        <v-icon v-else size="24">mdi-heart-outline</v-icon>
                      </v-btn>
                      <span
                        class="font-weight-regular"
                        :class="hover ? 'error--text' : ''"
                        >{{ 999999 | count }}</span
                      >
                    </div>
                  </v-hover>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <v-hover v-slot="{ hover }">
                    <v-btn small icon class="mx-1" :color="hover ? 'info' : ''">
                      <v-icon size="24">mdi-share-variant-outline</v-icon>
                    </v-btn>
                  </v-hover>
                </div>
                <div>
                  <v-hover v-slot="{ hover }">
                    <v-btn
                      small
                      icon
                      class="mx-1"
                      :color="hover ? 'warning' : ''"
                    >
                      <v-icon size="24">mdi-bookmark-outline</v-icon>
                    </v-btn>
                  </v-hover>
                </div>
              </div>
            </v-card-text>
            <!-- <div class="px-4 py-2">
            <v-hover v-slot="{ hover }">
              <div :class="hover ? 'primary--text' : 'text--secondary'">
                <p class="body-2 mb-0" style="cursor: pointer">
                  View all 0 comments
                </p>
              </div>
            </v-hover>
          </div>
          <v-card-actions class="d-flex align-center px-4 pb-4">
            <v-avatar size="36" class="mr-2">
              <img
                src="https://randomuser.me/api/portraits/women/85.jpg"
                alt="John"
              />
            </v-avatar>
            <v-textarea
              placeholder="Add a comment..."
              rows="1"
              prepend-inner-icon="mdi-magnify"
              auto-grow
              hide-details
              filled
              dense
              rounded
              single-line
            ></v-textarea>
          </v-card-actions> -->
          </v-card>
          <v-skeleton-loader
            :boilerplate="false"
            class="rounded-xl elevated-light"
            type="list-item-avatar-two-line, list-item-three-line, image, card-heading"
          >
          </v-skeleton-loader>
        </v-col>
        <v-col v-for="i in 6" :key="`${i}-b`" class="child" cols="12" xl="6">
          <PostCardItem class="mb-2" />
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
import ClientOnly from 'vue-client-only'
export default {
  components: {
    ClientOnly,
  },
  props: ['profile'],
  data: () => ({
    loading: false,
    posts: [],
    total: 0,
    pages: 0,
    page: 1,
    limit: 20,
    next: null,
    likedByUser: false,
  }),
  fetchOnServer: false,
  async fetch() {
    if (this.loading) return
    try {
      this.loading = true
      const url = new URL(
        `${this.$store.getters.postPath}/u/${this.profile.username}/posts`
      )
      const result = await this.$axios.$get(url.href)
      console.log({ result })
    } catch (error) {
      console.log({ error })
    } finally {
      this.loading = false
    }
  },
  async mounted() {
    await this.$fetch()
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
}
</script>

<style></style>
