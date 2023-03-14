<template>
  <div style="width: 400px">
    <CaptionField :value="caption" @changed="captionChanged" />
    <v-expand-transition>
      <div></div>
    </v-expand-transition>
    <v-expand-transition>
      <PostImageUpload
        v-show="addImage"
        :post-id="postId"
        @cancel="addImage = false"
      />
    </v-expand-transition>
    <div class="d-flex align-center pa-2">
      <div style="flex: 1">
        <v-btn rounded-lg block class="text-capitalize" @click="addImage = true"
          ><v-icon left>mdi-image</v-icon>Image</v-btn
        >
      </div>
      <div style="flex: 1">
        <v-btn
          rounded-lg
          block
          class="text-capitalize mx-2"
          @click="addGif = true"
          ><v-icon left>mdi-file-gif-box</v-icon>Gif</v-btn
        >
      </div>
      <div style="flex: 1" class="d-flex">
        <v-spacer></v-spacer>
        <v-btn icon class="mx-2"><v-icon>mdi-map-marker</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
      </div>
    </div>
    <div class="px-2">
      <v-btn
        block
        :disabled="!canPublish"
        class="text-capitalize"
        @click="publish"
        >Post</v-btn
      >
    </div>
    <GifSelectModal
      :show="addGif"
      :post-id="postId"
      @show="($event) => (addGif = $event)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CaptionField from './pieces/CaptionField.vue'
import PostImageUpload from './pieces/PostImageUpload.vue'
import GifSelectModal from '~/components/common/GifSelectModal.vue'

export default {
  components: { PostImageUpload, CaptionField, GifSelectModal },
  data() {
    return {
      addImage: false,
      addGif: false,
      caption: '',
    }
  },
  computed: {
    ...mapGetters({
      postInCreation: 'user/posts/postInCreation',
    }),
    postId() {
      if (this.postInCreation) {
        return this.postInCreation.id
      }
      return null
    },
    postMedia() {
      if (this.postInCreation) {
        return this.postInCreation.postMedia
      }
      return []
    },
    canPublish() {
      if (!this.postInCreation) return false
      return this.postMedia.length > 0 || !!this.caption
    },
  },
  async mounted() {
    console.log({ postInCreation: this.postInCreation })
    if (!this.postInCreation) {
      const result = await this.createPost()
      console.log({ result })
    }
  },
  methods: {
    ...mapActions({
      createPost: 'user/posts/createPost',
      publishPost: 'user/posts/publishPost',
    }),
    captionChanged(e) {
      console.log('Caption changed')
      this.caption = e
    },
    async publish() {
      console.log('Calling vuex publish')
      const result = await this.publishPost({
        caption: this.caption,
        postId: this.postInCreation.id,
      })
      console.log({ result })
    },
  },
}
</script>

<style></style>
