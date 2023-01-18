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
            <LoginForm
              @loginSuccess="loginSuccess"
              @goback="goback"
              @requiresDeviceVerification="requiresDeviceVerification"
            />
            <div></div>
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
import LoginForm from '~/components/forms/auth/LoginForm.vue'
import VerifyDeviceModal from '~/components/modals/VerifyDeviceModal.vue'
export default {
  components: { LoginForm, VerifyDeviceModal },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async loginSuccess() {
      if (this.loading) return
      this.loading = true
      await this.$store.dispatch('user/getUserProfile').then(() => {
        this.$router.push({ name: 'index' })
      })
    },
    goback() {
      console.log('Go back')
      this.$router.push({ name: 'auth' })
    },
    requiresDeviceVerification(e) {
      console.log('Requires Device Verification')
      if (e.idToken) delete e.idToken
      this.$store.commit('auth/setVerifData', e)
      this.$store.commit('ui/showVerifyDeviceModal', true)
      console.log({ store: this.$store })
      console.log({ e })
    },
    async getUserDataAfterLogin() {
      if (this.loading) return
      this.loading = true
      await this.$store.dispatch('user/getUserProfile').then(() => {
        this.$router.push({ name: 'index' })
      })
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