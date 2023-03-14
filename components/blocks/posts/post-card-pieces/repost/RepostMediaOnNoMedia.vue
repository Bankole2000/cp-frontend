<template>
  <v-card-text class="pa-0 rounded-xl">
    <v-img
      class="rounded-b-xl"
      :aspect-ratio="1.2"
      :src="post ? post.postMedia[0].imageUrl : ''"
    ></v-img>
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
}
</script>

<style></style>
