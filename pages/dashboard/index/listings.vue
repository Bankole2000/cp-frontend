<template>
  <div class="listings-page">
    <!-- <h1>Listings page</h1> -->
    <!-- <CreateListingForm /> -->
    <UserDashboardListings />
    <!-- <div style="height: 1000px"></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import userDashboardListingItem from '~/components/blocks/listings/userDashboardListingItem.vue'
import UserDashboardListings from '~/components/blocks/listings/UserDashboardListings.vue'
// import CreateListingForm from '~/components/forms/listings/CreateListingForm.vue'
export default {
  components: {
    UserDashboardListings,
    // CreateListingForm
  },
  data() {
    return {
      userListings: [],
      currentPage: 1,
      pages: 1,
      limit: 12,
      total: 0,
    }
  },
  computed: {
    ...mapGetters({
      listingPath: 'listingPath',
    }),
  },
  // async mounted() {
  //   console.log({ listingPath: this.listingPath })
  //   await this.getListings()
  // },
  methods: {
    async getListings(currentPage, limit) {
      try {
        const res = await this.$axios.$get(
          `${this.listingPath}/currentuser/listings/all?page=${currentPage}&limit=${limit}`
        )
        console.log({ res })
        const { data } = res
        const {
          total,
          pages,
          prev,
          next,
          page,
          listings,
          limit: newLimit,
        } = data
        this.total = total
        this.currentPage = page
        this.prev = prev
        this.next = next
        this.pages = pages
        this.userListings = listings
        this.limit = newLimit
      } catch (error) {
        console.log({ error })
      }
    },
  },
}
</script>

<style></style>
