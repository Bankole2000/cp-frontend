<template>
  <v-app>
    <v-main :class="$vuetify.theme.dark ? 'bg-dark' : 'bg-light'">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('ui/setMessages', [])
  },
}
</script>
