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
      @click="showReplies"
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
        @click.stop="showReplies"
      >
        <v-icon size="20">mdi-subdirectory-arrow-right</v-icon>
      </v-btn>
      <v-hover v-slot="{ hover: spanHover }">
        <span
          :class="{
            'text-decoration-underline': spanHover,
          }"
          class="text--secondary caption"
          >Replies ({{ replyCount | count }})</span
        >
      </v-hover>
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
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    showReplies() {
      this.$emit('toggle-replies')
    },
  },
}
</script>

<style></style>
