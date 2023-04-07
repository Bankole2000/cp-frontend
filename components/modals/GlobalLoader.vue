<template>
  <v-dialog v-model="dialog" :overlay-opacity="0.9" persistent width="300">
    <v-card class="bg-gradient-right-primary" dark>
      <v-card-text class="pt-2">
        Loading...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog: {
      get() {
        return this.$store.getters['ui/showGlobalLoader']
      },
      set(val) {
        this.$store.commit('ui/showGlobalLoader', { show: val }, { root: true })
      },
    },
  },
}
</script>

<style></style>
