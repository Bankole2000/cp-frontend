<template>
  <div class="px-4 my-n2">
    <span v-if="username" class="caption font-weight-light text--secondary"
      >@{{ username }} reposted</span
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
  props: ['username', 'pinned', 'likedBy'],
}
</script>

<style></style>
