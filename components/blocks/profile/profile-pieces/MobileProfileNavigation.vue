<template>
  <v-card
    style="position: sticky; left: 20px; right: 60px; bottom: 5px; top: 80px"
    class="elevated-light rounded-xl mt-16"
  >
    <v-card-text class="py-1 py-3">
      <NavButton
        v-for="(route, i) in routes"
        :key="i"
        :title="route.title"
        :icon="route.icon"
        :to="route.to"
        :params="$route.params"
        :active-routes="route.activeRoutes"
        :badge-count="route.badgeCount"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['routes'],
}
</script>

<style></style>
