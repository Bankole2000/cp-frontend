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
      @click="share"
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
        @click.stop="share"
      >
        <v-icon size="24">mdi-share-variant-outline</v-icon>
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
    share() {
      console.log('Share listing')
      const url = 'https://google.com'
      if (navigator.share) {
        navigator
          .share({
            title: 'Sharing Something',
            url,
          })
          .then(() => console.log('Thanks for sharing'))
      }
    },
  },
}
</script>

<style></style>
