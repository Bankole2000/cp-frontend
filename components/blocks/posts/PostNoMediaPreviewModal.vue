<template>
  <v-dialog
    :value="dialog"
    persistent
    :fullscreen="$vuetify.breakpoint.xs"
    transition="dialog-bottom-transition"
    scrollable
    :content-class="$vuetify.breakpoint.xs ? '' : 'rounded-xl'"
    :width="
      $vuetify.breakpoint.xs
        ? '100vw'
        : $vuetify.breakpoint.smOnly
        ? '70vw'
        : $vuetify.breakpoint.mdOnly
        ? '60vw'
        : '40vw'
    "
    :min-height="$vuetify.breakpoint.xs ? '100vh' : '80vh'"
  >
    <v-card
      :tile="$vuetify.breakpoint.xs"
      :class="{ 'rounded-xl': !$vuetify.breakpoint.xs }"
      :min-height="$vuetify.breakpoint.xs ? '100vh' : '90vh'"
    >
      <v-card-title class="d-flex align-center py-2 px-2">
        <v-btn icon @click="close"><v-icon>mdi-arrow-left</v-icon></v-btn>
        <v-spacer></v-spacer>
        <span style="font-size: 15px"
          ><strong>@{{ post.createdByData.username }}'s</strong> Post</span
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="close"><v-icon>mdi-window-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px" class="px-0">
        <v-skeleton-loader
          :boilerplate="false"
          type="list-item-avatar-two-line, list-item-three-line"
          :tile="false"
          :loading="loading"
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
            <div v-if="postData?.repostId" class="mt-n2 px-4 mb-2">
              <RepostPreview :post="postData.repost" />
            </div>
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
        <CommentList
          :active="dialog"
          :post-id="postId"
          :post-author-id="postData?.createdBy"
          :post-socket="postSocket"
          :profile-socket="profileSocket"
          :sockets-ready="socketsReady"
          @comment-count-changed="commentCountChanged"
        />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <div
          v-if="!$store.getters['auth/user']"
          class="d-flex grow justify-center"
          style="flex: 1"
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
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      socketsReady: false,
      profileSocket: {},
      postSocket: {},
      postData: null,
      showAddCommentModal: false,
      showQuotePostModal: false,
    }
  },
  watch: {
    async dialog(newVal) {
      console.log({ newVal })
      console.log({ selectedMedia: this.selectedMedia })
      if (newVal) {
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
      this.postSocket.on('POST_REPOSTED', (data) => {
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
      this.postSocket.on('REPOST_UNDONE', (data) => {
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
