<template>
  <div ref="postCard" class="mb-4">
    <v-card class="elevated-light rounded-xl pa-0">
      <v-card-title class="pt-1 px-0 pb-0" @click="showPreview($event)">
        <RepostPin
          v-if="post.repostId || post.pinned"
          :username="post.repostId ? post.createdByData.username : null"
          :pinned="post.pinned"
        />
        <PostHeader :post="isRepostOnly ? post.repost : post" />
      </v-card-title>
      <PostCaption
        v-if="postData ? postData.caption : false"
        :caption="postData ? postData.caption : null"
        :post-data="postData"
        @click="showPreview($event)"
      />
      <v-card-text class="pa-0">
        <PostMedia
          v-if="postData ? postData.postMedia.length : false"
          :post="postData"
          class="mb-4"
        />
        <RepostCard
          :parent-has-media="postData ? postData.postMedia.length > 0 : false"
          :post="postData"
        />
        <v-card-text v-if="isQuoteRepost">
          <v-card outlined class="rounded-xl">
            <RepostHeader />
            <RepostCaptionOnly />
            <RepostMediaOnMedia />
            <RepostMediaOnNoMedia />
          </v-card>
        </v-card-text>
        <div class="d-flex align-center flex-wrap px-4 py-2">
          <div style="flex: 1" class="mr-3">
            <CommentButton />
          </div>
          <div style="flex: 1" class="mr-3">
            <RepostButton />
          </div>
          <div style="flex: 1" class="mr-3">
            <LikeButton />
          </div>
          <v-spacer></v-spacer>
          <AnalyticsButton />
          <ShareButton />
          <BookMarkButton />
        </div>
      </v-card-text>
    </v-card>
    <PostNoMediaPreviewModal
      :dialog="showNoMediaPreview"
      :post="postData"
      @close="showNoMediaPreview = false"
    />
    <PostPreviewModal
      :dialog="showMediaPreview"
      :post="postData"
      @close="showMediaPreview = false"
    />
  </div>
</template>

<script>
import AnalyticsButton from './post-card-pieces/AnalyticsButton.vue'
import BookMarkButton from './post-card-pieces/BookMarkButton.vue'
import CommentButton from './post-card-pieces/CommentButton.vue'
import LikeButton from './post-card-pieces/LikeButton.vue'
import PostCaption from './post-card-pieces/PostCaption.vue'
import PostHeader from './post-card-pieces/PostHeader.vue'
import PostMedia from './post-card-pieces/PostMedia.vue'
import RepostCard from './post-card-pieces/repost/RepostCard.vue'

import RepostPin from './post-card-pieces/repost/RepostPin.vue'
import RepostButton from './post-card-pieces/RepostButton.vue'
import ShareButton from './post-card-pieces/ShareButton.vue'
import PostNoMediaPreviewModal from './PostNoMediaPreviewModal.vue'
import PostPreviewModal from './PostPreviewModal.vue'
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
  },
  props: ['post', 'index', 'total'],
  data: () => ({
    likedByUser: false,
    showMediaPreview: false,
    showNoMediaPreview: false,
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
      if (this.isRepostOnly) {
        return this.post.repost
      }
      return this.post
    },
  },
  mounted() {
    this.onElementObserved()
  },
  methods: {
    onElementObserved() {
      const observer = new IntersectionObserver(
        (entries) => {
          console.log({ entries })
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) {
              // this.player.play();
              console.log(`Is Intersecting ${this.post.id}`)
              if (this.index === this.total) {
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
