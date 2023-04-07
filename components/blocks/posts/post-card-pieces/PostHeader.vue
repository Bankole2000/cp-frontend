<template>
  <v-list-item class="px-2">
    <v-list-item-avatar class="mx-2" size="40" color="grey">
      <v-img
        :src="`${$store.getters.profilePath}/u/image/${post.createdByData.username}?thumb=200x200`"
      ></v-img
    ></v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-subtitle @click.self="$emit('handle-click')">
        <nuxt-link
          :to="{
            name: 'profile-username',
            params: { username: `@${post.createdByData.username}` },
          }"
        >
          <span
            class="font-weight-bold"
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >{{ post.createdByData.displayname }}</span
          >
        </nuxt-link>
        <span
          class="text--secondary font-weight-regular"
          @click.self="$emit('handle-click')"
        >
          &bull; {{ $moment(post.created).fromNow() }}</span
        >
      </v-list-item-subtitle>
      <v-list-item-subtitle
        class="font-weight-regular"
        @click.self="$emit('handle-click')"
      >
        <nuxt-link
          :to="{
            name: 'profile-username',
            params: { username: `@${post.createdByData.username}` },
          }"
        >
          <span
            style="cursor: pointer"
            :class="{
              'secondary--text': !$vuetify.theme.dark,
              'white--text': $vuetify.theme.dark,
            }"
            >@{{ post.createdByData.username }}</span
          >
        </nuxt-link>
        <span class="caption">&bull; Sponsored</span>
        <span class="caption">&bull; Location</span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action class="ma-0">
      <HeaderMenu :post="post" />
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue'
export default {
  components: {
    HeaderMenu,
  },
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
