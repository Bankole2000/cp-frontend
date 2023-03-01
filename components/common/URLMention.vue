<template>
  <a :href="url" target="_blank">
    <span role="button" style="color: var(--primary); word-break: keep-all"
      >{{ url.replace(/(^\w+:|^)\/\//, '') }}
    </span>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
