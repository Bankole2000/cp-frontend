<template>
  <v-card flat class="transparent">
    <div style="width: 100%">
      <v-card class="elevated-light rounded-xl">
        <v-card-text class="py-2 py-3">
          <div v-for="(item, i) in mainRoutes" :key="i">
            <NavButton
              :title="item.title"
              :icon="item.icon"
              :to="item.to"
              :active-routes="item.activeRoutes"
              :badge-count="item.badgeCount"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
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
}
</script>

<style>
</style>