<template>
  <v-hover v-slot="{ hover }">
    <!-- rounded="lg"
    flat -->
    <div
      :style="{
        backgroundColor:
          hover && $vuetify.theme.dark
            ? 'var(--error-dark)'
            : hover && !$vuetify.theme.dark
            ? 'var(--error-light)'
            : '',
      }"
      role="button"
      class="d-flex align-center justify-center ma-1 pa-1 rounded-lg"
      @click="likePost"
    >
      <v-btn
        icon
        small
        :loading="loading"
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-error-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-error-lt'
            : ''
        "
        :color="hover || likedByUser ? 'error' : ''"
        @click.stop="likePost"
      >
        <v-icon v-if="likedByUser" size="24">mdi-heart</v-icon>
        <v-icon v-else size="24">mdi-heart-outline</v-icon>
      </v-btn>
      <span v-if="!!likeCount"> &bull; </span>
      <v-hover v-if="!!likeCount" v-slot="{ hover: spanHover }">
        <span
          class="font-weight-bold secondary--text ml-1"
          :class="{
            'text-decoration-underline': spanHover,
            'secondary--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
          @click.stop="viewLikedBy"
          >{{ likeCount | count }}</span
        >
      </v-hover>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    likedByUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0,
    },
    postId: {
      type: String,
      required: true,
    },
    socketsReady: {
      type: Boolean,
      required: true,
      default: false,
    },
    postSocket: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    viewLikedBy() {
      console.log('View Liked By')
    },
    async likePost() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'like' },
          { root: true }
        )
        return
      }
      if (this.loading) return
      this.loading = true
      const url = new URL(
        `${this.$store.getters.postPath}/posts/${this.postId}/likes`
      )
      if (this.likedByUser) {
        if (this.socketsReady) {
          this.postSocket.emit('POST_UNLIKED', {
            userId: this.$store.getters['auth/user']?.userId,
            postId: this.postId,
          })
          this.loading = false
          return
        }
        try {
          const result = await this.$axios.$delete(url.href)
          console.log({ result })
        } catch (error) {
          console.log({ error })
        } finally {
          this.loading = false
        }
      } else {
        if (this.socketsReady) {
          this.postSocket.emit('POST_LIKED', {
            userId: this.$store.getters['auth/user']?.userId,
            postId: this.postId,
          })
          this.loading = false
          return
        }
        try {
          const result = await this.$axios.$post(url.href)
          console.log({ result })
        } catch (error) {
          console.log({ error })
        } finally {
          this.loading = false
        }
      }
      console.log('Like post')
    },
  },
}
</script>

<style></style>
