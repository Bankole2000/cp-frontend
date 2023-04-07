<template>
  <v-hover v-slot="{ hover }">
    <div
      :style="{
        backgroundColor:
          hover && $vuetify.theme.dark
            ? 'var(--info-dark)'
            : hover && !$vuetify.theme.dark
            ? 'var(--info-light)'
            : '',
      }"
      role="button"
      class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
      @click="quotePost"
    >
      <v-btn
        icon
        small
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-info-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-info-lt'
            : ''
        "
        :color="hover ? 'info' : ''"
        @click.stop="quotePost"
      >
        <v-icon size="24">mdi-comment-quote-outline</v-icon>
      </v-btn>
      <span v-if="!!quoteRepostCount"> &bull; </span>
      <v-hover v-if="!!quoteRepostCount" v-slot="{ hover: spanHover }">
        <span
          class="font-weight-bold secondary--text ml-1"
          :class="{
            'text-decoration-underline': spanHover,
            'secondary--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
          @click.stop="viewQuoteReposts"
          >{{ quoteRepostCount | count }}</span
        >
      </v-hover>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    quoteRepostCount: {
      type: Number,
      required: true,
      default: 0,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  methods: {
    viewQuoteReposts() {
      console.log('View Quote Reposts')
      this.$emit('view-quote-posts')
    },
    quotePost() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'quoteRepost' },
          { root: true }
        )
        return
      }
      console.log('Quote post')
      this.$emit('show-quote-post-modal')
    },
  },
}
</script>

<style></style>
