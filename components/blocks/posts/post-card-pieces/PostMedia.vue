<template>
  <div style="position: relative">
    <!-- <div
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
    </div> -->
    <v-overlay
      absolute
      :opacity="0.9"
      :style="{ backdropFilter: contentWarning ? 'blur(10px)' : 'none' }"
      :value="contentWarning"
    >
      <div class="px-4">
        <div class="text-center">
          <v-icon color="white">mdi-eye-off-outline</v-icon>
        </div>
        <p class="font-weight-bold text-h5 mb-2 text-center">Content Warning</p>
        <p class="text-center">
          This post was flagged as showing sensitive content
        </p>
        <div class="text-center">
          <v-btn
            class="rounded-xl text-capitalize"
            depressed
            @click.stop="contentWarning = false"
            >Show</v-btn
          >
        </div>
      </div>
    </v-overlay>
    <PostMediaCarousel
      :media="post.postMedia"
      @image-clicked="$emit('image-clicked')"
      @media-changed="mediaChanged"
    />
  </div>
</template>

<script>
import PostMediaCarousel from './PostMediaCarousel.vue'
export default {
  components: {
    PostMediaCarousel,
  },
  props: ['post'],
  data() {
    return {
      contentWarning: true,
    }
  },
  mounted() {
    if (!this.post) {
      this.contentWarning = false
      return
    }
    if (!this.post.moderation) {
      this.contentWarning = false
      return
    }
    this.contentWarning = this.post.moderation.contentWarning
  },
  methods: {
    mediaChanged(e) {
      console.log({ e })
      this.$emit('media-changed', e)
    },
  },
}
</script>

<style></style>
