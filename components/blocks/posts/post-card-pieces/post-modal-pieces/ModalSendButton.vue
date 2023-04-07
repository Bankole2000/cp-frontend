<template>
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
      @click="sendAsMessage"
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
        @click.stop="sendAsMessage"
      >
        <v-icon size="24">mdi-send-outline</v-icon>
      </v-btn>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  methods: {
    sendAsMessage() {
      if (!this.$store.getters['auth/user']) {
        this.$store.dispatch(
          'ui/showLoginModal',
          { action: 'send' },
          { root: true }
        )
        return
      }
      console.log('Send as message')
    },
  },
}
</script>

<style></style>
