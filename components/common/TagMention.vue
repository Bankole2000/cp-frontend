<template>
  <nuxt-link :to="{ name: 'index' }">
    <span
      role="button"
      class="font-weight-bold"
      style="color: var(--primary); word-break: keep-all"
      >#{{ tag }}
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
