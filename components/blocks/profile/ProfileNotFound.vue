<template>
  <v-row class="mt-10 pt-10">
    <v-col cols="12">
      <div class="d-flex flex-column align-center justify-center">
        <p
          class="mb-2 font-weight-bold text-center"
          :class="$vuetify.breakpoint.xs ? 'text-h5' : 'text-h4'"
        >
          This profile doesn't exist
        </p>
        <p class="text--secondary">Try searching for another</p>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          rounded
          filled
          dense
          single-line
          :style="{ fontSize: '1.2rem' }"
          :placeholder="`Search Profiles`"
          append-icon="mdi-send"
        ></v-text-field>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>

<style></style>
