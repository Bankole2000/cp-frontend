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
            <ForgotPasswordForm />
            <h1>Forgot Password Page</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ForgotPasswordForm from '~/components/forms/auth/ForgotPasswordForm.vue'
export default {
  components: { ForgotPasswordForm },
}
</script>

<style>
</style>