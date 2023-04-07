<template>
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
      @click="addComment"
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
        @click.stop="addComment"
      >
        <v-icon size="24">mdi-chat-outline</v-icon>
      </v-btn>
      <span v-if="!!commentCount"> &bull; </span>
      <v-hover v-if="!!commentCount" v-slot="{ hover: spanHover }">
        <span
          :class="{
            'text-decoration-underline': spanHover,
            'secondary--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
          class="font-weight-bold ml-1"
          >{{ commentCount | count }}</span
        >
      </v-hover>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    commentCount: {
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
    addComment() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'comment' },
          { root: true }
        )
        return
      }
      this.$emit('add-comment-intent')
      console.log('Add Comment')
    },
  },
}
</script>

<style></style>
