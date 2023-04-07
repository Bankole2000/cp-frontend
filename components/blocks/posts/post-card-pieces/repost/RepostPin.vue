<template>
  <div
    class="px-4 my-n2"
    style="width: 100%"
    @click.self="$emit('handle-click')"
  >
    <span v-if="username" class="caption font-weight-light text--secondary"
      ><v-hover v-slot="{ hover }">
        <nuxt-link
          class="text--secondary"
          :to="{
            name: 'profile-username',
            params: { username: `@${username}` },
          }"
        >
          <span
            :class="{ 'text-decoration-underline': hover }"
            style="cursor: pointer"
          >
            {{
              $store.getters['auth/user']?.username === username
                ? 'You'
                : `@${username}`
            }}
          </span>
        </nuxt-link>
      </v-hover>
      reposted</span
    >
    <span v-if="pinned" class="caption font-weight-light text--secondary"
      >&starf; pinned</span
    >
    <span v-else-if="likedBy" class="caption font-weight-light text--secondary"
      >&hearts; @{{ likedBy }} liked</span
    >
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: false,
      default: '',
    },
    pinned: {
      type: Boolean,
      required: false,
      default: false,
    },
    likedBy: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style></style>
