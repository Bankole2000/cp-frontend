<template>
  <div
    class="login-phone"
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
            <LoginPhoneForm
              @goback="goback"
              @loginSuccess="loginSuccess"
              @requiresDeviceVerification="requiresDeviceVerification"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LoginPhoneForm from '~/components/forms/auth/LoginPhoneForm.vue'
export default {
  components: {
    LoginPhoneForm,
  },
  methods: {
    goback() {
      console.log('Go back')
      this.$router.push({ name: 'auth' })
    },
    loginSuccess() {
      this.$router.push({ name: 'index' })
    },
    requiresDeviceVerification() {
      console.log('Requires Device Verification')
    },
  },
}
</script>

<style>
</style>