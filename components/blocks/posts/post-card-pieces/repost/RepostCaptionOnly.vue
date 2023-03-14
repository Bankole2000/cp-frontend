<template>
  <v-card-text class="pt-0">
    <p class="caption mb-0">
      {{ post.caption }}
    </p>
  </v-card-text>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
