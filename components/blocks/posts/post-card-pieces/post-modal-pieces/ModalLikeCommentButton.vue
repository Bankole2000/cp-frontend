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
      @click="likeComment"
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
        @click.stop="likeComment"
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
    commentId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
      default: '',
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
    async likeComment() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'like' },
          { root: true }
        )
        return
      }
      if (this.loading) return
      try {
        this.loading = true
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}/comments/${this.commentId}/likes`
        )
        let result
        if (this.likedByUser) {
          result = await this.$axios.$delete(url.href)
        } else {
          result = await this.$axios.$post(url.href)
        }
        console.log({ result })
      } catch (error) {
        console.log({ error })
      } finally {
        this.loading = false
      }
      console.log('Like comment')
    },
  },
}
</script>

<style></style>
