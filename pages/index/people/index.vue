<template>
  <div class="index">
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" xl="8">
          <v-row>
            <v-col v-for="i in listLength" :key="`${i}-b`" cols="12" xl="6">
              <OfferCardItem
                :id="`${i}-b`"
                :index="i"
                :total="listLength"
                class="mb-4"
                @fetch-more="fetchMore"
              />
            </v-col>
            <v-col cols="12">
              <v-scroll-y-transition>
                <div v-show="loading">
                  <div class="d-flex justify-center">
                    <v-progress-circular indeterminate></v-progress-circular>
                  </div>
                </div>
              </v-scroll-y-transition>
            </v-col>
            <!-- <v-col cols="12">
              <div style="height: 1000px"></div>
            </v-col> -->
          </v-row>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.smAndUp" cols="5" xl="4">
          <div
            style="
              position: sticky;
              left: 20px;
              right: 60px;
              bottom: 5px;
              top: 80px;
            "
          >
            <v-card class="elevated-light rounded-xl mb-4">
              <v-card-title>
                <div class="d-flex align-center">
                  <CountrySelectButton />
                  <v-textarea
                    placeholder="Search By City or State"
                    rows="1"
                    prepend-inner-icon="mdi-magnify"
                    auto-grow
                    hide-details
                    filled
                    dense
                    rounded
                    single-line
                  ></v-textarea>
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>Card Text</v-card-text>
            </v-card>
            <v-card class="elevated-light rounded-xl mb-4">
              <v-card-title>Trending</v-card-title>
            </v-card>
            <SuggestedProfilesCard />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLength: 2,
      loading: false,
    }
  },
  methods: {
    fetchMore() {
      this.loading = true
      setTimeout(() => {
        this.listLength += 6
        this.loading = false
      }, 3000)
    },
  },
}
</script>

<style>
</style>