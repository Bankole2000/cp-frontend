<template>
  <div
    style="
      display: flex;
      justify-content: center;
      height: 100vh;
      align-items: center;
    "
    :style="{ backgroundColor: $vuetify.theme.dark ? '#FFFFFF' : '#FFFFFF' }"
  >
    <v-container>
      <v-row class="mb-16">
        <v-col cols="12">
          <div
            :class="{
              'px-4': $vuetify.breakpoint.smAndDown,
              'px-12': $vuetify.breakpoint.mdAndUp,
            }"
          >
            <OnboardingForm />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import OnboardingForm from '~/components/forms/auth/OnboardingForm.vue'
export default {
  components: { OnboardingForm },
}
</script>

<style>
</style>