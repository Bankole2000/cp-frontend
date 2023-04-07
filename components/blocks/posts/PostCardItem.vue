<template>
  <div ref="postCard" class="mb-4">
    <v-card class="elevated-light rounded-xl pa-0">
      <v-card-title class="pt-1 px-0 pb-0">
        <RepostPin
          v-if="isRepostOnly || post.pinned"
          :username="post.repostId ? post.createdByData.username : null"
          :pinned="post.pinned"
          @handle-click="showPreview"
        />
        <PostHeader
          :post="isRepostOnly ? post.repost : post"
          @handle-click="showPreview"
        />
      </v-card-title>
      <PostCaption
        v-if="postData ? postData.caption : false"
        :post-socket="postSocket"
        :profile-socket="profileSocket"
        :sockets-ready="socketsReady"
        :caption="postData ? postData.caption : null"
        :post-data="postData"
        @handle-click="showPreview($event)"
      />
      <v-card-text class="pa-0">
        <PostMedia
          v-if="postData ? postData.postMedia.length : false"
          :post="postData"
          class="mb-4"
          @image-clicked="showPreview"
          @media-changed="mediaChanged"
        />
        <RepostCard
          v-if="isQuoteRepost || postData.repost"
          :profile-socket="profileSocket"
          :post-socket="postSocket"
          :sockets-ready="socketsReady"
          :parent-has-media="postData ? postData.postMedia.length > 0 : false"
          :post="postData.repost"
        />
        <div class="d-flex align-center flex-wrap px-4 py-2">
          <div style="flex: 1" class="mr-3">
            <CommentButton
              :comment-count="postData?._count?.comments"
              @show-comments="showPreview"
            />
          </div>
          <div style="flex: 1" class="mr-3">
            <!-- :key="`${repostCount}-${post.id}`" -->
            <RepostButton
              :sockets-ready="socketsReady"
              :post-socket="postSocket"
              :post-id="postData.id"
              :repost-count="repostCount"
              :is-repost-only="isRepostOnly"
              :reposted-by-user="post.repostedByYou"
              @show-quote-post-modal="showQuotePostModal = true"
            />
          </div>
          <div style="flex: 1" class="mr-3">
            <LikeButton
              :post-id="postData.id"
              :liked-by-user="post.likedByYou"
              :post-socket="postSocket"
              :sockets-ready="socketsReady"
              :likes-count="postData._count.likedBy"
              :show-likes-count="postData.showLikesCount"
            />
          </div>
          <v-spacer></v-spacer>
          <AnalyticsButton />
          <ShareButton />
          <BookMarkButton />
        </div>
      </v-card-text>
      <div v-if="postData?.comments && postData?.comments?.length">
        <PinnedComment
          :comment="postData?.comments[0]"
          :post-author-id="postData?.createdBy"
        />
      </div>
    </v-card>
    <CreateNewPostModal
      :sockets-ready="socketsReady"
      :post-socket="postSocket"
      :profile-socket="profileSocket"
      :show="showQuotePostModal"
      :repost-id="postData.id"
      @close="showQuotePostModal = false"
    />
    <PostNoMediaPreviewModal
      :post-id="postData.id"
      :dialog="showNoMediaPreview"
      :post="postData"
      @close="showNoMediaPreview = false"
    />
    <PostPreviewModal
      :post-id="postData.id"
      :profile-socket="profileSocket"
      :post-socket="postSocket"
      :sockets-ready="socketsReady"
      :dialog="showMediaPreview"
      :post="postData"
      :selected-media="selectedMedia"
      @close="showMediaPreview = false"
    />
  </div>
</template>

