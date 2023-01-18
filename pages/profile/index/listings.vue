<template>
  <div class="profile-listings">
    <v-row>
      <v-col v-for="i in 6" :key="`${i}-b`" cols="12" xl="6">
        <ListingCardItem class="mb-4" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  // scrollToTop: true,
}
</script>

<style>
</style>