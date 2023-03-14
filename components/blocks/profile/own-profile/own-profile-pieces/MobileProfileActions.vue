<template>
  <div class="d-flex pb-4 mt-n8 justify-end">
    <v-btn icon outlined color="primary" class="mr-2"
      ><v-icon>mdi-dots-horizontal</v-icon></v-btn
    >
    <v-btn icon outlined color="primary" class="mr-2"
      ><v-icon>mdi-email-outline</v-icon></v-btn
    >
    <v-btn
      outlined
      rounded
      color="primary"
      class="text-capitalize"
      @click="showEditProfileModal"
      >Edit Profile</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ['profile'],
  methods: {
    showEditProfileModal() {
      this.$emit('showEditProfileModal')
    },
  },
}
</script>

<style></style>
