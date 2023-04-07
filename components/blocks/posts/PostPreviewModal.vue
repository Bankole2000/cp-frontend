<template>
  <v-dialog
    :value="dialog"
    :scrollable="$vuetify.breakpoint.smAndDown"
    persistent
    fullscreen
  >
    <v-card v-if="$vuetify.breakpoint.smAndDown">
      <v-card-title class="d-flex align-center pa-2">
        <v-btn icon @click="close"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <span style="font-size: 15px"
          ><strong>@{{ post.createdByData.username }}'s</strong> Post</span
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="close"><v-icon>mdi-window-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="px-0">
        <v-skeleton-loader
          :boilerplate="false"
          :loading="loading"
          type="list-item-avatar-two-line, list-item-three-line"
          :tile="false"
          class="mx-auto"
        >
          <div>
            <PostHeader v-if="postData" :post="postData" />
            <PostCaption
              v-if="postData ? postData.caption : false"
              :post-socket="postSocket"
              :profile-socket="profileSocket"
              :sockets-ready="socketsReady"
              :caption="postData ? postData.caption : null"
              :post-data="postData"
            />
          </div>
        </v-skeleton-loader>
        <v-skeleton-loader
          :boilerplate="false"
          type="image"
          tile
          class="mx-auto"
        >
          <v-carousel
            v-model="activeMedia"
            :continuous="false"
            :cycle="false"
            :show-arrows="true"
            hide-delimiter-background
            :hide-delimiters="postMedia.length < 2"
            height="auto"
          >
            <!-- delimiter-icon="mdi-circle" -->
            <!-- height="400" -->
            <!-- :aspect-ratio="1.2" -->
            <!-- height="400" -->
            <v-carousel-item v-for="(m, i) in postMedia" :key="i">
              <!-- :src="`${m.imageUrl}?thumb=720x600`" -->
              <v-img
                :src="`${m.imageUrl}${
                  m.type === 'IMAGE' && $vuetify.breakpoint.mdAndDown
                    ? '?thumb=720x600'
                    : ''
                }`"
                :aspect-ratio="
                  m.type === 'GIF' ? m.data.width / m.data.height : 360 / 300
                "
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
                      :color="
                        $vuetify.theme.dark
                          ? 'grey lighten-5'
                          : 'primary lighten-2'
                      "
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </v-skeleton-loader>
        <div v-if="postData?.repostId" class="px-4 mb-2">
          <RepostPreview :post="postData.repost" />
        </div>
        <v-divider></v-divider>
        <v-skeleton-loader
          :boilerplate="false"
          :loading="loading"
          type="card-heading"
          class="mx-auto"
        >
          <div>
            <v-layout>
              <v-flex class="align-self-center" xs3>
                <ModalCommentButton
                  :post-id="postId"
                  :comment-count="postData?._count?.comments"
                  @add-comment-intent="showAddCommentModal = true"
                />
              </v-flex>
              <v-flex class="align-self-center" xs3>
                <ModalRepostButton
                  :post-id="postId"
                  :repost-count="postData?.repostOnlyCount"
                  :reposted-by-user="postData?.repostedByYou"
                />
              </v-flex>
              <v-flex class="align-self-center" xs3>
                <ModalQuotePostButton
                  :post-id="postId"
                  :quote-repost-count="postData?.quoteRepostCount"
                  @show-quote-post-modal="showQuotePostModal = true"
                />
              </v-flex>
              <v-flex class="align-self-center" xs3>
                <ModalLikeButton
                  :sockets-ready="socketsReady"
                  :post-socket="postSocket"
                  :post-id="postId"
                  :like-count="postData?._count?.likedBy"
                  :liked-by-user="postData?.likedByYou"
                />
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout>
              <v-flex xs3>
                <ModalAnalyticsButton :post-id="postId" />
              </v-flex>
              <v-flex xs3>
                <ModalBookmarkButton
                  :saved-by-user="postData?.savedByYou"
                  :post-id="postId"
                />
              </v-flex>
              <v-flex xs3>
                <ModalShareButton :post-id="postId" />
              </v-flex>
              <v-flex xs3>
                <ModalSendButton :post-id="postId" />
              </v-flex>
            </v-layout>
          </div>
        </v-skeleton-loader>
        <v-divider></v-divider>
        <div>
          <div>
            <CommentList
              :active="dialog"
              :post-id="postId"
              :post-author-id="postData?.createdBy"
              :post-socket="postSocket"
              :profile-socket="profileSocket"
              :sockets-ready="socketsReady"
              @comment-count-changed="commentCountChanged"
            />
          </div>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div
          v-if="!$store.getters['auth/user']"
          class="d-flex"
          style="min-width: 100%"
        >
          <v-alert
            prominent
            icon="mdi-comment-outline"
            :color="'primary'"
            class="mb-0 elevated-light"
            border="left"
            colored-border
          >
            <v-row align="center">
              <v-col cols="12" class="py-2 text-center">
                Join to Comment
                <span v-if="$vuetify.breakpoint.smAndUp"
                  >on <strong>@{{ post.createdByData.username }}</strong
                  >'s Post</span
                >
              </v-col>
              <v-col cols="6" class="pt-0 pb-1">
                <v-btn
                  block
                  outlined
                  :color="$vuetify.theme.dark ? 'white' : 'secondary'"
                  class="text-capitalize"
                  ><v-icon left>mdi-login-variant</v-icon> Login</v-btn
                >
              </v-col>
              <v-col cols="6" class="pt-0 pb-1">
                <v-btn block depressed color="primary" class="text-capitalize"
                  ><v-icon left>mdi-account</v-icon> Signup</v-btn
                >
              </v-col>
            </v-row>
          </v-alert>
        </div>

        <CreateCommentForm
          v-else
          :post-id="postId"
          :show-add-comment-modal="showAddCommentModal"
          :post-socket="postSocket"
          :profile-socket="profileSocket"
          :sockets-ready="socketsReady"
          @close-modal="showAddCommentModal = false"
          @add-comment-intent="showAddCommentModal = true"
        />
      </v-card-actions>
      <CreateNewPostModal
        :show="showQuotePostModal"
        :sockets-ready="socketsReady"
        :profile-socket="profileSocket"
        :post-socket="postSocket"
        :repost-id="postId"
        @close="showQuotePostModal = false"
      />
    </v-card>
    <div v-else class="d-flex">
      <div style="width: 70vw">
        <v-card
          tile
          style="min-height: 100vh; min-width: 100%"
          class="transparent"
        >
          <v-overlay :absolute="true" :opacity="0.8" :value="true">
            <v-carousel
              v-model="activeMedia"
              :continuous="false"
              :cycle="false"
              :show-arrows="true"
              hide-delimiter-background
              :hide-delimiters="postMedia.length < 2"
              height="90vh"
              width="100%"
            >
              <v-carousel-item v-for="(m, i) in postMedia" :key="i">
                <v-card
                  color="transparent"
                  flat
                  height="90vh"
                  width="70vw"
                  class="fill-height d-flex align-center justify-center"
                >
                  <v-img
                    :src="`${m.imageUrl}${
                      m.type === 'IMAGE' && $vuetify.breakpoint.mdAndDown
                        ? '?thumb=720x600'
                        : ''
                    }`"
                    :aspect-ratio="
                      m.type === 'GIF'
                        ? m.data.width / m.data.height
                        : 360 / 300
                    "
                    max-height="90vh"
                    max-width="70vw"
                    contain
                    @click="() => {}"
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
                </v-card>
              </v-carousel-item>
            </v-carousel>
          </v-overlay>
        </v-card>
      </div>
      <div style="width: 30vw">
        <v-card
          style="
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            max-height: 100vh;
          "
        >
          <v-card-title
            class="headline d-flex align-center py-0"
            style="height: 56px; flex-grow: 0; flex-shrink: 0"
          >
            <v-btn icon @click="close"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-spacer></v-spacer>
            <span style="font-size: 15px"
              ><strong>@{{ post.createdByData.username }}'s</strong> Post</span
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="close"><v-icon>mdi-window-close</v-icon></v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="px-0 pb-0"
            style="
              flex-grow: 1;
              overflow-y: scroll;
              height: calc(100vh - (56px + 68px));
            "
          >
            <v-skeleton-loader
              :boilerplate="false"
              :loading="loading"
              type="list-item-avatar-two-line, list-item-three-line"
              :tile="false"
              class="mx-auto"
            >
              <PostHeader v-if="postData" :post="postData" />
              <PostCaption
                :caption="post.caption"
                :post-socket="postSocket"
                :profile-socket="profileSocket"
                :sockets-ready="socketsReady"
                :post-data="post"
              />
              <div v-if="postData?.repostId" class="mt-n2 px-4 mb-2">
                <RepostPreview :post="postData.repost" />
              </div>
            </v-skeleton-loader>
            <v-divider></v-divider>
            <v-skeleton-loader
              :boilerplate="false"
              :loading="loading"
              type="card-heading"
              class="mx-auto"
            >
              <div>
                <v-layout>
                  <v-flex class="align-self-center" xs3>
                    <ModalCommentButton
                      :post-id="postId"
                      :comment-count="postData?._count?.comments"
                      @add-comment-intent="showAddCommentModal = true"
                    />
                  </v-flex>
                  <v-flex class="align-self-center" xs3>
                    <ModalRepostButton
                      :post-id="postId"
                      :repost-count="postData?.repostOnlyCount"
                      :reposted-by-user="postData?.repostedByYou"
                    />
                  </v-flex>
                  <v-flex class="align-self-center" xs3>
                    <ModalQuotePostButton
                      :post-id="postId"
                      :quote-repost-count="postData?.quoteRepostCount"
                      @show-quote-post-modal="showQuotePostModal = true"
                    />
                  </v-flex>
                  <v-flex class="align-self-center" xs3>
                    <ModalLikeButton
                      :post-id="postId"
                      :sockets-ready="socketsReady"
                      :post-socket="postSocket"
                      :like-count="postData?._count?.likedBy"
                      :liked-by-user="postData?.likedByYou"
                    />
                  </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout>
                  <v-flex xs3>
                    <ModalAnalyticsButton :post-id="postId" />
                  </v-flex>
                  <v-flex xs3>
                    <ModalBookmarkButton
                      :post-id="postId"
                      :saved-by-user="postData?.savedByYou"
                    />
                  </v-flex>
                  <v-flex xs3>
                    <ModalShareButton :post-id="postId" />
                  </v-flex>
                  <v-flex xs3>
                    <ModalSendButton :post-id="postId" />
                  </v-flex>
                </v-layout>
              </div>
            </v-skeleton-loader>
            <v-divider></v-divider>
            <div>
              <CommentList
                :active="dialog"
                :post-id="postId"
                :post-author-id="postData?.createdBy"
                :post-socket="postSocket"
                :profile-socket="profileSocket"
                :sockets-ready="socketsReady"
                @comment-count-changed="commentCountChanged"
              />
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <div
              v-if="!$store.getters['auth/user']"
              class="d-flex justify-center"
              style="min-width: 100%"
            >
              <v-alert
                prominent
                icon="mdi-comment-outline"
                :color="'primary'"
                class="mb-0 elevated-light"
                border="left"
                colored-border
              >
                <v-row align="center">
                  <v-col cols="12" class="py-2 text-center">
                    Join to comment on
                    <strong>@{{ post.createdByData.username }}</strong
                    >'s Post
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-1">
                    <v-btn
                      block
                      outlined
                      :color="$vuetify.theme.dark ? 'white' : 'secondary'"
                      class="text-capitalize"
                      ><v-icon left>mdi-login-variant</v-icon> Login</v-btn
                    >
                  </v-col>
                  <v-col cols="6" class="pt-0 pb-1">
                    <v-btn
                      block
                      depressed
                      color="primary"
                      class="text-capitalize"
                      ><v-icon left>mdi-account</v-icon> Signup</v-btn
                    >
                  </v-col>
                </v-row>
              </v-alert>
            </div>
            <CreateCommentForm
              v-else
              :post-id="postId"
              :show-add-comment-modal="showAddCommentModal"
              :post-socket="postSocket"
              :profile-socket="profileSocket"
              :sockets-ready="socketsReady"
              @add-comment-intent="showAddCommentModal = true"
              @close-modal="showAddCommentModal = false"
            />
          </v-card-actions>
          <CreateNewPostModal
            :show="showQuotePostModal"
            :sockets-ready="socketsReady"
            :profile-socket="profileSocket"
            :post-socket="postSocket"
            :repost-id="postId"
            @close="showQuotePostModal = false"
          />
        </v-card>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import CommentList from '../comments/CommentList.vue'
import PostCaption from './post-card-pieces/PostCaption.vue'
import PostHeader from './post-card-pieces/PostHeader.vue'
import ModalLikeButton from './post-card-pieces/post-modal-pieces/ModalLikeButton.vue'
import ModalCommentButton from './post-card-pieces/post-modal-pieces/ModalCommentButton.vue'
import ModalQuotePostButton from './post-card-pieces/post-modal-pieces/ModalQuotePostButton.vue'
import ModalRepostButton from './post-card-pieces/post-modal-pieces/ModalRepostButton.vue'
import ModalAnalyticsButton from './post-card-pieces/post-modal-pieces/ModalAnalyticsButton.vue'
import ModalBookmarkButton from './post-card-pieces/post-modal-pieces/ModalBookmarkButton.vue'
import ModalShareButton from './post-card-pieces/post-modal-pieces/ModalShareButton.vue'
import ModalSendButton from './post-card-pieces/post-modal-pieces/ModalSendButton.vue'
import RepostPreview from './post-card-pieces/repost/RepostPreview.vue'
import CreateCommentForm from '~/components/forms/comments/CreateCommentForm.vue'
import CreateNewPostModal from '~/components/modals/CreateNewPostModal.vue'

export default {
  components: {
    PostHeader,
    PostCaption,
    CommentList,
    CreateCommentForm,
    ModalLikeButton,
    ModalCommentButton,
    ModalQuotePostButton,
    ModalRepostButton,
    ModalAnalyticsButton,
    ModalBookmarkButton,
    ModalShareButton,
    ModalSendButton,
    CreateNewPostModal,
    RepostPreview,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
    selectedMedia: {
      type: Number,
      required: true,
      default: 0,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    loading: true,
    activeMedia: 0,
    socketsReady: false,
    profileSocket: {},
    postSocket: {},
    postData: null,
    showAddCommentModal: false,
    showQuotePostModal: false,
  }),
  computed: {
    postMedia() {
      if (this.post) {
        return this.post.postMedia
      }
      return []
    },
  },
  watch: {
    async dialog(newVal) {
      console.log({ selectedMedia: this.selectedMedia })
      if (newVal) {
        this.activeMedia = this.selectedMedia
        await this.getPostData()
        await this.connectSockets()
      } else {
        if (this.profileSocket.connected) {
          this.profileSocket.disconnect()
        }
        if (this.postSocket.connected) {
          this.postSocket.disconnect()
        }
        this.socketsReady = false
      }
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async connectSockets() {
      // this.loading = true
      this.profileSocket = this.$nuxtSocket({
        name: 'profile',
        reconnection: true,
        autoconnect: true,
        path: '/api/v1/profile/socket',
      })
      this.postSocket = this.$nuxtSocket({
        name: 'post',
        reconnection: true,
        autoconnect: true,
        path: '/api/v1/post/socket',
      })
      this.postSocket.on('POST_LIKED', (data) => {
        console.log({ POST_LIKED: data })
        if (data.postId === this.postData?.id) {
          if (this.$store.getters['auth/user']?.userId) {
            if (this.$store.getters['auth/user']?.userId === data.userId) {
              this.postData.likedByYou = true
            }
          }
          this.postData._count.likedBy = data.post._count.likedBy
        }
      })
      this.postSocket.on('POST_UNLIKED', (data) => {
        console.log({ POST_UNLIKED: data })
        if (data.postId === this.postData?.id) {
          if (this.$store.getters['auth/user']?.userId) {
            if (this.$store.getters['auth/user']?.userId === data.userId) {
              this.postData.likedByYou = false
            }
          }
          this.postData._count.likedBy = data.post._count.likedBy - 1
        }
      })
      this.postSocket.on('POST_REPOSTED', (data) => {
        console.log({ POST_REPOSTED: data })
        if (data.repostId === this.postData?.id) {
          if (this.$store.getters['auth/user']?.userId) {
            if (this.$store.getters['auth/user']?.userId === data.createdBy) {
              this.postData.repostedByYou = true
            }
          }
          this.postData.repostOnlyCount = data.repostOnlyCount.count
          this.postData.quoteRepostCount = data.quoteRepostCount.count
        }
      })
      this.postSocket.on('REPOST_UNDONE', (data) => {
        console.log({ REPOST_UNDONE: data })
        if (data.repostId === this.postData?.id) {
          if (this.$store.getters['auth/user']?.userId) {
            if (this.$store.getters['auth/user']?.userId === data.createdBy) {
              this.postData.repostedByYou = false
            }
          }
          this.postData.repostOnlyCount = data.repostOnlyCount.count
          this.postData.quoteRepostCount = data.quoteRepostCount.count
        }
      })
      const result = await this.postSocket.emitP('POST_CONNECTED', {
        postId: this.post.id,
      })
      console.log({ postConnected: result })
      // this.loading = false
      this.socketsReady = result
    },
    commentCountChanged(e) {
      if (this.postData) {
        this.postData._count.comments = e
      }
    },
    async getPostData() {
      console.log('getting post data')
      try {
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}`
        )
        const result = await this.$axios.$get(url.href)
        console.log({ result })
        if (result.success) {
          this.postData = result.data
          console.log('emitting post connected event')
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style></style>
