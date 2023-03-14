<template>
  <v-hover v-slot="{ hover }">
    <div class="d-flex align-center justify-start" style="cursor: pointer">
      <v-btn
        icon
        class="mr-1"
        small
        :class="
          hover && $vuetify.theme.dark
            ? 'bg-success-dk'
            : hover && !$vuetify.theme.dark
            ? 'bg-success-lt'
            : ''
        "
        :color="hover ? 'success' : ''"
      >
        <v-icon size="24">mdi-repeat-variant</v-icon>
      </v-btn>
      <span class="font-weight-regular" :class="hover ? 'success--text' : ''">{{
        999999 | count
      }}</span>
    </div>
  </v-hover>
</template>

<script>
export default {}
</script>

<style></style>
