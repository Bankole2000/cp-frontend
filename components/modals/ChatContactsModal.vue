<template>
  <v-dialog
    v-model="dialog"
    persistent
    hide-overlay
    :width="$vuetify.breakpoint.smAndDown ? '100vw' : '30vw'"
    style="min-height: 100vh"
    tile
  >
    <!-- :fullscreen="$vuetify.breakpoint.smAndDown" -->
    <div class="d-flex align-start justify-end" height="100vh">
      <v-card
        style="pointer-events: auto"
        tile
        height="100vh"
        :width="$vuetify.breakpoint.smAndDown ? '100vw' : '30vw'"
      >
        <v-card-title class="headline"
          >Use Google's location service?</v-card-title
        >
        <v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Disagree</v-btn
          >
          <v-btn color="green darken-1" text @click="dialog = false"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>

<style scoped>
.v-dialog .v-dialog--active .v-dialog--persistent {
  min-height: 100vh;
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 100%;
}
</style>