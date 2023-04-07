<template>
  <div>
    <!-- TODO: If mobile view -->
    <div style="height: calc(100vh - 64px)">
      <div v-if="$vuetify.breakpoint.smAndDown">
        <div>
          <v-card
            tile
            elevation="0"
            style="
              display: flex;
              flex-direction: column;
              min-height: calc(100vh - 56px);
            "
          >
            <v-card-title style="flex-grow: 0; flex-shrink: 0">
              <v-btn nuxt to="./" icon><v-icon>mdi-arrow-left</v-icon></v-btn>
              Post
            </v-card-title>
            <v-card-text
              style="
                flex-grow: 1;
                overflow-y: scroll;
                height: calc(100vh - (56px + 68px + 68px));
              "
              class="px-0 py-0"
            >
              <!-- LOADING CONTENT -->
              <div @click="stopAnimation">
                <v-skeleton-loader
                  :boilerplate="false"
                  type="list-item-avatar-two-line, list-item-three-line"
                  :tile="false"
                  class="mx-auto"
                >
                  <div>
                    <v-list-item>
                      <v-list-item-avatar class="mx-2" size="40" color="grey">
                        <v-img
                          :src="`${profilePath}/u/image/${postData.createdByData.username}`"
                        ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title class="font-weight-medium">{{
                          postData.createdByData.displayname
                        }}</v-list-item-title>
                        <v-list-item-subtitle>
                          @{{ postData.createdByData.username }} &middot;
                          {{
                            new Date(postData.created).toLocaleString(
                              ['en-US'],
                              {
                                day: '2-digit',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            )
                          }}</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <v-list-item-action class="ma-0">
                        <v-btn icon class="ma-2">
                          <v-icon size="32">mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <div
                      class="px-6"
                      :class="
                        $vuetify.theme.dark ? 'white--text' : 'secondary--text'
                      "
                    >
                      <p>
                        <template v-for="(token, i) in captionParsed">
                          <UserMention
                            v-if="token.startsWith('@')"
                            :key="i"
                            :username="token.slice(1)"
                          />
                          <TagMention
                            v-else-if="token.startsWith('#')"
                            :key="i"
                            :tag="token.slice(1)"
                          />
                          <URLMention
                            v-else-if="postData.urls.includes(token)"
                            :key="i"
                            :url="token"
                          />
                          <template v-else>
                            <span :key="i" style="word-break: break-word">
                              {{ token }}
                            </span>
                          </template>
                        </template>
                      </p>
                    </div>
                  </div>
                </v-skeleton-loader>
                <v-skeleton-loader
                  :boilerplate="false"
                  type="image"
                  tile
                  class="mx-auto"
                >
                  <v-carousel
                    :continuous="false"
                    :cycle="false"
                    :show-arrows="true"
                    hide-delimiter-background
                    height="auto"
                  >
                    <!-- delimiter-icon="mdi-circle" -->
                    <!-- height="400" -->
                    <!-- :aspect-ratio="1.2" -->
                    <!-- height="400" -->
                    <v-carousel-item
                      v-for="(media, i) in postData.postMedia"
                      :key="i"
                    >
                      <v-img
                        :src="`${media.imageUrl}?thumb=720x600`"
                        :aspect-ratio="360 / 300"
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
                </v-skeleton-loader>

                <v-skeleton-loader
                  :boilerplate="false"
                  type="card-heading"
                  class="mx-auto"
                ></v-skeleton-loader>
                <v-divider></v-divider>
                <div style="overflow-y: scroll">
                  <div>
                    <v-slide-y-transition group hide-on-leave>
                      <v-skeleton-loader
                        v-for="i in commentLoaders"
                        :key="i"
                        :boilerplate="false"
                        :type="
                          i % 2 === 0
                            ? 'list-item-avatar'
                            : 'list-item-avatar-two-line'
                        "
                        class="mx-auto py-4 px-6"
                      ></v-skeleton-loader>
                    </v-slide-y-transition>
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions
              style="flex-grow: 0; flex-shrink: 0"
              class="d-flex px-4"
            >
              <div style="flex: 1">
                <v-skeleton-loader
                  :boilerplate="false"
                  type="avatar"
                ></v-skeleton-loader>
              </div>
              <div style="flex: 8" class="mx-auto">
                <v-responsive
                  :style="{
                    backgroundColor: $vuetify.theme.dark
                      ? '#393939'
                      : '#e0e0e0',
                  }"
                  class="text-center rounded-pill mx-auto"
                  height="40"
                  width="80%"
                >
                </v-responsive>
              </div>
              <div style="flex: 1">
                <v-skeleton-loader
                  :boilerplate="false"
                  type="button"
                ></v-skeleton-loader>
              </div>
            </v-card-actions>
            <!-- LOADING CONTENT -->
          </v-card>
        </div>
      </div>
      <div v-else>
        <div style="display: flex">
          <div style="flex: 7">
            <v-card
              tile
              class="transparent"
              style="min-height: calc(100vh - 64px)"
            >
              <v-overlay :absolute="true" :opacity="0.6" :value="true">
                <v-carousel
                  :continuous="false"
                  :cycle="false"
                  :show-arrows="true"
                  hide-delimiter-background
                  height="90vh"
                  :style="{
                    minWidth: leftNavActive ? 'calc(70vw - 256px)' : '70vw',
                  }"
                >
                  <v-carousel-item
                    v-for="(image, i) in postData.postMedia"
                    :key="i"
                  >
                    <v-card
                      :style="{
                        maxWidth: leftNavActive ? 'calc(70vw - 256px)' : '70vw',
                      }"
                      color="transparent"
                      flat
                      height="90vh"
                      class="fill-height d-flex align-center justify-center"
                    >
                      <v-img
                        :src="`${image.imageUrl}`"
                        :style="{
                          maxWidth: leftNavActive
                            ? 'calc(70vw - 256px)'
                            : '70vw',
                        }"
                        max-height="90vh"
                        contain
                        @click="() => {}"
                      />
                    </v-card>
                  </v-carousel-item>
                </v-carousel>
              </v-overlay>
            </v-card>
          </div>
          <div style="flex: 3">
            <v-card
              style="
                display: flex;
                flex-direction: column;
                height: calc(100vh - 64px);
                width: 30vw;
              "
            >
              <v-card-title>
                <v-btn small nuxt to="./" icon class="mr-2"
                  ><v-icon>mdi-arrow-left</v-icon></v-btn
                >
                Post
              </v-card-title>
              <v-card-text
                style="
                  flex-grow: 1;
                  overflow-y: scroll;
                  height: calc(100vh - (56px + 68px + 68px));
                "
                class="px-0 py-0"
              >
                <!-- LOADING CONTENT -->
                <div @click="stopAnimation">
                  <v-skeleton-loader
                    :boilerplate="false"
                    :loading="loading"
                    type="list-item-avatar-two-line, list-item-three-line"
                    :tile="false"
                    class="mx-auto"
                  >
                    <div>
                      <v-list-item>
                        <v-list-item-avatar class="mx-2" size="40" color="grey">
                          <v-img
                            :src="`${profilePath}/u/image/${postData.createdByData.username}`"
                          ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-medium">{{
                            postData.createdByData.displayname
                          }}</v-list-item-title>
                          <v-list-item-subtitle>
                            @{{ postData.createdByData.username }} &middot;
                            {{
                              new Date(postData.created).toLocaleString(
                                ['en-US'],
                                {
                                  day: '2-digit',
                                  month: 'short',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                }
                              )
                            }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                        <v-list-item-action class="ma-0">
                          <v-btn icon class="ma-2">
                            <v-icon size="32">mdi-dots-horizontal</v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <div
                        class="px-6"
                        :class="
                          $vuetify.theme.dark
                            ? 'white--text'
                            : 'secondary--text'
                        "
                      >
                        <p>
                          <template v-for="(token, i) in captionParsed">
                            <UserMention
                              v-if="token.startsWith('@')"
                              :key="i"
                              :username="token.slice(1)"
                            />
                            <TagMention
                              v-else-if="token.startsWith('#')"
                              :key="i"
                              :tag="token.slice(1)"
                            />
                            <URLMention
                              v-else-if="postData.urls.includes(token)"
                              :key="i"
                              :url="token"
                            />
                            <template v-else>
                              <span :key="i" style="word-break: break-word">
                                {{ token }}
                              </span>
                            </template>
                          </template>
                        </p>
                        <p
                          ref="caption"
                          class="mb-0 secondary--text"
                          :class="
                            $vuetify.theme.dark
                              ? 'white--text'
                              : 'secondary--text'
                          "
                        >
                          {{ postData.caption }}
                        </p>
                      </div>
                    </div>
                  </v-skeleton-loader>

                  <v-skeleton-loader
                    :boilerplate="false"
                    :loading="loading"
                    type="card-heading"
                    class="mx-auto"
                  >
                    <div class="d-flex align-center px-6 py-2">
                      <div style="flex: 1">
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
                              v-if="commentsCount > -1"
                              class="font-weight-regular"
                              :class="hover ? 'primary--text' : ''"
                              >{{ commentsCount | count }}</span
                            >
                          </div>
                        </v-hover>
                      </div>
                      <div style="flex: 1">
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
                              <!-- <v-icon v-if="likedByUser" size="24">mdi-heart</v-icon> -->
                              <v-icon size="24">mdi-heart-outline</v-icon>
                            </v-btn>
                            <span
                              v-if="likesCount > -1"
                              class="font-weight-regular"
                              :class="hover ? 'error--text' : ''"
                              >{{ likesCount | count }}</span
                            >
                          </div>
                        </v-hover>
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-hover v-slot="{ hover }">
                          <v-btn
                            small
                            icon
                            class="mx-1"
                            :color="hover ? 'info' : ''"
                          >
                            <v-icon size="24">mdi-share-variant-outline</v-icon>
                          </v-btn>
                        </v-hover>
                      </div>
                    </div>
                  </v-skeleton-loader>
                  <v-divider></v-divider>
                  <div style="overflow-y: scroll">
                    <div>
                      <v-slide-y-transition group hide-on-leave>
                        <v-skeleton-loader
                          v-for="i in commentLoaders"
                          :key="i"
                          :boilerplate="false"
                          :type="
                            i % 2 === 0
                              ? 'list-item-avatar'
                              : 'list-item-avatar-two-line'
                          "
                          class="mx-auto py-4 px-6"
                        ></v-skeleton-loader>
                      </v-slide-y-transition>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions
                style="flex-grow: 0; flex-shrink: 0"
                class="d-flex px-4"
              >
                <div style="flex: 1">
                  <v-skeleton-loader
                    :boilerplate="false"
                    type="avatar"
                  ></v-skeleton-loader>
                </div>
                <div style="flex: 8" class="mx-auto">
                  <v-responsive
                    :style="{
                      backgroundColor: $vuetify.theme.dark
                        ? '#393939'
                        : '#e0e0e0',
                    }"
                    class="text-center rounded-pill mx-auto"
                    height="40"
                    width="80%"
                  >
                  </v-responsive>
                </div>
                <div style="flex: 1">
                  <v-skeleton-loader
                    :boilerplate="false"
                    type="button"
                  ></v-skeleton-loader>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO: If loading -->
    <!-- TODO: If post not found -->
    <!-- TODO: If post found -->
    <!-- TODO: If desktop view -->
    <!-- TODO: If post not found -->
    <!-- TODO: If post found -->
    <!-- TODO: If post has media -->
    <!-- TODO: If post has no media -->
    <!-- <h1>Posts details page with post Id</h1> -->
    <!-- <v-btn nuxt to="./">Back to posts</v-btn> -->

    <!-- <v-footer absolute class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TagMention from '~/components/common/TagMention.vue'
