<template>
  <v-hover v-slot="{ hover }">
    <div class="d-flex align-center justify-start" style="cursor: pointer">
      <v-btn
        icon
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-error-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-error-lt'
            : ''
        "
        class="mr-1"
        small
        :color="hover ? 'error' : ''"
      >
        <v-icon v-if="likedByUser" size="24">mdi-heart</v-icon>
        <v-icon v-else size="24">mdi-heart-outline</v-icon>
      </v-btn>
      <span class="font-weight-regular" :class="hover ? 'error--text' : ''">{{
        999999 | count
      }}</span>
    </div>
  </v-hover>
</template>

<script>
export default {
  data() {
    return {
      likedByUser: false,
    }
  },
}
</script>

<style></style>
