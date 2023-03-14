<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-btn small icon class="mx-2" :color="hover ? 'info' : ''">
        <v-icon size="24">mdi-share-variant-outline</v-icon>
      </v-btn>
    </v-hover>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
