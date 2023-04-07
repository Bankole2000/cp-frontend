<template>
  <v-hover v-slot="{ hover }">
    <div
      :style="{
        backgroundColor:
          hover && $vuetify.theme.dark
            ? 'var(--warning-dark)'
            : hover && !$vuetify.theme.dark
            ? 'var(--warning-light)'
            : '',
      }"
      role="button"
      class="d-flex align-center justify-center rounded-lg ma-1 pa-1"
      @click="addToBookmarks"
    >
      <v-btn
        icon
        small
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-warning-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-warning-lt'
            : ''
        "
        :color="hover ? 'warning' : ''"
        @click.stop="addToBookmarks"
      >
        <v-icon size="24">mdi-bookmark-outline</v-icon>
      </v-btn>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    savedByUser: {
      type: Boolean,
      required: true,
      default: false,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  methods: {
    addToBookmarks() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'bookmark' },
          { root: true }
        )
        return
      }
      console.log('Add to bookmarks')
    },
  },
}
</script>

<style></style>
