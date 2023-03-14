<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-btn small icon class="mx-2" :color="hover ? 'warning' : ''">
        <v-icon size="24">mdi-bookmark-outline</v-icon>
      </v-btn>
    </v-hover>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
