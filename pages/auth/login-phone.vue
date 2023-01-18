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
    <VerifyDeviceModal
      @deviceVerified="deviceVerified"
      @cancel="cancelDeviceVerification"
    />
  </div>
</template>

<script>
import LoginPhoneForm from '~/components/forms/auth/LoginPhoneForm.vue'
import VerifyDeviceModal from '~/components/modals/VerifyDeviceModal.vue'
export default {
  components: {
    LoginPhoneForm,
    VerifyDeviceModal,
  },
  methods: {
    goback() {
      console.log('Go back')
      this.$router.push({ name: 'auth' })
    },
    loginSuccess() {
      setTimeout(() => {
        this.$router.push({ name: 'index' })
      }, 2000)
    },
    requiresDeviceVerification(e) {
      console.log('Requires Device Verification')
      if (e.idToken) delete e.idToken
      this.$store.commit('auth/setVerifData', e)
      this.$store.commit('ui/showVerifyDeviceModal', true)
      console.log({ store: this.$store })
      console.log({ e })
    },
    deviceVerified() {
      console.log('Device Verified')
      this.clear()
      this.$router.push({ name: 'index' })
    },
    cancelDeviceVerification() {
      console.log('Cancel Device Verification')
      this.clear()
    },
    clear() {
      this.$store.commit('auth/setVerifData', null)
      this.$store.commit('auth/setIdToken', null)
      this.$store.commit('ui/showVerifyDeviceModal', false)
    },
  },
}
</script>

<style>
</style>