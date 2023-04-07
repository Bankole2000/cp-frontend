<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card
        flat
        class="py-3 mb-4 d-flex pl-6 align-center"
        :to="{ name: to, params }"
        nuxt
        :class="{
          'elevated-light bg-gradient-right-primary-accent white--text':
            hover || isActive,
        }"
        style="border-radius: 20px; cursor: pointer; transition: all 0.3s ease"
        :style="{
          backgroundColor: $vuetify.theme.dark ? '#121212' : '#f0efef',
        }"
        @click="$emit('click')"
      >
        <div class="d-flex align-center">
          <v-icon :color="hover || isActive ? 'white' : ''" left>{{
            icon
          }}</v-icon>
          <p class="mb-0">{{ title }}</p>
        </div>
        <v-spacer></v-spacer>
        <v-chip
          v-if="badgeCount > 0"
          :class="{ 'elevated-light': hover }"
          small
          class="mr-4 px-2"
          color="error darken-1"
        >
          {{ badgeCount | count }}
        </v-chip>

        <!-- <v-icon color="warning lighten-2" class="mr-4">mdi-new-box</v-icon> -->
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: 'CreateButton',
  props: {
    title: {
      type: String,
      default: 'Explore',
    },
    icon: {
      type: String,
      default: 'mdi-compass-rose',
    },
    to: {
      type: String,
      default: 'index',
    },
    activeRoutes: {
      type: Array,
      default: () => [
        'index',
        'index-listings',
        'index-people',
        'index-services',
      ],
    },
    badgeCount: {
      type: Number,
      default: 0,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    isActive() {
      return this.activeRoutes.includes(this.$route.name)
    },
  },
  methods: {
    // methods
  },
}
</script>

<style></style>
