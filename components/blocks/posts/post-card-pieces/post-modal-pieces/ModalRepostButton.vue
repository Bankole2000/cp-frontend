<template>
  <v-hover v-slot="{ hover }">
    <div
      :style="{
        backgroundColor:
          hover && $vuetify.theme.dark
            ? 'var(--success-dark)'
            : hover && !$vuetify.theme.dark
            ? 'var(--success-light)'
            : '',
      }"
      role="button"
      class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
      @click="repost"
    >
      <v-btn
        icon
        small
        :loading="loading"
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-success-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-success-lt'
            : ''
        "
        :color="hover || repostedByUser ? 'success' : ''"
        @click.stop="repost"
      >
        <v-icon size="24">mdi-repeat-variant</v-icon>
      </v-btn>
      <span v-if="!!repostCount"> &bull; </span>
      <v-hover v-if="!!repostCount" v-slot="{ hover: spanHover }">
        <span
          class="font-weight-bold ml-1"
          :class="{
            'text-decoration-underline': spanHover,
            'secondary--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
          @click.stop="viewRepostedBy"
          >{{ repostCount | count }}</span
        >
      </v-hover>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    repostedByUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    repostCount: {
      type: Number,
      required: true,
      default: 0,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    viewRepostedBy() {
      console.log('View Who Reposted')
    },
    async repost() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'repost' },
          { root: true }
        )
        return
      }
      if (this.loading) return
      this.loading = true
      try {
        const url = new URL(
          `${this.$store.getters.postPath}/posts/${this.postId}/reposts`
        )
        let result
        if (this.repostedByUser) {
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
      console.log('Repost')
    },
  },
}
</script>

<style></style>