<script>
// import Comment from '../comments/Comment.vue'
import AnalyticsButton from './post-card-pieces/AnalyticsButton.vue'
import BookMarkButton from './post-card-pieces/BookMarkButton.vue'
import CommentButton from './post-card-pieces/CommentButton.vue'
import LikeButton from './post-card-pieces/LikeButton.vue'
import PinnedComment from './post-card-pieces/PinnedComment.vue'
import PostCaption from './post-card-pieces/PostCaption.vue'
import PostHeader from './post-card-pieces/PostHeader.vue'
import PostMedia from './post-card-pieces/PostMedia.vue'
import RepostCard from './post-card-pieces/repost/RepostCard.vue'
import RepostPin from './post-card-pieces/repost/RepostPin.vue'
import RepostButton from './post-card-pieces/RepostButton.vue'
import ShareButton from './post-card-pieces/ShareButton.vue'
import PostNoMediaPreviewModal from './PostNoMediaPreviewModal.vue'
import PostPreviewModal from './PostPreviewModal.vue'
import CreateNewPostModal from '~/components/modals/CreateNewPostModal.vue'
export default {
  components: {
    BookMarkButton,
    ShareButton,
    AnalyticsButton,
    LikeButton,
    RepostButton,
    CommentButton,
    PostCaption,
    RepostPin,
    PostHeader,
    PostMedia,
    PostNoMediaPreviewModal,
    PostPreviewModal,
    RepostCard,
    PinnedComment,
    CreateNewPostModal,
    // Comment,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    postSocket: {
      type: Object,
      required: true,
    },
    profileSocket: {
      type: Object,
      required: true,
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
    index: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    repostCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data: () => ({
    likedByUser: false,
    showMediaPreview: false,
    showNoMediaPreview: false,
    selectedMedia: 0,
    showQuotePostModal: false,
    // repostCount: 0,
    // socket: null,
  }),
  computed: {
    isRepostOnly() {
      if (!this.post) return false
      if (!this.post.repostId) return false
      if (this.post.caption || this.post.postMedia.length) return false
      return true
    },
    isQuoteRepost() {
      if (!this.post) return false
      if (!this.post.repostId) return false
      if (this.post.caption || this.post.postMedia.length) return true
      return false
    },
    postData() {
      if (!this.post) return null
      if (this.isRepostOnly) {
        return this.post.repost
      }
      return this.post
    },
  },
  watch: {
    socketsReady(newVal) {
      if (newVal) {
        // console.log('Getting repostCount')
        // this.postSocket.emit('GET_REPOST_COUNT', {
        //   postId: this.postData.id,
        // })
      }
    },
  },
  mounted() {
    if (this.socketsReady) {
      // console.log('Getting repostCount')
      // console.log({ postData: this.postData })
      // this.postSocket.emit('GET_REPOST_COUNT', {
      //   postId: this.postData ? this.postData.id : '',
      // })
    }
    this.onElementObserved()
  },
  created() {
    // this.socket = this.$nuxtSocket({
    //   name: 'post',
    //   reconnection: true,
    //   autoconnect: true,
    //   path: '/api/v1/post/socket',
    // })
    // this.socket.on('GET_REPOST_COUNT', (data) => {
    //   if (this.postData.id === data.postId) {
    //     console.log(
    //       'Got repost count',
    //       data.postId,
    //       `is repost ${this.isRepostOnly}`
    //     )
    //     this.repostCount = data.count
    //   }
    // })
    // this.socket.emit('GET_REPOST_COUNT', {
    //   postId: this.postData.id,
    // })
  },
  methods: {
    mediaChanged(e) {
      console.log({ e })
      this.selectedMedia = e
    },
    onElementObserved() {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log({ entries })
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              // this.player.play();
              console.log(`Is Intersecting ${this.post.id}`)
              console.log({ index: this.index, total: this.total })
              if (this.index + 1 === this.total) {
                console.log('Last Post')
                // check if any more ads to fetch
                this.$emit('fetch-more')
              }
              // this.visible = true
            } else {
              // this.player.pause();
              console.log(`Is NOT Intersecting ${this.post.id}`)
              // this.visible = false
            }
          })
        },
        { threshold: 1 }
      )
      observer.observe(this.$refs.postCard)
    },
    showPreview(e) {
      console.log({ e })
      if (!this.postData) return null
      if (this.postData.postMedia.length) {
        this.showMediaPreview = true
        return
      }
      this.showNoMediaPreview = true
    },
  },
}
</script>

<style></style>
