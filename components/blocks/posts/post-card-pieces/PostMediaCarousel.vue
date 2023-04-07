<template>
  <v-carousel
    :continuous="false"
    :cycle="false"
    :show-arrows="true"
    hide-delimiter-background
    :hide-delimiters="media.length < 2"
    height="auto"
    @change="mediaChanged"
  >
    <v-carousel-item v-for="(m, i) in media" :key="i">
      <v-img
        v-if="m.type === 'IMAGE' || m.type === 'GIF'"
        :src="m.imageUrl"
        :aspect-ratio="1.2"
        cover
        @click="$emit('image-clicked')"
      >
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              size="64"
              color="primary lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: ['media'],
  data() {
    return {}
  },
  methods: {
    mediaChanged(e) {
      console.log({ e })
      this.$emit('media-changed', e)
    },
  },
}
</script>

<style></style>
