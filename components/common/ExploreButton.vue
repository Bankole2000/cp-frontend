<template>
  <div class="ml-4 mr-8">
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        class="py-3 mb-4 d-flex pl-6"
        :to="{ name: 'index' }"
        nuxt
        :class="{
          'elevated-light bg-gradient-right-primary-accent white--text':
            hover || isActive,
        }"
        style="border-radius: 20px; cursor: pointer; transition: all 0.3s ease"
        :style="{
          backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
        }"
        v-bind="attrs"
        v-on="on"
      >
        <div class="d-flex align-center">
          <v-icon :color="hover || isActive ? 'white' : ''" left
            >mdi-compass-rose</v-icon
          >
          <p class="mb-0">Explore</p>
        </div>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: 'CreateButton',
  props: {
    // props
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    isActive() {
      const activeRoutes = [
        'index',
        'index-listings',
        'index-people',
        'index-services',
      ]
      return activeRoutes.includes(this.$route.name)
    },
  },
  methods: {
    // methods
  },
}
</script>

<style>
</style>