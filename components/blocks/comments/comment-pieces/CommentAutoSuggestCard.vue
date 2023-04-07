<template>
  <v-card :loading="loading">
    <v-list>
      <v-skeleton-loader
        :loading="loading"
        :boilerplate="false"
        type="list-item-avatar-two-line"
      ></v-skeleton-loader>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    query: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
    profileSocket: {
      type: Object,
      default: () => {},
    },
    postSocket: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: true,
      profiles: [],
      limit: 6,
    }
  },
}
</script>

<style></style>
