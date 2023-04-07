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
      >
        <v-icon size="24">mdi-poll</v-icon>
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
}
</script>

<style></style>
