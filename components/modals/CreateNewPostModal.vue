<template>
  <v-dialog
    v-model="dialog"
    :content-class="
      $vuetify.breakpoint.width > 420 ? 'rounded-xl' : 'elevated-light'
    "
    persistent
    :fullscreen="$vuetify.breakpoint.width < 420"
    :scrollable="$vuetify.breakpoint.width < 420"
    max-width="450"
    :min-width="
      $vuetify.breakpoint.width > 420 ? 420 : $vuetify.breakpoint.width
    "
  >
    <v-card
      class="elevated-light"
      max-width="450"
      :min-width="
        $vuetify.breakpoint.width > 420 ? 420 : $vuetify.breakpoint.width
      "
      :tile="$vuetify.breakpoint.width < 420"
      :class="{ 'rounded-xl': $vuetify.breakpoint.width > 400 }"
    >
      <v-card-title
        style="font-size: 20px"
        class="d-flex align-center py-2 px-4"
      >
        <v-avatar size="40">
          <v-img :src="profileImage"></v-img>
        </v-avatar>
        <v-spacer></v-spacer>
        {{ repostId ? 'Quote' : 'New' }} Post
        <v-spacer></v-spacer>
        <v-btn icon @click="cancel"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <!-- <v-divider></v-divider> -->
      <v-card-text class="px-4 pb-0">
        <div>
          <CaptionField
            :key="componentKey"
            :value="caption"
            @caption-changed="captionChanged"
          />
        </div>
        <v-expand-transition>
          <div v-show="postMedia.length > 0">
            <MediaList :media="postMedia" />
          </div>
        </v-expand-transition>
        <v-expand-transition>
          <PostImageUpload
            v-show="addImage"
            :class="{ 'pb-2': addImage }"
            :post-id="postId"
            @image-saved="imageSaved"
            @cancel="addImage = false"
          />
        </v-expand-transition>
        <v-expand-transition>
          <v-layout v-show="!addImage">
            <v-flex xs4>
              <v-hover v-slot="{ hover }">
                <div
                  :style="{
                    backgroundColor:
                      hover && $vuetify.theme.dark
                        ? 'var(--primary-dark)'
                        : hover && !$vuetify.theme.dark
                        ? 'var(--primary-light)'
                        : '',
                  }"
                  role="button"
                  class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
                  @click="addImage = !addImage"
                >
                  <v-btn
                    icon
                    small
                    :class="
                      hover && $vuetify.theme.dark
                        ? 'bg-primary-dk'
                        : hover && !$vuetify.theme.dark
                        ? 'bg-primary-lt'
                        : ''
                    "
                    :color="hover ? 'primary' : ''"
                    @click.stop="addImage = !addImage"
                    ><v-icon>mdi-file-image-plus</v-icon></v-btn
                  >
                  <span
                    :class="{
                      'secondary--text': !$vuetify.theme.dark,
                      'white--text': $vuetify.theme.dark,
                    }"
                    >Add Image</span
                  >
                </div>
              </v-hover>
            </v-flex>
            <v-flex xs4>
              <v-hover v-slot="{ hover }">
                <div
                  :style="{
                    backgroundColor:
                      hover && $vuetify.theme.dark
                        ? 'var(--accent-dark)'
                        : hover && !$vuetify.theme.dark
                        ? 'var(--accent-light)'
                        : '',
                  }"
                  role="button"
                  class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
                  @click="addGif = !addGif"
                >
                  <v-btn
                    icon
                    small
                    :class="
                      hover && $vuetify.theme.dark
                        ? 'bg-accent-dk'
                        : hover && !$vuetify.theme.dark
                        ? 'bg-accent-lt'
                        : ''
                    "
                    :color="hover ? 'accent' : ''"
                    @click.stop="addGif = !addGif"
                    ><v-icon>mdi-file-gif-box</v-icon></v-btn
                  >
                  <span
                    :class="{
                      'secondary--text': !$vuetify.theme.dark,
                      'white--text': $vuetify.theme.dark,
                    }"
                    >Add Gif</span
                  >
                </div>
              </v-hover>
            </v-flex>
            <v-flex xs4>
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn icon class="mx-2"><v-icon>mdi-map-marker</v-icon></v-btn>
                <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-expand-transition>
        <v-expand-transition>
          <div v-show="!!postData?.repostId && !addImage">
            <RepostPreview v-if="postData?.repost" :post="postData.repost" />
          </div>
        </v-expand-transition>
      </v-card-text>
      <v-expand-transition>
        <v-card-actions v-show="!addImage">
          <v-hover v-slot="{ hover }">
            <v-btn
              block
              depressed
              rounded
              large
              :class="{
                'bg-gradient-right-primary-accent white--text':
                  !!canPublish && !loading && !hover,
                'elevated-light bg-gradient-right-primary-error white--text':
                  !!canPublish && !loading && hover,
              }"
              :disabled="!canPublish || loading"
              class="text-capitalize"
              @click="publish"
            >
              <v-icon right>mdi-post</v-icon>
              Post
              <v-icon left>mdi-send</v-icon>
            </v-btn>
          </v-hover>
        </v-card-actions>
      </v-expand-transition>
      <GifSelectModal
        :show="addGif"
        :post-id="postId"
        @saved="gifSaved"
        @show="($event) => (addGif = $event)"
      />
      <v-overlay :absolute="true" :value="loading" :opacity="0.2" color="white">
        <v-progress-circular
          indeterminate
          color="primary"
          size="48"
        ></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RepostPreview from '../blocks/posts/post-card-pieces/repost/RepostPreview.vue'
