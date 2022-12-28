<template>
  <div>Dashboard Page</div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['checkAuth', 'requireUser'],
}
</script>

<style>
</style>