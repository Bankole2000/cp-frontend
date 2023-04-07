<template>
  <v-card-text class="pa-0 rounded-xl">
    <v-carousel
      v-model="activeMedia"
      :continuous="false"
      :cycle="false"
      :show-arrows="true"
      hide-delimiter-background
      hide-delimiters
      height="auto"
    >
      <v-carousel-item v-for="(m, i) in postMedia" :key="i">
        <v-img
          class="rounded-b-xl"
          :aspect-ratio="1.2"
          :contain="m.type === 'GIF'"
          :src="m.imageUrl"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                size="64"
                :color="
                  $vuetify.theme.dark ? 'grey lighten-5' : 'primary lighten-2'
                "
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-card-text>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      requied: true,
      default: () => {},
    },
  },
  computed: {
    postMedia() {
      if (this.post) {
        return this.post.postMedia
      }
      return []
    },
  },
}
</script>

<style></style>
