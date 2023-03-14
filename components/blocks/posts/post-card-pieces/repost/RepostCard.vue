<template>
  <v-card-text class="py-0" @click="showPreview($event)">
    <v-card v-if="post" outlined class="rounded-xl">
      <RepostHeader :post="post" />
      <RepostCaptionOnly v-if="!postHasMedia" :post="post" />
      <RepostMediaOnMedia
        v-else-if="parentHasMedia && postHasMedia"
        :post="post"
      />
      <RepostMediaOnNoMedia v-else :post="post" />
    </v-card>
    <PostNoMediaPreviewModal
      :dialog="showNoMediaPreview"
      :post="post"
      @close="showNoMediaPreview = false"
    />
    <PostPreviewModal
      :dialog="showMediaPreview"
      :post="post"
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
