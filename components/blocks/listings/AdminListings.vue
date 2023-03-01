<template>
  <div class="user-dashboard-listings mt-15">
    <v-row>
      <v-col cols="12">
        <div class="mb-4">
          <v-btn class="mr-4">
            <v-icon left>mdi-plus</v-icon>
            Create
          </v-btn>
          <v-btn depressed @click="showSearchSection = !showSearchSection">
            <v-icon left>mdi-magnify</v-icon>
            Search
            <v-icon right
              >mdi-chevron-{{ showSearchSection ? 'up' : 'down' }}</v-icon
            >
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-expand-transition leave-absolute>
      <div v-show="showSearchSection">
        <div class="mb-4">
          <p class="mb-1 pl-2 text--secondary caption">Search Parameters</p>
          <v-divider></v-divider>
        </div>
        <v-row align="center">
          <v-col cols="12">
            <v-row align="center">
              <v-col cols="6" sm="3" class="py-1">
                <v-select
                  v-model="search.type"
                  :items="settings.listingTypes"
                  label="Listing Type"
                  placeholder="Listing Type"
                  clearable
                  hide-details
                  item-text="title"
                  item-value="listingType"
                  dense
                  solo
                ></v-select>
              </v-col>
              <v-col cols="6" sm="3" class="py-1">
                <v-select
                  v-model="search.purpose"
                  :items="settings.listingPurposes"
                  clearable
                  hide-details
                  label="Listing Purposes"
                  placeholder="Listing Purposes"
                  item-text="title"
                  item-value="listingPurpose"
                  dense
                  solo
                ></v-select>
              </v-col>
              <v-col cols="6" sm="3" class="py-1">
                <div class="d-flex align-center">
                  <v-select
                    v-model="search.subgroup"
                    :items="purposeSubgroups"
                    clearable
                    hide-details
                    label="Subgroups"
                    placeholder="Subgroups"
                    item-text="title"
                    item-value="purposeSubgroup"
                    dense
                    solo
                  ></v-select>
                </div>
              </v-col>
              <v-col cols="6" sm="3" class="py-1">
                <v-btn
                  class="text-capitalize"
                  depressed
                  :color="showMoreFilters ? 'primary' : ''"
                  @click="showMoreFilters = !showMoreFilters"
                >
                  <v-icon left>mdi-filter-variant</v-icon>
                  {{ !showMoreFilters ? 'Show' : 'Hide' }} Filters
                  <v-icon right
                    >mdi-chevron-double-{{
                      !showMoreFilters ? 'down' : 'up'
                    }}</v-icon
                  >
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-expand-transition leave-absolute>
                  <div v-show="showMoreFilters">
                    <v-row>
                      <v-col cols="12" sm="6">
                        <div class="caption text--secondary pl-2">
                          Filter by Amenities
                        </div>
                        <!-- <v-divider></v-divider> -->
                        <v-chip-group
                          v-model="search.amenities"
                          column
                          multiple
                        >
                          <v-chip
                            v-for="amenity in settings.amenities"
                            :key="amenity.amenity"
                            :value="amenity.amenity"
                            active-class="bg-gradient-right-primary-accent white--text"
                            filter
                            outlined
                          >
                            <v-icon left>mdi-{{ amenity.mdiIcon }}</v-icon>
                            {{ amenity.title }}</v-chip
                          >
                        </v-chip-group>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <div class="caption text--secondary pl-2">
                          Filter by House Rules
                        </div>
                        <!-- <v-divider></v-divider> -->
                        <v-chip-group
                          v-model="search.houseRules"
                          column
                          multiple
                        >
                          <v-chip
                            v-for="houseRule in settings.houseRules"
                            :key="houseRule.houseRule"
                            :value="houseRule.houseRule"
                            active-class="bg-gradient-right-primary-accent white--text"
                            filter
                            outlined
                          >
                            <v-icon left
                              >mdi-{{ houseRule.mdiIconTrue }}</v-icon
                            >
                            {{ houseRule.title }}</v-chip
                          >
                        </v-chip-group>
                      </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
              </v-col>
            </v-row>
            <v-divider class="mb-4"></v-divider>
          </v-col>
        </v-row>
      </div>
    </v-expand-transition>
    <v-row align="center">
      <v-col cols="12">
        <UserDashboardListingsList :listings="userListings" />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="4" class="py-1 mt-2">
        <div class="d-flex align-center justify-start">
          <p class="mb-0 mr-8 grow">
            Showing {{ (currentPage - 1) * limit + 1 }} to
            {{ limit > total ? total : limit * currentPage }} of
            {{ total }}
          </p>
          <v-select
            v-model="limit"
            class="shrink"
            hide-details
            solo
            dense
            :items="[5, 10, 20]"
            @change="limitChanged"
          ></v-select>
          <p class="mb-0 ml-4 grow">
            {{ $vuetify.breakpoint.smAndUp ? 'Items' : '' }} Per Page
          </p>
        </div>
      </v-col>
      <v-col cols="2" class="py-1 mt-2"></v-col>
      <v-col cols="12" sm="6" class="py-1 mt-2">
        <div
          class="d-flex"
          :class="
            $vuetify.breakpoint.smAndUp ? 'justify-end' : 'justify-center'
          "
        >
          <v-pagination
            v-model="currentPage"
            :length="pages"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :total-visible="7"
            @next="pageNext"
            @previous="pagePrevious"
            @input="pageInput"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserDashboardListingsList from './UserDashboardListingsList.vue'
export default {
  components: { UserDashboardListingsList },
  data() {
    return {
      userListings: [],
      currentPage: 2,
      pages: 2,
      limit: 5,
      total: 0,
      showSearchSection: false,
      showMoreFilters: false,
      search: {
        purpose: null,
        type: null,
        subgroup: null,
        amenities: [],
        houseRules: [],
      },
      settings: {},
    }
  },
  computed: {
    ...mapGetters({
      listingPath: 'listingPath',
    }),
    purposeSubgroups() {
      if (!this.search.purpose) {
        return this.settings.subgroups
      }
      if (this.search.purpose && this.settings.subgroups) {
        return this.settings.subgroups.filter(
          (x) => x.listingPurpose === this.search.purpose
        )
      }
      if (!this.settings.subgroups) {
        return []
      }
      return []
    },
  },
  async mounted() {
    console.log({ listingPath: this.listingPath })
    await this.getListingSettings()
    await this.getListings()
  },
  methods: {
    async getListings(currentPage = 1, limit = 5) {
      try {
        const { data } = await this.$axios.$get(
          `${this.listingPath}/admin/listings?page=${currentPage}&limit=${limit}`
        )
        console.log({ data })
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
    async getListingSettings() {
      try {
        const { data } = await this.$axios.$get(`${this.listingPath}/settings/`)
        console.log({ data })
        this.settings = data
      } catch (error) {
        console.log({ error })
      }
    },
    async limitChanged(e) {
      console.log({ e })
      await this.getListings(1, e)
    },
    async pageInput(e) {
      console.log({ event: 'Page Select', e })
      await this.getListings(e, this.limit)
    },
    async pagePrevious(e) {
      console.log({ event: 'Previous', e, currentPage: this.currentPage })
      await this.getListings(this.currentPage, this.limit)
    },
    async pageNext(e) {
      console.log({ event: 'Next', e, currentPage: this.currentPage })
      await this.getListings(this.currentPage, this.limit)
    },
  },
}
</script>

<style></style>
