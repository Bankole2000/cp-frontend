<template>
  <v-card-text class="px-0 pb-0 pt-2" @click="$emit('handle-click')">
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
  </v-card-text>
</template>

<script>
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
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
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
}
</script>

<style></style>
