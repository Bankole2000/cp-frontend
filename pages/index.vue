<template>
  <div>
    <div>
      <!-- Important updates / Messages -->
      <v-container :fluid="$vuetify.breakpoint.mdOnly">
        <!-- Maybe Some ads - Sponsored profiles / listings / posts -->
        <v-row>
          <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="3" xl="2">
            <div
              style="
                position: sticky;
                left: 20px;
                right: 60px;
                bottom: 5px;
                top: 80px;
              "
            >
              <ExploreNavigation />
              <!-- Ad / Sponsored Content area -->
            </div>
          </v-col>
          <v-col cols="12" md="9" xl="10">
            <nuxt-child />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ExploreNavigation from '~/components/blocks/ExploreNavigation.vue'
export default {
  name: 'IndexPage',
  components: { ExploreNavigation },
  layout: 'admin',
  scrollToTop: true,
  data() {
    return {
      mainRoutes: [
        {
          title: 'Community',
          icon: 'mdi-account-group-outline',
          to: 'index',
          activeRoutes: ['index'],
          badgeCount: 0,
        },
        {
          title: 'Listings',
          icon: 'mdi-home-city-outline',
          to: 'index-listings',
          activeRoutes: ['index-listings'],
          badgeCount: 6,
        },
        {
          title: 'Personal Ads',
          icon: 'mdi-bullhorn-outline',
          to: 'index-people',
          activeRoutes: ['index-people'],
          badgeCount: 0,
        },
        {
          title: 'Services',
          icon: 'mdi-account-hard-hat-outline',
          to: 'index-services',
          activeRoutes: ['index-services'],
          badgeCount: 0,
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('ui/setMessages', [])
  },
  methods: {},
}
</script>
