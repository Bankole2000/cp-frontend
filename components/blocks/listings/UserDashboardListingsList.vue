<template>
  <div class="user-dashboard-listings-list">
    <!-- <h1>Listings List</h1> -->
    <div v-if="listings.length">
      <v-slide-y-transition group leave-absolute>
        <UserDashboardListingItem
          v-for="(listing, i) in listings"
          :key="listing.listingId"
          :listing="listing"
          :class="{ 'mt-8': i > 0 }"
        />
      </v-slide-y-transition>
    </div>
  </div>
</template>

<script>
import UserDashboardListingItem from './UserDashboardListingItem.vue'
export default {
  components: { UserDashboardListingItem },
  props: {
    listings: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
