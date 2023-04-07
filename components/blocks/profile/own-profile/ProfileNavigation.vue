<template>
  <v-card
    style="position: sticky; left: 20px; right: 60px; bottom: 5px; top: 80px"
    class="elevated-light rounded-xl mt-16"
  >
    <v-card-text class="py-1 py-3">
      <div v-for="(item, i) in routes" :key="i">
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
</template>

<script>
export default {
  props: ['routes'],
}
</script>

<style></style>
