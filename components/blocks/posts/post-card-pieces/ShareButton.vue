<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-btn
        small
        icon
        class="mx-2"
        :color="hover ? 'info' : ''"
        @click="share"
      >
        <v-icon size="24">mdi-share-variant-outline</v-icon>
      </v-btn>
    </v-hover>
  </div>
</template>

<script>
export default {
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
