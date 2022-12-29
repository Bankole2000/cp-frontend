<template>
  <div class="profile-listings">
    <ListingCardItem v-for="i in 5" :key="i" class="mb-4" />
  </div>
</template>

<script>
export default {
  // scrollToTop: true,
}
</script>

<style>
</style>