import CaptionField from '~/components/forms/posts/pieces/CaptionField.vue'
import PostImageUpload from '~/components/forms/posts/pieces/PostImageUpload.vue'
import MediaList from '~/components/forms/posts/pieces/MediaList.vue'
import GifSelectModal from '~/components/common/GifSelectModal.vue'
import {
  loadingMessage,
  // errorMessage,
  // successMessage
} from '~/utils/messaging'
export default {
  components: {
    PostImageUpload,
    CaptionField,
    GifSelectModal,
    MediaList,
    RepostPreview,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
    postSocket: {
      type: Object,
      required: true,
    },
    repostId: {
      type: String,
      required: false,
      default: '',
    },
    profileSocket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      addImage: false,
      addGif: false,
      caption: '',
      loading: false,
      postData: null,
      autoModerate: true,
      contentWarning: false,
      componentKey: 1,
    }
  },
  computed: {
    ...mapGetters({
      profileImage: 'user/profileImage',
    }),
    postMedia() {
      if (this.postData) {
        return this.postData.postMedia
      }
      return []
    },
    postId() {
      if (this.postData) {
        return this.postData.id
      }
      return ''
    },
    dialog: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('close', val)
      },
    },
    canPublish() {
      if (!this.postId) return false
      return this.postMedia.length > 0 || !!this.caption.trim()
    },
  },
  watch: {
    async show(newVal) {
      if (newVal) {
        console.log('Create new post')
        await this.createPost()
      }
    },
  },
  methods: {
    ...mapActions({
      showMessage: 'ui/showMessage',
      handleRequestSuccess: 'handleRequestSuccess',
      handleRequestError: 'handleRequestError',
    }),
    captionChanged(e) {
      console.log('Caption changed')
      this.caption = e
    },
    imageSaved(e) {
      console.log(e)
      if (!this.postData.postMedia) {
        this.postData.postMedia = []
      }
      this.postData.postMedia.push(e)
      this.addImage = false
    },
    gifSaved(e) {
      if (!this.postData.postMedia) {
        this.postData.postMedia = []
      }
      this.postData.postMedia.push(e)
      this.addGif = false
    },
    async cancel() {
      console.log('Cancel post creation')
      await this.deletePost()
    },
    async createPost() {
      if (this.loading) return
      try {
        this.loading = true
        const url = new URL(
          `${this.$store.getters.postPath}/posts/create${
            this.repostId ? '?repostId=' : ''
          }${this.repostId}`
        )
        const { data: result } = await this.$axios.get(url.href)
        if (result && result.success) {
          this.postData = result.data
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
    },
    async deletePost() {
      if (this.loading) return
      try {
        this.loading = true
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}/unpublished`
        )
        const result = await this.$axios.$delete(url.href)
        console.log({ result })
        if (result.success) {
          this.captionChanged('')
          this.postData = null
          this.autoModerate = true
          this.contentWarning = false
          this.addImage = false
          this.addGif = false
          this.componentKey++
        }
      } catch (error) {
        console.log({ error })
      } finally {
        this.$emit('close')
        this.loading = false
      }
    },
    async publish() {
      if (this.loading) return
      console.log('Publishing post')
      this.loading = true
      const message = loadingMessage({ text: 'Publishing Your Post...' })
      const uuid = await this.showMessage(message)
      try {
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}/publish`
        )
        const response = await this.$axios.$post(url.href, {
          caption: this.caption,
          autoModerate: this.autoModerate,
          contentWarning: this.contentWarning,
        })
        console.log({ response })
        if (response.success) {
          await this.handleRequestSuccess({ response, uuid })
          this.captionChanged('')
          this.postData = null
          this.autoModerate = true
          this.contentWarning = false
          this.addImage = false
          this.addGif = false
          this.$emit('close')
        }
      } catch (error) {
        console.log({ error })
        await this.handleRequestError({ error, uuid })
      } finally {
        this.loading = false
      }
      // const result = await this.publishPost({
      //   caption: this.caption,
      //   postId: this.postInCreation.id,
      // })
      // console.log({ result })
    },
  },
}
</script>

<style></style>
