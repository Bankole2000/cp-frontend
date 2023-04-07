<template>
  <v-hover v-slot="{ hover }">
    <div
      class="d-flex align-center justify-start"
      style="cursor: pointer"
      @click="addComment"
    >
      <v-btn
        icon
        class="mr-1"
        small
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-primary-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-primary-lt'
            : ''
        "
        :color="hover ? 'primary' : ''"
      >
        <v-icon size="24">mdi-chat-outline</v-icon>
      </v-btn>
      <span
        v-if="!!commentCount"
        class="font-weight-regular"
        :class="hover ? 'primary--text' : ''"
        >{{ commentCount | count }}</span
      >
    </div>
  </v-hover>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    commentCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  methods: {
    ...mapActions({
      showLoginModal: 'ui/showLoginModal',
    }),
    addComment() {
      this.$emit('show-comments')
    },
  },
}
</script>

<style></style>