import URLMention from '~/components/common/URLMention.vue'
import UserMention from '~/components/common/UserMention.vue'
export default {
  components: { UserMention, TagMention, URLMention },
  layout: 'admin',
  // asyncData(context) {
  //   console.log({ context, env: context.app.$config.env })
  //   return {}
  // },
  data() {
    return {
      loading: false,
      postData: {
        id: 'aogrs53ffyflrso',
        caption:
          'This is a new #newTag with a http://banky.studio/#/projects https://twitter.com . I also want to tag @bankole2000',
        published: false,
        allowComments: true,
        showLikesCount: true,
        createdBy: 'k4i1u6w41jtnidx',
        createdByData: {
          displayname: 'Bankole',
          username: 'bankole',
          userId: 'k4i1u6w41jtnidx',
          roles: [
            'USER',
            'SCOUT',
            'AGENT',
            'MODERATOR',
            'MODERATION',
            'SUPPORT',
            'SYSTEM',
            'ADMIN',
            'SUPER_ADMIN',
            'JURY',
            'JUDGE',
          ],
        },
        urls: ['http://banky.studio/#/projects', 'https://twitter.com'],
        version: 0,
        created: '2023-02-18T17:45:02.139Z',
        updated: '2023-02-21T14:31:58.074Z',
        deletedAt: null,
        postMedia: [
          {
            id: '68pmic98iq43lzl',
            type: 'IMAGE',
            imageUrl:
              'http://localhost:8080/api/files/08tzclgz3oh38j1/68pmic98iq43lzl/screenshot_2023_02_09_180714_Es3fIrywYz.png',
            image: 'screenshot_2023_02_09_180714_Es3fIrywYz.png',
            order: 0,
            data: {},
            post: 'aogrs53ffyflrso',
            created: '2023-02-19T22:21:46.927Z',
            updated: '2023-02-19T22:23:14.214Z',
          },
          {
            id: 'fuacqy7myt3dciv',
            type: 'IMAGE',
            imageUrl:
              'http://localhost:8080/api/files/08tzclgz3oh38j1/fuacqy7myt3dciv/screenshot_2023_02_09_180440_GJKdBGTT38.png',
            image: 'screenshot_2023_02_09_180440_GJKdBGTT38.png',
            order: 1,
            data: {},
            post: 'aogrs53ffyflrso',
            created: '2023-02-19T12:41:14.038Z',
            updated: '2023-02-19T22:23:14.216Z',
          },
          {
            id: '1xtdku5z68thb78',
            type: 'IMAGE',
            imageUrl:
              'http://localhost:8080/api/files/08tzclgz3oh38j1/1xtdku5z68thb78/screenshot_2023_02_09_180315_e0AHzJNGhG.png',
            image: 'screenshot_2023_02_09_180315_e0AHzJNGhG.png',
            order: 2,
            data: {},
            post: 'aogrs53ffyflrso',
            created: '2023-02-19T21:11:15.176Z',
            updated: '2023-02-19T22:23:14.216Z',
          },
        ],
        moderation: {
          postId: 'aogrs53ffyflrso',
          moderated: false,
          autoModerate: false,
          contentWarning: false,
          status: 'PENDING',
          created: '2023-02-22T13:26:22.184Z',
          updated: null,
          publishAt: '2023-02-21T14:32:00.000Z',
        },
        tags: [
          {
            id: 'eab42765-7bad-4162-bfa4-6994a19474dc',
            name: 'newtag',
            createdAt: '2023-02-20T11:07:00.595Z',
          },
        ],
        _count: {
          comments: 0,
          likedBy: 0,
          postMedia: 3,
          views: 0,
        },
      },
      commentLoaders: [5, 4, 3, 2, 1],
      interval: null,
    }
  },
  computed: {
    ...mapGetters({
      leftNavActive: 'ui/showMainLeftNav',
      profilePath: 'profilePath',
    }),
    captionParsed() {
      if (this.postData) {
        if (this.postData.caption) {
          return this.postData.caption.split(' ')
        }
        return []
      }
      return []
    },
    likesCount() {
      if (this.postData) {
        return this.postData._count.likedBy
      }
      return 0
    },
    commentsCount() {
      if (this.postData) {
        return this.postData._count.comments
      }
      return 0
    },
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
    window.clearTimeout(this.interval)
  },
  mounted() {
    window.clearInterval()
    this.animateCommentLoaders()
    console.log({ interval: this.interval })
  },
  methods: {
    stopAnimation() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
        this.loading = false
      } else {
        this.animateCommentLoaders()
      }
    },
    animateCommentLoaders() {
      this.interval = setInterval(() => {
        this.commentLoaders.unshift(this.commentLoaders[0] + 1)
        if (this.commentLoaders.length > 4) {
          this.commentLoaders.pop()
        }
        console.log({ commentLoaders: this.commentLoaders })
      }, 1500)
      this.loading = true
    },
  },
  // asyncData(context) {},
}
</script>

<style></style>
