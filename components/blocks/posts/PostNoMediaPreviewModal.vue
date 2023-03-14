<template>
  <v-dialog
    :value="dialog"
    persistent
    :fullscreen="$vuetify.breakpoint.xs"
    transition="dialog-bottom-transition"
    scrollable
    content-class="rounded-xl"
    :width="$vuetify.breakpoint.xs ? '100vw' : '40vw'"
    :min-height="$vuetify.breakpoint.xs ? '100vh' : '80vh'"
  >
    <v-card
      class="rounded-xl"
      :min-height="$vuetify.breakpoint.xs ? '100vh' : '90vh'"
    >
      <v-card-title class="elevated-light">Select Country</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px"> Post Content here </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
        <v-btn color="blue darken-1" text @click="close">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close')
    },
  },
}
</script>

<style></style>
