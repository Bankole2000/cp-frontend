<template>
  <v-card-title class="px-2 py-0">
    <v-list-item class="px-0">
      <v-list-item-avatar class="mx-2" size="30" color="grey">
        <v-img
          :src="`${$store.getters.profilePath}/u/image/${post.createdByData.username}?thumb=200x200`"
        ></v-img
      ></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle class="caption mb-n1">
          <span
            class="font-weight-bold"
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >{{ post.createdByData.displayname }}</span
          >
          <span class="text--secondary font-weight-regular">
            &bull; {{ $moment(post.created).fromNow() }}</span
          >
        </v-list-item-subtitle>
        <v-list-item-subtitle
          class="font-weight-regular caption"
          style="margin-top: 2px"
        >
          <span
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >@{{ post.createdByData.username }}</span
          >
          <span class="caption">&bull; Sponsored</span>
          <span class="caption">&bull; Location</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card-title>
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
