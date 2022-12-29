<template>
  <div class="profile-services">
    <OfferCardItem v-for="i in 5" :key="`${i}-a`" class="mb-4" />
  </div>
</template>

<script>
export default {
  // scrollToTop: true,
}
</script>

<style>
</style>