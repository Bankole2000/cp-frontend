<template>
  <v-hover v-slot="{ hover }">
    <div
      class="d-flex align-center justify-start"
      style="cursor: pointer"
      @click="likePost"
      @dblclick="() => {}"
    >
      <v-btn
        :loading="loading"
        :disabled="loading"
        icon
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-error-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-error-lt'
            : ''
        "
        class="mr-1"
        small
        :color="hover || likedByUser ? 'error' : ''"
      >
        <v-icon v-if="likedByUser" size="24">mdi-heart</v-icon>
        <v-icon v-else size="24">mdi-heart-outline</v-icon>
      </v-btn>
      <span
        v-if="!!likesCount"
        class="font-weight-regular"
        :class="hover || likedByUser ? 'error--text' : ''"
        >{{ likesCount | count }}</span
      >
    </div>
  </v-hover>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    likesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    likedByUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    postId: {
      type: String,
      required: true,
    },
    showLikesCount: {
      type: Boolean,
      required: false,
      default: true,
    },
    socketsReady: {
      type: Boolean,
      default: false,
    },
    postSocket: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      showLoginModal: 'ui/showLoginModal',
    }),
    async likePost() {
      if (!this.$store.getters['auth/user']) {
        this.showLoginModal({ action: 'like' })
        return
      }
      console.log('like Post', this.postId)

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
    },
  },
}
</script>

<style></style>
