<template>
  <v-row v-if="profile.blockedYou" class="mt-10 pt-10">
    <v-col cols="12">
      <div class="d-flex flex-column align-center justify-center">
        <p
          class="mb-2 font-weight-bold text-center"
          :class="$vuetify.breakpoint.xs ? 'text-h5' : 'text-h4'"
        >
          @{{ profile.username }} blocked you
        </p>
        <p class="text--secondary">
          You are blocked from following
          <strong>@{{ profile.username }}</strong> and viewing any of
          <strong>@{{ profile.username }}</strong
          >'s content.
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['profile'],
}
</script>

<style></style>
