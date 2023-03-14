<template>
  <div class="d-flex pb-4 mt-n8 justify-end">
    <v-btn
      icon
      outlined
      :color="$vuetify.theme.dark ? 'white black--text' : 'secondary'"
      class="mr-2"
      ><v-icon>mdi-dots-horizontal</v-icon></v-btn
    >
    <v-btn
      icon
      outlined
      :color="$vuetify.theme.dark ? 'white black--text' : 'secondary'"
      class="mr-2"
      ><v-icon>mdi-chat-outline</v-icon></v-btn
    >
    <v-btn
      outlined
      rounded
      class="text-capitalize"
      :class="
        $vuetify.theme.dark ? 'white black--text' : 'secondary white--text'
      "
      >Follow</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ['profile'],
}
</script>

<style></style>
