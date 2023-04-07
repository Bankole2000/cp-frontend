<template>
  <v-card-text class="pt-0 d-flex align-start">
    <div style="flex: 1" class="flex-shrink">
      <v-img
        class="rounded-lg"
        :aspect-ratio="1.2"
        :src="post.postMedia[0].imageUrl"
      >
      </v-img>
    </div>
    <div style="flex: 4" class="flex-grow pl-4">
      <p class="caption mb-0" style="font-size: 14px">
        {{ post.caption }}
      </p>
    </div>
  </v-card-text>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>

<style></style>
