<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-btn
        small
        icon
        class="mx-2"
        :color="hover ? 'warning' : ''"
        @click="addToBookmarks"
      >
        <v-icon size="24">mdi-bookmark-outline</v-icon>
      </v-btn>
    </v-hover>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({
      showLoginModal: 'ui/showLoginModal',
    }),
    addToBookmarks() {
      if (!this.$store.getters['auth/user']) {
        this.showLoginModal({ action: 'bookmark' })
        return
      }
      console.log('Add to bookmarks')
    },
  },
}
</script>

<style></style>
