<template>
  <div class="index">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="7" xl="8">
          <v-row>
            <v-col v-for="i in 6" :key="`${i}-b`" cols="12" xl="6">
              <PostCardItem class="mb-4" />
            </v-col>
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
              <v-card-text class="pb-0 pt-2">Trending Tags</v-card-text>
              <v-card-text class="pt-0 pb-2">
                <v-chip-group column>
                  <v-chip
                    v-for="tag in tags"
                    :key="tag"
                    :color="randomColor()"
                    small
                    label
                    close
                  >
                    #{{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
            <!-- <v-card class="elevated-light rounded-xl mb-4">
              <v-card-title>Trending</v-card-title>
            </v-card> -->
            <SuggestedProfilesCard />
            <div>
              <v-card-text class="pt-0 pb-1">
                Terms of Service &middot; Privacy Policy &middot; Cookie Policy
              </v-card-text>
              <v-card-text class="pt-0 pb-1">
                Accessibility &middot; Ads Info &middot; About &middot; Support
              </v-card-text>
              <v-card-text class="pt-0 pb-1">
                For Businesses &middot; For Developers &middot; Suggestions
              </v-card-text>
              <v-card-text class="pt-0 pb-1">
                &copy; 2021, AppName, Inc.
              </v-card-text>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  data() {
    return {
      tags: [
        'Work',
        'Food',
        'Art',
        'Tech',
        'sports',
        'Drawers',
        'Shopping',
        'Home Improvement',
        // 'Vacation',
        // 'Canary',
        // 'Postgraduate',
        // 'Anadromous',
        // 'Heehaw',
        // 'Inceptive',
        // 'Circumlocution',
        // 'Creative Writing',
      ],
    }
  },
  mounted() {
    console.log({ breakpoint: this.$vuetify.breakpoint })
  },
  methods: {
    scrollToTop() {
      this.$vuetify.goTo(0)
    },
    randColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    randomColor() {
      const colors = ['primary', 'secondary', 'info', 'warning']
      return colors[Math.floor(Math.random() * colors.length)]
    },
  },
}
</script>

<style>
</style>