<template>
  <div>
    <h1>Random Test page</h1>
    <p>{{ $store.state.ui.messages }}</p>
    <v-hover v-slot:default="{ hover }">
      <v-card
        flat
        :class="{ 'elevated-light': hover }"
        style="cursor: pointer; transition: all 0.3s ease"
      >
        Something
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  layout: 'test',
}
</script>

<style>
</style>