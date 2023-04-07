<template>
  <v-card-text class="py-0" @click="showPreview($event)">
    <v-card v-if="post" outlined class="rounded-xl">
      <RepostHeader :post="post" />
      <RepostMediaOnMedia v-if="postHasMedia && postHasCaption" :post="post" />
      <RepostCaptionOnly
        v-else-if="!postHasMedia && postHasCaption"
        :post="post"
      />
      <!-- v-else-if="parentHasMedia && postHasMedia" -->
      <RepostMediaOnNoMedia v-else :post="post" />
    </v-card>
    <PostNoMediaPreviewModal
      :dialog="showNoMediaPreview"
      :post="post"
      :post-id="post.id"
      @close="showNoMediaPreview = false"
    />
    <PostPreviewModal
      :dialog="showMediaPreview"
      :selected-media="0"
      :profile-socket="profileSocket"
      :post-socket="postSocket"
      :sockets-ready="socketsReady"
      :post="post"
      :post-id="post.id"
      @close="showMediaPreview = false"
    />
  </v-card-text>
</template>

<script>
import PostNoMediaPreviewModal from '../../PostNoMediaPreviewModal.vue'
import PostPreviewModal from '../../PostPreviewModal.vue'
import RepostCaptionOnly from './RepostCaptionOnly.vue'
import RepostHeader from './RepostHeader.vue'
import RepostMediaOnMedia from './RepostMediaOnMedia.vue'
import RepostMediaOnNoMedia from './RepostMediaOnNoMedia.vue'
export default {
  components: {
    RepostCaptionOnly,
    RepostHeader,
    RepostMediaOnMedia,
    RepostMediaOnNoMedia,
    PostNoMediaPreviewModal,
    PostPreviewModal,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
    parentHasMedia: {
      type: Boolean,
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
  },
  data: () => ({
    showMediaPreview: false,
    showNoMediaPreview: false,
  }),
  computed: {
    postHasMedia() {
      if (!this.post) return false
      if (this.post.postMedia) {
        return this.post.postMedia.length > 0
      }
      return false
    },
    postHasCaption() {
      if (!this.post) return false
      if (this.post.caption) {
        return true
      }
      return false
    },
  },
  methods: {
    showPreview(e) {
      console.log({ e })
      if (!this.post) return null
      if (this.post.postMedia.length) {
        this.showMediaPreview = true
        return
      }
      this.showNoMediaPreview = true
    },
  },
}
</script>

<style></style>
