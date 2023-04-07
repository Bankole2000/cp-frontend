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
      @click="addComment"
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
        @click.stop="addComment"
      >
        <v-icon size="24">mdi-reply</v-icon>
      </v-btn>
      <!-- <span v-if="!!replyCount"> &bull; </span>
      <v-hover v-if="!!replyCount" v-slot="{ hover: spanHover }">
        <span
          :class="{
            'text-decoration-underline': spanHover,
            'secondary--text': !$vuetify.theme.dark,
            'white--text': $vuetify.theme.dark,
          }"
          class="font-weight-bold ml-1"
          >{{ replyCount | count }}</span
        >
      </v-hover> -->
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    replyCount: {
      type: Number,
      required: true,
      default: 0,
    },
    commentId: {
      type: String,
      required: true,
    },
  },
  methods: {
    addComment() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'reply' },
          { root: true }
        )
        return
      }
      console.log('Add Comment')
    },
  },
}
</script>

<style></style>
